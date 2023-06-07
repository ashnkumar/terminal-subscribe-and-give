"use strict";
exports.__esModule = true;
exports.DevicesApi = void 0;
var tslib_1 = require("tslib");
var createDeviceCodeRequest_1 = require("../models/createDeviceCodeRequest");
var createDeviceCodeResponse_1 = require("../models/createDeviceCodeResponse");
var getDeviceCodeResponse_1 = require("../models/getDeviceCodeResponse");
var listDeviceCodesResponse_1 = require("../models/listDeviceCodesResponse");
var schema_1 = require("../schema");
var baseApi_1 = require("./baseApi");
var DevicesApi = /** @class */ (function (_super) {
    tslib_1.__extends(DevicesApi, _super);
    function DevicesApi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Lists all DeviceCodes associated with the merchant.
     *
     * @param cursor       A pagination cursor returned by a previous call to this endpoint. Provide this to
     *                               retrieve the next set of results for your original query.  See [Paginating
     *                               results](https://developer.squareup.com/docs/working-with-apis/pagination) for more
     *                               information.
     * @param locationId   If specified, only returns DeviceCodes of the specified location. Returns
     *                               DeviceCodes of all locations if empty.
     * @param productType  If specified, only returns DeviceCodes targeting the specified product type.
     *                               Returns DeviceCodes of all product types if empty.
     * @param status       If specified, returns DeviceCodes with the specified statuses. Returns DeviceCodes
     *                               of status `PAIRED` and `UNPAIRED` if empty.
     * @return Response from the API call
     */
    DevicesApi.prototype.listDeviceCodes = function (cursor, locationId, productType, status, requestOptions) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var req, mapped;
            return tslib_1.__generator(this, function (_a) {
                req = this.createRequest('GET', '/v2/devices/codes');
                mapped = req.prepareArgs({
                    cursor: [cursor, (0, schema_1.optional)((0, schema_1.string)())],
                    locationId: [locationId, (0, schema_1.optional)((0, schema_1.string)())],
                    productType: [productType, (0, schema_1.optional)((0, schema_1.string)())],
                    status: [status, (0, schema_1.optional)((0, schema_1.string)())]
                });
                req.query('cursor', mapped.cursor);
                req.query('location_id', mapped.locationId);
                req.query('product_type', mapped.productType);
                req.query('status', mapped.status);
                return [2 /*return*/, req.callAsJson(listDeviceCodesResponse_1.listDeviceCodesResponseSchema, requestOptions)];
            });
        });
    };
    /**
     * Creates a DeviceCode that can be used to login to a Square Terminal device to enter the connected
     * terminal mode.
     *
     * @param body         An object containing the fields to POST for the request.
     *                                                       See the corresponding object definition for field details.
     * @return Response from the API call
     */
    DevicesApi.prototype.createDeviceCode = function (body, requestOptions) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var req, mapped;
            return tslib_1.__generator(this, function (_a) {
                req = this.createRequest('POST', '/v2/devices/codes');
                mapped = req.prepareArgs({
                    body: [body, createDeviceCodeRequest_1.createDeviceCodeRequestSchema]
                });
                req.header('Content-Type', 'application/json');
                req.json(mapped.body);
                return [2 /*return*/, req.callAsJson(createDeviceCodeResponse_1.createDeviceCodeResponseSchema, requestOptions)];
            });
        });
    };
    /**
     * Retrieves DeviceCode with the associated ID.
     *
     * @param id The unique identifier for the device code.
     * @return Response from the API call
     */
    DevicesApi.prototype.getDeviceCode = function (id, requestOptions) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var req, mapped;
            return tslib_1.__generator(this, function (_a) {
                req = this.createRequest('GET');
                mapped = req.prepareArgs({ id: [id, (0, schema_1.string)()] });
                req.appendTemplatePath(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["/v2/devices/codes/", ""], ["/v2/devices/codes/", ""])), mapped.id);
                return [2 /*return*/, req.callAsJson(getDeviceCodeResponse_1.getDeviceCodeResponseSchema, requestOptions)];
            });
        });
    };
    return DevicesApi;
}(baseApi_1.BaseApi));
exports.DevicesApi = DevicesApi;
var templateObject_1;
//# sourceMappingURL=devicesApi.js.map