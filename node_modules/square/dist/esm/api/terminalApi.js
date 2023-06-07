import { cancelTerminalActionResponseSchema, } from '../models/cancelTerminalActionResponse';
import { cancelTerminalCheckoutResponseSchema, } from '../models/cancelTerminalCheckoutResponse';
import { cancelTerminalRefundResponseSchema, } from '../models/cancelTerminalRefundResponse';
import { createTerminalActionRequestSchema, } from '../models/createTerminalActionRequest';
import { createTerminalActionResponseSchema, } from '../models/createTerminalActionResponse';
import { createTerminalCheckoutRequestSchema, } from '../models/createTerminalCheckoutRequest';
import { createTerminalCheckoutResponseSchema, } from '../models/createTerminalCheckoutResponse';
import { createTerminalRefundRequestSchema, } from '../models/createTerminalRefundRequest';
import { createTerminalRefundResponseSchema, } from '../models/createTerminalRefundResponse';
import { getTerminalActionResponseSchema, } from '../models/getTerminalActionResponse';
import { getTerminalCheckoutResponseSchema, } from '../models/getTerminalCheckoutResponse';
import { getTerminalRefundResponseSchema, } from '../models/getTerminalRefundResponse';
import { searchTerminalActionsRequestSchema, } from '../models/searchTerminalActionsRequest';
import { searchTerminalActionsResponseSchema, } from '../models/searchTerminalActionsResponse';
import { searchTerminalCheckoutsRequestSchema, } from '../models/searchTerminalCheckoutsRequest';
import { searchTerminalCheckoutsResponseSchema, } from '../models/searchTerminalCheckoutsResponse';
import { searchTerminalRefundsRequestSchema, } from '../models/searchTerminalRefundsRequest';
import { searchTerminalRefundsResponseSchema, } from '../models/searchTerminalRefundsResponse';
import { string } from '../schema';
import { BaseApi } from './baseApi';
export class TerminalApi extends BaseApi {
    /**
     * Creates a Terminal action request and sends it to the specified device.
     *
     * @param body         An object containing the fields to POST for the request.
     *                                                           See the corresponding object definition for field
     *                                                           details.
     * @return Response from the API call
     */
    async createTerminalAction(body, requestOptions) {
        const req = this.createRequest('POST', '/v2/terminals/actions');
        const mapped = req.prepareArgs({
            body: [body, createTerminalActionRequestSchema],
        });
        req.header('Content-Type', 'application/json');
        req.json(mapped.body);
        return req.callAsJson(createTerminalActionResponseSchema, requestOptions);
    }
    /**
     * Retrieves a filtered list of Terminal action requests created by the account making the request.
     * Terminal action requests are available for 30 days.
     *
     * @param body         An object containing the fields to POST for the
     *                                                            request.  See the corresponding object definition for
     *                                                            field details.
     * @return Response from the API call
     */
    async searchTerminalActions(body, requestOptions) {
        const req = this.createRequest('POST', '/v2/terminals/actions/search');
        const mapped = req.prepareArgs({
            body: [body, searchTerminalActionsRequestSchema],
        });
        req.header('Content-Type', 'application/json');
        req.json(mapped.body);
        return req.callAsJson(searchTerminalActionsResponseSchema, requestOptions);
    }
    /**
     * Retrieves a Terminal action request by `action_id`. Terminal action requests are available for 30
     * days.
     *
     * @param actionId  Unique ID for the desired `TerminalAction`
     * @return Response from the API call
     */
    async getTerminalAction(actionId, requestOptions) {
        const req = this.createRequest('GET');
        const mapped = req.prepareArgs({ actionId: [actionId, string()] });
        req.appendTemplatePath `/v2/terminals/actions/${mapped.actionId}`;
        return req.callAsJson(getTerminalActionResponseSchema, requestOptions);
    }
    /**
     * Cancels a Terminal action request if the status of the request permits it.
     *
     * @param actionId  Unique ID for the desired `TerminalAction`
     * @return Response from the API call
     */
    async cancelTerminalAction(actionId, requestOptions) {
        const req = this.createRequest('POST');
        const mapped = req.prepareArgs({ actionId: [actionId, string()] });
        req.appendTemplatePath `/v2/terminals/actions/${mapped.actionId}/cancel`;
        return req.callAsJson(cancelTerminalActionResponseSchema, requestOptions);
    }
    /**
     * Creates a Terminal checkout request and sends it to the specified device to take a payment
     * for the requested amount.
     *
     * @param body         An object containing the fields to POST for the
     *                                                             request.  See the corresponding object definition for
     *                                                             field details.
     * @return Response from the API call
     */
    async createTerminalCheckout(body, requestOptions) {
        const req = this.createRequest('POST', '/v2/terminals/checkouts');
        const mapped = req.prepareArgs({
            body: [body, createTerminalCheckoutRequestSchema],
        });
        req.header('Content-Type', 'application/json');
        req.json(mapped.body);
        return req.callAsJson(createTerminalCheckoutResponseSchema, requestOptions);
    }
    /**
     * Returns a filtered list of Terminal checkout requests created by the application making the request.
     * Only Terminal checkout requests created for the merchant scoped to the OAuth token are returned.
     * Terminal checkout requests are available for 30 days.
     *
     * @param body         An object containing the fields to POST for the
     *                                                              request.  See the corresponding object definition for
     *                                                              field details.
     * @return Response from the API call
     */
    async searchTerminalCheckouts(body, requestOptions) {
        const req = this.createRequest('POST', '/v2/terminals/checkouts/search');
        const mapped = req.prepareArgs({
            body: [body, searchTerminalCheckoutsRequestSchema],
        });
        req.header('Content-Type', 'application/json');
        req.json(mapped.body);
        return req.callAsJson(searchTerminalCheckoutsResponseSchema, requestOptions);
    }
    /**
     * Retrieves a Terminal checkout request by `checkout_id`. Terminal checkout requests are available for
     * 30 days.
     *
     * @param checkoutId  The unique ID for the desired `TerminalCheckout`.
     * @return Response from the API call
     */
    async getTerminalCheckout(checkoutId, requestOptions) {
        const req = this.createRequest('GET');
        const mapped = req.prepareArgs({ checkoutId: [checkoutId, string()] });
        req.appendTemplatePath `/v2/terminals/checkouts/${mapped.checkoutId}`;
        return req.callAsJson(getTerminalCheckoutResponseSchema, requestOptions);
    }
    /**
     * Cancels a Terminal checkout request if the status of the request permits it.
     *
     * @param checkoutId  The unique ID for the desired `TerminalCheckout`.
     * @return Response from the API call
     */
    async cancelTerminalCheckout(checkoutId, requestOptions) {
        const req = this.createRequest('POST');
        const mapped = req.prepareArgs({ checkoutId: [checkoutId, string()] });
        req.appendTemplatePath `/v2/terminals/checkouts/${mapped.checkoutId}/cancel`;
        return req.callAsJson(cancelTerminalCheckoutResponseSchema, requestOptions);
    }
    /**
     * Creates a request to refund an Interac payment completed on a Square Terminal. Refunds for Interac
     * payments on a Square Terminal are supported only for Interac debit cards in Canada. Other refunds
     * for Terminal payments should use the Refunds API. For more information, see [Refunds
     * API]($e/Refunds).
     *
     * @param body         An object containing the fields to POST for the request.
     *                                                           See the corresponding object definition for field
     *                                                           details.
     * @return Response from the API call
     */
    async createTerminalRefund(body, requestOptions) {
        const req = this.createRequest('POST', '/v2/terminals/refunds');
        const mapped = req.prepareArgs({
            body: [body, createTerminalRefundRequestSchema],
        });
        req.header('Content-Type', 'application/json');
        req.json(mapped.body);
        return req.callAsJson(createTerminalRefundResponseSchema, requestOptions);
    }
    /**
     * Retrieves a filtered list of Interac Terminal refund requests created by the seller making the
     * request. Terminal refund requests are available for 30 days.
     *
     * @param body         An object containing the fields to POST for the
     *                                                            request.  See the corresponding object definition for
     *                                                            field details.
     * @return Response from the API call
     */
    async searchTerminalRefunds(body, requestOptions) {
        const req = this.createRequest('POST', '/v2/terminals/refunds/search');
        const mapped = req.prepareArgs({
            body: [body, searchTerminalRefundsRequestSchema],
        });
        req.header('Content-Type', 'application/json');
        req.json(mapped.body);
        return req.callAsJson(searchTerminalRefundsResponseSchema, requestOptions);
    }
    /**
     * Retrieves an Interac Terminal refund object by ID. Terminal refund objects are available for 30 days.
     *
     * @param terminalRefundId   The unique ID for the desired `TerminalRefund`.
     * @return Response from the API call
     */
    async getTerminalRefund(terminalRefundId, requestOptions) {
        const req = this.createRequest('GET');
        const mapped = req.prepareArgs({
            terminalRefundId: [terminalRefundId, string()],
        });
        req.appendTemplatePath `/v2/terminals/refunds/${mapped.terminalRefundId}`;
        return req.callAsJson(getTerminalRefundResponseSchema, requestOptions);
    }
    /**
     * Cancels an Interac Terminal refund request by refund request ID if the status of the request permits
     * it.
     *
     * @param terminalRefundId   The unique ID for the desired `TerminalRefund`.
     * @return Response from the API call
     */
    async cancelTerminalRefund(terminalRefundId, requestOptions) {
        const req = this.createRequest('POST');
        const mapped = req.prepareArgs({
            terminalRefundId: [terminalRefundId, string()],
        });
        req.appendTemplatePath `/v2/terminals/refunds/${mapped.terminalRefundId}/cancel`;
        return req.callAsJson(cancelTerminalRefundResponseSchema, requestOptions);
    }
}
//# sourceMappingURL=terminalApi.js.map