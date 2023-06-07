import { Schema } from '../schema';
import { Error } from './error';
import { Subscription } from './subscription';
import { SubscriptionAction } from './subscriptionAction';
/**
 * Defines output parameters in a response of the
 * [SwapPlan]($e/Subscriptions/SwapPlan) endpoint.
 */
export interface SwapPlanResponse {
    /** Errors encountered during the request. */
    errors?: Error[];
    /**
     * Represents a subscription to a subscription plan by a subscriber.
     * For an overview of the `Subscription` type, see
     * [Subscription object](https://developer.squareup.com/docs/subscriptions-api/overview#subscription-object-overview).
     */
    subscription?: Subscription;
    /** A list of a `SWAP_PLAN` action created by the request. */
    actions?: SubscriptionAction[];
}
export declare const swapPlanResponseSchema: Schema<SwapPlanResponse>;
