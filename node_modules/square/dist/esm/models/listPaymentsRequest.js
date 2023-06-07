import { bigint, nullable, number, object, optional, string, } from '../schema';
export const listPaymentsRequestSchema = object({
    beginTime: ['begin_time', optional(nullable(string()))],
    endTime: ['end_time', optional(nullable(string()))],
    sortOrder: ['sort_order', optional(nullable(string()))],
    cursor: ['cursor', optional(nullable(string()))],
    locationId: ['location_id', optional(nullable(string()))],
    total: ['total', optional(nullable(bigint()))],
    last4: ['last_4', optional(nullable(string()))],
    cardBrand: ['card_brand', optional(nullable(string()))],
    limit: ['limit', optional(nullable(number()))],
});
//# sourceMappingURL=listPaymentsRequest.js.map