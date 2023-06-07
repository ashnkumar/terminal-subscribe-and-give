import { Schema } from '../schema';
import { DestinationDetailsCardRefundDetails } from './destinationDetailsCardRefundDetails';
/** Details about a refund's destination. */
export interface DestinationDetails {
    cardDetails?: DestinationDetailsCardRefundDetails;
}
export declare const destinationDetailsSchema: Schema<DestinationDetails>;
