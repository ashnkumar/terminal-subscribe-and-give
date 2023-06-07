import { Schema } from '../schema';
import { V1Payment } from './v1Payment';
export interface V1ListPaymentsResponse {
    items?: V1Payment[];
}
export declare const v1ListPaymentsResponseSchema: Schema<V1ListPaymentsResponse>;
