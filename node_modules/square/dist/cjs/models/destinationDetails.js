"use strict";
exports.__esModule = true;
exports.destinationDetailsSchema = void 0;
var schema_1 = require("../schema");
var destinationDetailsCardRefundDetails_1 = require("./destinationDetailsCardRefundDetails");
exports.destinationDetailsSchema = (0, schema_1.object)({
    cardDetails: [
        'card_details',
        (0, schema_1.optional)((0, schema_1.lazy)(function () { return destinationDetailsCardRefundDetails_1.destinationDetailsCardRefundDetailsSchema; })),
    ]
});
//# sourceMappingURL=destinationDetails.js.map