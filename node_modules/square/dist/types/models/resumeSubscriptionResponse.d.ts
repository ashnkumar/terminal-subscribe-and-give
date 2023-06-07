import { Schema } from '../schema';
import { Error } from './error';
import { Subscription } from './subscription';
import { SubscriptionAction } from './subscriptionAction';
/**
 * Defines output parameters in a response from the
 * [ResumeSubscription]($e/Subscriptions/ResumeSubscription) endpoint.
 */
export interface ResumeSubscriptionResponse {
    /** Errors encountered during the request. */
    errors?: Error[];
    /**
     * Represents a subscription to a subscription plan by a subscriber.
     * For an overview of the `Subscription` type, see
     * [Subscription object](https://developer.squareup.com/docs/subscriptions-api/overview#subscription-object-overview).
     */
    subscription?: Subscription;
    /** A list of `RESUME` actions created by the request and scheduled for the subscription. */
    actions?: SubscriptionAction[];
}
export declare const resumeSubscriptionResponseSchema: Schema<ResumeSubscriptionResponse>;
