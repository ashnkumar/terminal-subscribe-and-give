### Overview
Terminal Subscribe & Give is a Square app built on Square's Terminal, Subscriptions, Catalog, and Orders APIs that allows sellers to offer **recurring* subscriptions directly from their in-person Square Terminal.
<br />

### The Problem: *"Increasing donations to social causes"*
One of the best ways to increase donations for important social causes is to make it more convenient for consumers to donate. Asking buyers to donate at the POS has been incredibly effective: almost 75% of consumers have donated at some point at the point of checkout.

Separately, **recurring donations** have been proven to be _extremely_ effective, with a 90% retention rate on donations over time.

**The problem:** There's no easy way to start recurring donations at a point-of-sale system, including the Square Terminal.

### Our Solution: *"Terminal + Subscriptions APIs"*
We set out to solve this problem by combining Square's Terminal and Subscriptions APIs, along with some help from the Catalog and Order APIs, to build the capability for Square sellers to offer online, recurring subscriptions directly from the in-person Square Terminal.

Sellers can simply add a subscription (represented by an item) to the checkout cart and allow our app to take care of the rest: cancel the original transaction, ask the user to save a card instead, and then start a subscription using the details from the previous steps.

### How it Works: *"Technical Overview"*

| Step      | Implementation |
| ----------- | ----------- |
| **Step 1: Setup Subscriptions & Items**      |  Before we're ready to use the app, we need to do some set up. We create Subscription Plans for each of the charities we want to donate to, along with the amount of the donation. Since we can't add a subscription to the checkout flow on a Terminal, we built a workaround by creating a corresponding Item for each Subscription Plan with the same name. In the Custom Attributes field of this item, we set up an attribute for `subscription_id` that points to the `plan_id` of the corresponding subscription plan.
| **Step 2: Terminal Checkout Flow**      |  After the sellers adds the item to the cart, they ask the customer for their name and email to attach to the checkout. This is important since we'll need a Customer object in order to create a Subscription later on. When the Terminal Checkout is created, we receive a webhook for `terminal.checkout.created`. <br/><br/>At this point, we use the Orders & Catalog APIs to find the line item of the checkout and check its Custom Attributes to see if there's a `subscription_id` (this confirms that this should be treated as a _subscription_ and not a regular _item_). If so, we **cancel the original Terminal Checkout** using the Terminal API.
| **Step 3: Save Card Flow**      |  Once the original Terminal Checkout is cancelled, we again use the Terminal API to **create a Terminal Action w/ SAVE_CARD**. This prompts the buyer to save their card details on the Terminal's screen by swiping their card at the Terminal.
| **Step 4: Create Subscription Flow**      |  At this point we'll receive a `terminal.action.updated` webhook that will let us know that a card was saved, along with the `card_id`, `customer_id`, `device_id`, and `location_id`. We'll use the `plan_id` from Step 2 (when we retreived it from the Custom Attribute field on the item) and bring it all together to use the Subscription API's *Create a Subscription* call to create a subscription on behalf of the customer.

### Challenges we ran into: *"Inability to add a subscription directly to the checkout"*
A key challenge we ran into and solved through our workaround is that we're not currently able to add a Subscription Plan directly into the Terminal Checkout flow. This makes sense since most subscriptions are meant to be created online, but our app requires those subscriptions to start from within the in-person terminal itself. We were able to solve this using our hack as detailed above.
