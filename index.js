const express = require("express");
const bodyParser = require('body-parser');
const crypto = require("crypto");
const PORT = process.env.PORT || 3001;
const app = express();
app.use(bodyParser.json())
const { Client } = require("square");

const SQUARE_ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN

const STATUSES_TO_CHECK = ["PENDING"]
const WEBHOOK_TERMINAL_CHECKOUT_CREATED = "terminal.checkout.created"
const WEBHOOK_SAVE_CARD_UPDATED = "terminal.action.updated"
const SUBSCRIPTION_CUSTOM_ATTRIBUTE_KEY = "subscription_id"
const SAVE_CARD_TERMINAL_ACTION_ID = "SAVE_CARD"

function generateUUID() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

const config = {
  accessToken: SQUARE_ACCESS_TOKEN,
  environment: "production",
}
const { 
  terminalApi,
  subscriptionsApi,
  catalogApi,
  ordersApi
} = new Client(config)

async function checkIfSubscriptionAlreadyCreated(customerId, planId) {
  let shouldCreateSubscription = true
  const response = await subscriptionsApi.searchSubscriptions({
    query: {
      filter: {
        customerIds: [customerId]
      }
    }
  });
  let subscriptionsForCustomer = response.result.subscriptions
  if (subscriptionsForCustomer) {
    subscriptionsForCustomer.forEach((subscription) => {
      if (subscription.planId === planId) {
        shouldCreateSubscription = false
      }
    })
  }
  return shouldCreateSubscription
}

async function createSubscription(customerId, cardId, locationId, planId) {
  try {
    const response = await subscriptionsApi.createSubscription({
      idempotencyKey: generateUUID(),
      locationId: locationId,
      planId: planId,
      customerId: customerId,
      cardId: cardId
    });
    console.log("Subscription created!")
  } catch(error) {
    console.error("Error creating subscription: ", error)
  }
}

async function launchCardOnFile(customerId, planId, deviceId) {
  await terminalApi.createTerminalAction({
    idempotencyKey: generateUUID(),
    action: {
      deviceId: deviceId,
      type: SAVE_CARD_TERMINAL_ACTION_ID,
      saveCardOptions: {
        customerId: customerId,
        referenceId: `plan_id:${planId}`
      }
    }
  })
}

// Check if the line items in the order are proxy items
// representing a subscription plan
async function checkForSubscriptionCheckout(orderId) {
    let shouldCancel = false  
    let customerId = null
    let planId = null
    
    const orderResponse = await ordersApi.retrieveOrder(orderId);
    
    let lineItems = orderResponse.result.order.lineItems
    console.log(lineItems)
    for (const lineItem of lineItems) {
      if (lineItem.catalogObjectId) {
        const catalogResponse = await catalogApi.retrieveCatalogObject(lineItem.catalogObjectId, true);
        let relatedObjects = catalogResponse.result.relatedObjects
        console.log(relatedObjects)
        if (relatedObjects) {
          relatedObjects.forEach((obj) => {
            if (obj.customAttributeValues) {
              Object.keys(obj.customAttributeValues).forEach((key) => {
                let customAttributeObj = obj.customAttributeValues[key]
                if (customAttributeObj.name === SUBSCRIPTION_CUSTOM_ATTRIBUTE_KEY) {
                  shouldCancel = true
                  planId = customAttributeObj.stringValue
                  customerId = orderResponse.result.order.customerId
                }
              })
            }
          })
        }
      }
    }
    return {
      shouldCancel,
      planId,
      customerId
    }
}

app.post("/square-terminal-checkout-webhooks-prod", async (req, res) => {
  let type = req.body.type
  console.log("\n########### " + type)
  console.log(req.body.data.object)

  if (type === WEBHOOK_TERMINAL_CHECKOUT_CREATED 
      && STATUSES_TO_CHECK.includes(req.body.data.object.checkout.status)) {
        let checkoutId = req.body.data.object.checkout.id
        let orderId = req.body.data.object.checkout.order_id
        let deviceId = req.body.data.object.checkout.device_options.device_id
        if (orderId) {
          // Check if this is a subscription checkout
          // If so, cancel it, pull out planId, then start saveCard flow
          console.log("Checking for subscription")
          const { shouldCancel, planId, customerId } = await checkForSubscriptionCheckout(orderId)
          console.log(shouldCancel, planId, customerId)
          if (customerId && shouldCancel) {
            await terminalApi.cancelTerminalCheckout(checkoutId)
            await launchCardOnFile(customerId, planId, deviceId)
          }
        }
  }
  return res.sendStatus(200)
})

app.post("/square-terminal-save-card-webhooks-prod", async (req, res) => {
  let type = req.body.type
  if (type === WEBHOOK_SAVE_CARD_UPDATED) {
    let action = req.body.data.object.action
    if (action.status === "COMPLETED"
        && action.save_card_options && action.save_card_options.card_id) {
      console.log("\n########### " + type)
      console.log(req.body.data.object)          
      const { card_id, customer_id, reference_id } = action.save_card_options
      let locationId = action.location_id
      if (reference_id) {
        let matchArr = reference_id.match(/plan_id:(.*)/)
        if (matchArr != null) {
          let planId = matchArr[1]
          let shouldCreateSubscription = await checkIfSubscriptionAlreadyCreated(customer_id, planId)
          if (shouldCreateSubscription) {
            console.log("\nCreating subscription ...")
            await createSubscription(customer_id, card_id, locationId, planId)
          }
          else {
            console.log("NO SUBSCRIPTION TO CREATE")
          }
        }
      }
    }
  }
  return res.sendStatus(200)
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});