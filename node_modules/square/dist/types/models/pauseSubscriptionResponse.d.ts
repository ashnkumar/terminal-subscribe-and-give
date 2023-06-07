import { Schema } from '../schema';
import { Error } from './error';
import { Subscription } from './subscription';
import { SubscriptionAction } from './subscriptionAction';
/**
 * Defines output parameters in a response from the
 * [PauseSubscription]($e/Subscriptions/PauseSubscription) endpoint.
 */
export interface PauseSubscriptionResponse {
    /** Errors encountered during the request. */
    errors?: Error[];
    /**
     * Represents a subscription to a subscription plan by a subscriber.
     * For an overview of the `Subscription` type, see
     * [Subscription object](https://developer.squareup.com/docs/subscriptions-api/overview#subscription-object-overview).
     */
    subscription?: Subscription;
    /** The list of a `PAUSE` action and a possible `RESUME` action created by the request. */
    actions?: SubscriptionAction[];
}
export declare const pauseSubscriptionResponseSchema: Schema<PauseSubscriptionResponse>;
