import { Schema } from '../schema';
import { SubscriptionEventInfo } from './subscriptionEventInfo';
/** Describes changes to a subscription and the subscription status. */
export interface SubscriptionEvent {
    /** The ID of the subscription event. */
    id: string;
    /** Supported types of an event occurred to a subscription. */
    subscriptionEventType: string;
    /** The `YYYY-MM-DD`-formatted date (for example, 2013-01-15) when the subscription event occurred. */
    effectiveDate: string;
    /** The ID of the subscription plan associated with the subscription. */
    planId: string;
    /** Provides information about the subscription event. */
    info?: SubscriptionEventInfo;
}
export declare const subscriptionEventSchema: Schema<SubscriptionEvent>;
