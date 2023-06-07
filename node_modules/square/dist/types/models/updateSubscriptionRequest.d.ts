import { Schema } from '../schema';
import { Subscription } from './subscription';
/**
 * Defines input parameters in a request to the
 * [UpdateSubscription]($e/Subscriptions/UpdateSubscription) endpoint.
 */
export interface UpdateSubscriptionRequest {
    /**
     * Represents a subscription to a subscription plan by a subscriber.
     * For an overview of the `Subscription` type, see
     * [Subscription object](https://developer.squareup.com/docs/subscriptions-api/overview#subscription-object-overview).
     */
    subscription?: Subscription;
}
export declare const updateSubscriptionRequestSchema: Schema<UpdateSubscriptionRequest>;
