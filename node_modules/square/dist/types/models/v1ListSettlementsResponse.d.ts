import { Schema } from '../schema';
import { V1Settlement } from './v1Settlement';
export interface V1ListSettlementsResponse {
    items?: V1Settlement[];
}
export declare const v1ListSettlementsResponseSchema: Schema<V1ListSettlementsResponse>;
