import { lazy, object, optional } from '../schema';
import { destinationDetailsCardRefundDetailsSchema, } from './destinationDetailsCardRefundDetails';
export const destinationDetailsSchema = object({
    cardDetails: [
        'card_details',
        optional(lazy(() => destinationDetailsCardRefundDetailsSchema)),
    ],
});
//# sourceMappingURL=destinationDetails.js.map