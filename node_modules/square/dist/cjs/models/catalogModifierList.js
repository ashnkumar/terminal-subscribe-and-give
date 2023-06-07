"use strict";
exports.__esModule = true;
exports.catalogModifierListSchema = void 0;
var schema_1 = require("../schema");
var catalogObject_1 = require("./catalogObject");
exports.catalogModifierListSchema = (0, schema_1.object)({
    name: ['name', (0, schema_1.optional)((0, schema_1.nullable)((0, schema_1.string)()))],
    ordinal: ['ordinal', (0, schema_1.optional)((0, schema_1.nullable)((0, schema_1.number)()))],
    selectionType: ['selection_type', (0, schema_1.optional)((0, schema_1.string)())],
    modifiers: [
        'modifiers',
        (0, schema_1.optional)((0, schema_1.nullable)((0, schema_1.array)((0, schema_1.lazy)(function () { return catalogObject_1.catalogObjectSchema; })))),
    ],
    imageIds: ['image_ids', (0, schema_1.optional)((0, schema_1.nullable)((0, schema_1.array)((0, schema_1.string)())))]
});
//# sourceMappingURL=catalogModifierList.js.map