import { Schema } from '../schema';
/**
 * Defines input parameters in a call to the
 * [SwapPlan]($e/Subscriptions/SwapPlan) endpoint.
 */
export interface SwapPlanRequest {
    /** The ID of the new subscription plan. */
    newPlanId: string;
}
export declare const swapPlanRequestSchema: Schema<SwapPlanRequest>;
