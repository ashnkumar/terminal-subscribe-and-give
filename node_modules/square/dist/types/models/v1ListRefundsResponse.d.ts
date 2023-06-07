import { Schema } from '../schema';
import { V1Refund } from './v1Refund';
export interface V1ListRefundsResponse {
    items?: V1Refund[];
}
export declare const v1ListRefundsResponseSchema: Schema<V1ListRefundsResponse>;
