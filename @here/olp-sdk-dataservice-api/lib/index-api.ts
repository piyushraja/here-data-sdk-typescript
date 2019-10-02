/*
 * Copyright (C) 2019 HERE Europe B.V.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 * License-Filename: LICENSE
 */

/**
 * Index API v1
 * Use the `index` service to get the data handles of the partitions that match a query.
 * Then, use the data handles with the `blob` service to get the data from the partitions.
 * For more information,
 * see [Get Data from an Index Layer](https://developer.here.com/olp/documentation/data-store/data_dev_guide/rest/getting-data-index.html).
 * You can also use the `index` service to publish data to an index layer. For more information,
 * see [Publish to an Index Layer](https://developer.here.com/olp/documentation/data-store/data_dev_guide/rest/publishing-data-index.html).
 *
 * OpenAPI spec version: 1.0.0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Do not edit the class manually.
 */

import { RequestBuilder, RequestOptions, UrlBuilder } from "./RequestBuilder";

export interface DataResponse {
    data?: MapStringObject[];
}

export interface Index {
    /**
     * The checksum of the data being indexed by this index record.
     */
    checksum?: string;
    /**
     * The indexing attributes for the data being indexed by this index record.
     * The attributes must match the indexing attributes defined for the index layer.
     * To get or set the index attributes for an index layer, use the `config` API.
     */
    fields?: any;
    /**
     * The unique identifier (UUID) of the data being indexed by this index record.
     */
    id?: string;
    /**
     * User-defined fields that can store extra metadata about this index record.
     */
    metadata?: { [key: string]: string };
    /**
     * The size of the data being indexed by this index record.
     */
    size?: number;
}

export interface MapStringObject {
    mykey: string;
}

export interface UpdateIndexRequest {
    additions?: Index[];
    removals?: string[];
}

/* ===================================================================
 * IndexApi
 */

/**
 * Adds index data for a given data blob to an index layer. For more information,
 * see [Publish to an Index Layer](https://developer.here.com/olp/documentation/data-store/data_dev_guide/rest/publishing-data-index.html).
 *
 * @summary Inserts index data to an index layer
 * @param indexes An array of index attributes and values to be inserted.
 * @param layerID The layer ID of the index layer.
 */
export async function insertIndexes(
    builder: RequestBuilder,
    params: {
        indexes: Index[];
        layerID: string;
    }
): Promise<any> {
    const baseUrl = "/layers/{layerID}".replace(
        "{layerID}",
        UrlBuilder.toString(params["layerID"])
    );

    const urlBuilder = new UrlBuilder(builder.baseUrl + baseUrl);

    const headers: { [header: string]: string } = {};
    const options: RequestOptions = {
        method: "POST",
        headers
    };
    headers["Content-Type"] = "application/json";
    if (params["indexes"] !== undefined) {
        options.body = JSON.stringify(params["indexes"]);
    }

    return builder.request<any>(urlBuilder, options);
}

/**
 * Queries the index layer for the partitions that match the query.
 * Returns each partition that matches the query, including each partition's data handle,
 * which you use with the `blob` API to retrieve data for each partition.
 *
 * @summary Gets the partitions that match the query
 * @param layerID The ID of the index layer you want to query.
 * @param query An RSQL query to use to retrieve partitions that match the query.
 * For more information, see
 * [Get Data from an Index Layer](https://developer.here.com/olp/documentation/data-store/data_dev_guide/rest/getting-data-index.html).
 * The query must use the indexing attributes defined in the index layer.
 * @param huge Set to true for huge query.
 */
export async function performQuery(
    builder: RequestBuilder,
    params: {
        layerID: string;
        query: string;
        huge?: boolean;
    }
): Promise<DataResponse> {
    const baseUrl = "/layers/{layerID}".replace(
        "{layerID}",
        UrlBuilder.toString(params["layerID"])
    );

    const urlBuilder = new UrlBuilder(builder.baseUrl + baseUrl);
    urlBuilder.appendQuery("huge", params["huge"] ? "true" : "false");
    urlBuilder.appendQuery("query", params["query"]);

    const headers: { [header: string]: string } = {};
    const options: RequestOptions = {
        method: "GET",
        headers
    };

    return builder.request<DataResponse>(urlBuilder, options);
}

/**
 * Modifies partitions in an index layer.
 *
 * @summary Updates index layer partitions
 * @param layerID The layer ID of the index layer.
 * @param request Contains the data you want to add or remove from the index layer
 */
export async function performUpdate(
    builder: RequestBuilder,
    params: {
        layerID: string;
        request: UpdateIndexRequest;
    }
): Promise<any> {
    const baseUrl = "/layers/{layerID}".replace(
        "{layerID}",
        UrlBuilder.toString(params["layerID"])
    );

    const urlBuilder = new UrlBuilder(builder.baseUrl + baseUrl);

    const headers: { [header: string]: string } = {};
    const options: RequestOptions = {
        method: "PUT",
        headers
    };
    headers["Content-Type"] = "application/json";
    if (params["request"] !== undefined) {
        options.body = JSON.stringify(params["request"]);
    }

    return builder.request<any>(urlBuilder, options);
}
