"use strict";
exports.__esModule = true;
exports.catalogCategorySchema = void 0;
var schema_1 = require("../schema");
exports.catalogCategorySchema = (0, schema_1.object)({
    name: ['name', (0, schema_1.optional)((0, schema_1.nullable)((0, schema_1.string)()))],
    imageIds: ['image_ids', (0, schema_1.optional)((0, schema_1.nullable)((0, schema_1.array)((0, schema_1.string)())))]
});
//# sourceMappingURL=catalogCategory.js.map