"use strict";
exports.__esModule = true;
exports.catalogSubscriptionPlanSchema = void 0;
var schema_1 = require("../schema");
var subscriptionPhase_1 = require("./subscriptionPhase");
exports.catalogSubscriptionPlanSchema = (0, schema_1.object)({
    name: ['name', (0, schema_1.string)()],
    phases: [
        'phases',
        (0, schema_1.optional)((0, schema_1.nullable)((0, schema_1.array)((0, schema_1.lazy)(function () { return subscriptionPhase_1.subscriptionPhaseSchema; })))),
    ]
});
//# sourceMappingURL=catalogSubscriptionPlan.js.map