import { ApiResponse, RequestOptions } from '../core';
import { CreateDeviceCodeRequest } from '../models/createDeviceCodeRequest';
import { CreateDeviceCodeResponse } from '../models/createDeviceCodeResponse';
import { GetDeviceCodeResponse } from '../models/getDeviceCodeResponse';
import { ListDeviceCodesResponse } from '../models/listDeviceCodesResponse';
import { BaseApi } from './baseApi';
export declare class DevicesApi extends BaseApi {
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
    listDeviceCodes(cursor?: string, locationId?: string, productType?: string, status?: string, requestOptions?: RequestOptions): Promise<ApiResponse<ListDeviceCodesResponse>>;
    /**
     * Creates a DeviceCode that can be used to login to a Square Terminal device to enter the connected
     * terminal mode.
     *
     * @param body         An object containing the fields to POST for the request.
     *                                                       See the corresponding object definition for field details.
     * @return Response from the API call
     */
    createDeviceCode(body: CreateDeviceCodeRequest, requestOptions?: RequestOptions): Promise<ApiResponse<CreateDeviceCodeResponse>>;
    /**
     * Retrieves DeviceCode with the associated ID.
     *
     * @param id The unique identifier for the device code.
     * @return Response from the API call
     */
    getDeviceCode(id: string, requestOptions?: RequestOptions): Promise<ApiResponse<GetDeviceCodeResponse>>;
}
