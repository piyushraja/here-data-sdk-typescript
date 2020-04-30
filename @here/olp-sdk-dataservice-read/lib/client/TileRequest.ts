/*
 * Copyright (C) 2020 HERE Europe B.V.
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

import { MetadataApi } from "@here/olp-sdk-dataservice-api";
import {
    FetchOptions,
    HRN,
    QuadKey,
    RequestFactory,
    validateBillingTag
} from "..";
import { OlpClientSettings } from "./OlpClientSettings";

/**
 * Parameters for getting Tile.
 */
export interface TileRequestParams {
    catalogHrn: HRN;
    settings: OlpClientSettings;
    layerId: string;
    layerType: "versioned" | "volatile";
    catalogVersion?: number;
}

/**
 * Prepares information for calls to get Tile blob data by the Tile key.
 *
 * This class works only with versioned and volatile layers where the partitioning scheme is HERE Tile.
 *
 * You can initialize request class once for specific catalog, layer and version (@see [[TileRequestParams]])
 * and use many times for getting tile.
 *
 * @example
 *
 * ```
 *  const params: TileRequestParams = {
 *       settings: "% your OlpClientSettings instance % ",
 *       catalogHrn: "% HRN instance of your catalog %",
 *       layerId: "% Id of your layer %",
 *       layerType: "% versioned or volatile %",
 *       catalogVersion: "% the version of catalog, the latest version will be using by default for versioned layer %"
 *   }
 *
 *  const request = new TileRequest(params);
 *
 *  const requestForTile1 = request.withTileKey(yourTileKey1);
 *  const requestForTile2 = request.withTileKey(yourTileKey2);
 *
 * ```
 */
export class TileRequest {
    private quadKey?: QuadKey;
    private billingTag?: string;

    private fetchOption = FetchOptions.OnlineIfNotFound;
    private catalogVersion?: number;

    constructor(private readonly params: TileRequestParams) {
        this.catalogVersion = params.catalogVersion;
    }

    /**
     * Returns the provided by the [[TileRequestParams]] catalog version.
     * If version was not provided, the latest version will be fetching and using.
     */
    public async getCatalogVersion(): Promise<number> {
        if (this.catalogVersion !== undefined) {
            return Promise.resolve(this.catalogVersion);
        }

        this.catalogVersion = await this.getCatalogLatestVersion().catch(err =>
            Promise.reject(err)
        );
        return this.catalogVersion !== undefined
            ? Promise.resolve(this.catalogVersion)
            : Promise.reject(
                  new Error("Error getting the latest version of catalog")
              );
    }

    /**
     * Returns [[TileRequestParams]]
     */
    public getParams(): TileRequestParams {
        return this.params;
    }

    /**
     * A geometric area represented as a HERE tile.
     *
     * @param quadKey Addresses a tile in the quadtree.
     * @returns The updated [[TileRequest]] instance that you can use to chain methods.
     */
    public withTileKey(quadKey: QuadKey): TileRequest {
        this.quadKey = quadKey;
        return this;
    }

    /**
     * An optional free-form tag that is used for grouping billing records together.
     *
     * If supplied, it must be 4&ndash;16 characters long and contain only alphanumeric ASCII characters [A-Za-z0-9].
     *
     * @param tag The `BillingTag` string.
     * @return The updated [[TileRequest]] instance that you can use to chain methods.
     */
    public withBillingTag(tag: string): TileRequest {
        this.billingTag = validateBillingTag(tag);
        return this;
    }

    /**
     * Gets the configured [[QuadKey]] object for the request.
     *
     * @return The the configured [[QuadKey]] object.
     */
    public getTileKey(): QuadKey | undefined {
        return this.quadKey;
    }

    /**
     * Gets a billing tag to group billing records together.
     *
     * @return The `BillingTag` string.
     */
    public getBillingTag(): string | undefined {
        return this.billingTag;
    }

    /**
     * Sets the fetch option that you can use to set the source from
     * which data should be fetched.
     *
     * @see `getFetchOption()` for information on usage and format.
     *
     * @param option The `FetchOption` enum.
     *
     * @return A reference to the updated `PartitionsRequest` instance.
     */
    public withFetchOption(option: FetchOptions): TileRequest {
        this.fetchOption = option;
        return this;
    }

    /**
     * Gets the fetch option that controls how requests are handled.
     *
     * The default option is `OnlineIfNotFound` that queries the network if
     * the requested resource is not in the cache.
     *
     * @return The fetch option.
     */
    public getFetchOption(): FetchOptions {
        return this.fetchOption;
    }

    /**
     * Gets the latest available catalog version
     */
    private async getCatalogLatestVersion(): Promise<number> {
        const request = await RequestFactory.create(
            "metadata",
            "v1",
            this.params.settings,
            this.params.catalogHrn
        ).catch(error =>
            Promise.reject(
                `Erorr creating request object for metadata service: ${error}`
            )
        );

        const latestVersion = await MetadataApi.latestVersion(request, {
            startVersion: -1
        }).catch(error => Promise.reject(error));

        return Promise.resolve(latestVersion.version);
    }
}
