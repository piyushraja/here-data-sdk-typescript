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
 * Statistics API
 * API to retrieve statistics for the data coverage of the HERE platform catalogs.
 *  It shows where data exists, freshness of the data and other statistics
 *
 * OpenAPI spec version: 2.0.0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Do not edit the class manually.
 */

import { RequestBuilder, RequestOptions, UrlBuilder } from "./RequestBuilder";

export interface BoundingBox {
    east?: string;
    north?: string;
    south?: string;
    west?: string;
}

/**
 * Describes admin areas.
 */
export interface CatalogAdminAreas {
    cities?: string[];
    counties?: string[];
    countries?: string[];
    states?: string[];
}

/**
 * An interface of the bounding box data for the layer.
 */
export interface LayerBoundingBox {
    east: number;
    south: number;
    north: number;
    west: number;
}

/**
 * An interface of the catalog layer summary for one zoom level.
 */
export interface LayerLevelSummary {
    boundingBox: LayerBoundingBox;
    size: number;
    processedTimestamp: number;
    centroid: number;
    minPartitionSize: number;
    maxPartitionSize: number;
    version: number;
    totalPartitions: number;
}

/**
 * An interface for the catalog layer summary data.
 */
export interface LayerSummary {
    /** A catalog HRN. */
    catalogHRN: string;
    /** A layer name. */
    layer: string;
    /** A layer summary for multiple zoom levels. */
    levelSummary: {
        [index: number]: LayerLevelSummary;
    };
}

/* ===================================================================
 * DataCoverageCoreAPIsApi
 */

/**
 *
 *
 * @summary Retrieve Admin Areas showing DataCoverage in world for provided layer Id and version
 * @param layerId Unique Layer Identifier
 * @param datalevel Tile level. Currently, should be equal or less than level 11
 */
export async function getDataCoverageAdminAreas(
    builder: RequestBuilder,
    params: { layerId: string; datalevel: string }
): Promise<CatalogAdminAreas> {
    const baseUrl = "/layers/{layerId}/adminareas".replace(
        "{layerId}",
        UrlBuilder.toString(params["layerId"])
    );

    const urlBuilder = new UrlBuilder(builder.baseUrl + baseUrl);
    urlBuilder.appendQuery("datalevel", params["datalevel"]);

    const headers: { [header: string]: string } = {};
    const options: RequestOptions = {
        method: "GET",
        headers
    };

    return builder.request<CatalogAdminAreas>(urlBuilder, options);
}

/**
 *
 *
 * @summary Retrieve SizeMap data showing DataCoverage in world for provided
 * layer id and version. API shows heatmap based on the partition size
 * @param layerId Unique Layer Identifier
 * @param datalevel Tile level. Currently, should be equal or less than level 11
 */
export async function getDataCoverageSizeMap(
    builder: RequestBuilder,
    params: { layerId: string; datalevel?: number }
): Promise<Response> {
    const baseUrl = "/layers/{layerId}/heatmap/size".replace(
        "{layerId}",
        UrlBuilder.toString(params["layerId"])
    );

    const urlBuilder = new UrlBuilder(builder.baseUrl + baseUrl);
    urlBuilder.appendQuery("datalevel", params["datalevel"]);

    const headers: { [header: string]: string } = {};
    const options: RequestOptions = {
        method: "GET",
        headers
    };

    return builder.requestBlob(urlBuilder, options);
}

/**
 *
 *
 * @summary Retrieve Layer size data for provided layer id and version
 * @param layerId Unique Layer Identifier
 */
export async function getDataCoverageSummary(
    builder: RequestBuilder,
    params: { layerId: string }
): Promise<LayerSummary> {
    const baseUrl = "/layers/{layerId}/summary".replace(
        "{layerId}",
        UrlBuilder.toString(params["layerId"])
    );

    const urlBuilder = new UrlBuilder(builder.baseUrl + baseUrl);

    const headers: { [header: string]: string } = {};
    const options: RequestOptions = {
        method: "GET",
        headers
    };

    return builder.request<LayerSummary>(urlBuilder, options);
}

/**
 *
 *
 * @summary Retrieve BitMap showing DataCoverage in world for provided layer id and version.
 * API shows data coverage by partitions, so the user can see where on the world map there is a data for the specified catalog layer
 * @param layerId Unique Layer Identifier
 * @param datalevel Tile level. Currently, should be equal or less than level 11
 */
export async function getDataCoverageTile(
    builder: RequestBuilder,
    params: { layerId: string; datalevel?: number }
): Promise<Response> {
    const baseUrl = "/layers/{layerId}/tilemap".replace(
        "{layerId}",
        UrlBuilder.toString(params["layerId"])
    );

    const urlBuilder = new UrlBuilder(builder.baseUrl + baseUrl);
    urlBuilder.appendQuery("datalevel", params["datalevel"]);

    const headers: { [header: string]: string } = {};
    const options: RequestOptions = {
        method: "GET",
        headers
    };

    return builder.requestBlob(urlBuilder, options);
}

/**
 *
 *
 * @summary Retrieve TimeMap showing DataCoverage in world for provided layer id and version
 * @param layerId Unique Layer Identifier
 * @param datalevel Tile level. Currently, should be equal or less than level 11
 */
export async function getDataCoverageTimeMap(
    builder: RequestBuilder,
    params: { layerId: string; datalevel?: number; catalogHRN: string }
): Promise<Response> {
    const baseUrl = "/layers/{layerId}/heatmap/age".replace(
        "{layerId}",
        UrlBuilder.toString(params["layerId"])
    );

    const urlBuilder = new UrlBuilder(builder.baseUrl + baseUrl);
    urlBuilder.appendQuery("datalevel", params["datalevel"]);
    urlBuilder.appendQuery("catalogHRN", params["catalogHRN"]);

    const headers: { [header: string]: string } = {};
    const options: RequestOptions = {
        method: "GET",
        headers
    };

    return builder.requestBlob(urlBuilder, options);
}