import sha256 from "crypto-js/sha256";
import AxiosAjax from "../lib/axiosAjaxLib";
import urlConfig from "../config/url_config.json";

export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };
export type WrapSplashResponse = JsonValue;

export interface WrapSplashOptions {
  access_key?: string;
  secret_key?: string;
  redirect_uri?: string;
  code?: string;
  bearer_token?: string;
  timeout?: number;
  retries?: number;
  retryDelayMs?: number;
}

export interface WrapSplashErrorOptions {
  cause?: unknown;
  statusCode?: number;
  statusText?: string;
}

export type QueryParams = Record<string, string | number | boolean | undefined>;
export type Headers = Record<string, string>;

export class WrapSplashError extends Error {
  public readonly cause?: unknown;
  public readonly statusCode?: number;
  public readonly statusText?: string;

  constructor(message: string, options: WrapSplashErrorOptions = {}) {
    super(message);
    this.name = "WrapSplashError";
    this.cause = options.cause;
    this.statusCode = options.statusCode;
    this.statusText = options.statusText;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

class WrapSplashApi {
  private API_LOCATION: string = urlConfig.API_LOCATION;
  private BEARER_TOKEN_URL: string = urlConfig.BEARER_TOKEN_URL;
  private options: WrapSplashOptions = {};
  private access_key = "";
  private secret_key = "";
  private redirect_uri = "";
  private code = "";
  private grant_type = "authorization_code";
  private bearer_token = "";
  private timeout = 10000;
  private retries = 2;
  private retryDelayMs = 100;
  private headers: Headers = {
    "Content-type": "application/json",
    "X-Requested-With": "WrapSplash",
  };

  private computeHash(value: string): string {
    return sha256(value).toString();
  }

  private validateRequired(value: unknown, fieldName: string): void {
    if (value === undefined || value === null || value === "") {
      const message = fieldName === "id" ? "Parameter : id is required!" : fieldName === "query" ? "Parameter : query is missing!" : `Parameter : ${fieldName} is required and cannot be empty!`;
      throw new WrapSplashError(message);
    }
  }

  private validateSupportedValue(value: string | undefined, allowedValues: readonly string[], fieldName: string): void {
    if (value !== undefined && !allowedValues.includes(value)) {
      throw new WrapSplashError(`Parameter : ${fieldName} has an unsupported value!`);
    }
  }

  private availableOrders = ["latest", "oldest", "popular"];
  private availableOrientations = ["landscape", "portrait", "squarish"];

  /** Initialize the client with API credentials or a bearer token. */
  init = (options: WrapSplashOptions = {}): void => {
    if (!options || typeof options !== "object" || Array.isArray(options)) {
      throw new WrapSplashError("Initialisation parameters required!");
    }

    this.options = { ...options };
    this.timeout = typeof this.options.timeout === "number" && this.options.timeout > 0 ? this.options.timeout : 10000;
    this.retries = typeof this.options.retries === "number" && this.options.retries >= 0 ? this.options.retries : 2;
    this.retryDelayMs = typeof this.options.retryDelayMs === "number" && this.options.retryDelayMs >= 0 ? this.options.retryDelayMs : 100;
    this.bearer_token = this.options.bearer_token ?? "";

    this.headers = {
      "Content-type": "application/json",
      "X-Requested-With": "WrapSplash",
    };

    if (this.options.bearer_token) {
      this.headers = {
        ...this.headers,
        Authorization: `Bearer ${this.options.bearer_token}`,
        "X-WrapSplash-Header": this.computeHash(this.options.bearer_token),
      };
      return;
    }

    this.access_key = this.options.access_key
      ? this.options.access_key
      : (() => {
          throw new WrapSplashError("Access Key missing!");
        })();
    this.secret_key = this.options.secret_key
      ? this.options.secret_key
      : (() => {
          throw new WrapSplashError("Secret Key missing!");
        })();
    this.redirect_uri = this.options.redirect_uri
      ? this.options.redirect_uri
      : (() => {
          throw new WrapSplashError("Redirect URI missing!");
        })();
    this.code = this.options.code
      ? this.options.code
      : (() => {
          throw new WrapSplashError("Authorization Code missing!");
        })();

    this.headers = {
      ...this.headers,
      Authorization: `Client-ID ${this.options.access_key}`,
      "X-WrapSplash-Header": this.computeHash(this.options.access_key),
    };
  };

  private buildQueryParameters(params: QueryParams): QueryParams {
    const cleanParams: QueryParams = {};
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        cleanParams[key] = value;
      }
    });
    return cleanParams;
  }

  private getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }

    if (typeof error === "string") {
      return error;
    }

    return "Request failed";
  }

  private createWrapSplashError(error: unknown): WrapSplashError {
    if (error instanceof WrapSplashError) {
      return error;
    }

    const statusCode = typeof error === "object" && error !== null && "response" in error && error.response && typeof error.response === "object" && "status" in error.response ? (error.response as { status?: number }).status : undefined;
    const statusText = typeof error === "object" && error !== null && "response" in error && error.response && typeof error.response === "object" && "statusText" in error.response ? (error.response as { statusText?: string }).statusText : undefined;

    return new WrapSplashError(this.getErrorMessage(error), {
      cause: error,
      statusCode,
      statusText,
    });
  }

  private fetchUrl<T = WrapSplashResponse>(
    url: string,
    method: string,
    queryParameters: QueryParams = {},
    body: unknown = undefined
  ): Promise<T> {
    const ajax = new AxiosAjax({
      headers: this.headers,
      timeout: this.timeout,
      retries: this.retries,
      retryDelayMs: this.retryDelayMs,
    });

    return ajax
      .makeRequest(url, method.toLowerCase(), this.buildQueryParameters(queryParameters), body)
      .then((res) => {
        const response = res as { status?: number; statusText?: string; data?: T };

        if (response.status === 204) {
          return {
            status: response.status,
            statusText: response.statusText,
            message: "Content Deleted",
          } as T;
        }

        if (response.status === 403) {
          return {
            status: response.status,
            statusText: response.statusText,
            message: "Rate Limit Exceeded",
          } as T;
        }

        return response.data as T;
      })
      .catch((err: unknown) => Promise.reject(this.createWrapSplashError(err)));
  }

  /** Exchange the authorization code for a bearer token. */
  generateBearerToken = (): Promise<any> => {
    this.validateRequired(this.access_key, "access_key");
    this.validateRequired(this.secret_key, "secret_key");
    this.validateRequired(this.redirect_uri, "redirect_uri");
    this.validateRequired(this.code, "code");

    return this.fetchUrl(this.BEARER_TOKEN_URL, "POST", {
      client_id: this.access_key,
      client_secret: this.secret_key,
      redirect_uri: this.redirect_uri,
      code: this.code,
      grant_type: this.grant_type,
    });
  };

  getCurrentUserProfile = (): Promise<any> => {
    return this.fetchUrl(this.API_LOCATION + urlConfig.CURRENT_USER_PROFILE, "GET");
  };

  updateCurrentUserProfile = (
    username?: string,
    first_name?: string,
    last_name?: string,
    email?: string,
    url?: string,
    location?: string,
    bio?: string,
    instagram_username?: string
  ): Promise<any> => {
    return this.fetchUrl(this.API_LOCATION + urlConfig.UPDATE_CURRENT_USER_PROFILE, "PUT", {
      username,
      first_name,
      last_name,
      email,
      url,
      location,
      bio,
      instagram_username,
    });
  };

  getPublicProfile = (username: string, width?: number, height?: number): Promise<any> => {
    this.validateRequired(username, "username");
    return this.fetchUrl(this.API_LOCATION + urlConfig.USERS_PUBLIC_PROFILE + username, "GET", {
      w: width,
      h: height,
    });
  };

  getUserPortfolio = (username: string): Promise<any> => {
    this.validateRequired(username, "username");
    return this.fetchUrl(
      this.API_LOCATION + urlConfig.USERS_PORTFOLIO.replace(/:username/gi, username),
      "GET"
    );
  };

  getUserPhotos = (
    username: string,
    page?: number,
    per_page?: number,
    stats?: boolean,
    resolution?: string,
    quantity?: number,
    order_by?: string
  ): Promise<any> => {
    this.validateRequired(username, "username");
    this.validateSupportedValue(order_by, this.availableOrders, "order_by");
    if (stats !== undefined && typeof stats !== "boolean") {
      throw new Error("Parameter : stats is a boolean or optional!");
    }
    return this.fetchUrl(
      this.API_LOCATION + urlConfig.USERS_PHOTOS.replace(/:username/gi, username),
      "GET",
      {
        page: page ?? 1,
        per_page: per_page ?? 10,
        order_by: order_by ?? "latest",
        stats: stats ?? false,
        resolution: resolution ?? "days",
        quantity: quantity ?? 30,
      }
    );
  };

  getUserLikedPhotos = (
    username: string,
    page?: number,
    per_page?: number,
    order_by?: string
  ): Promise<any> => {
    this.validateRequired(username, "username");
    this.validateSupportedValue(order_by, this.availableOrders, "order_by");
    return this.fetchUrl(
      this.API_LOCATION + urlConfig.USERS_LIKED_PHOTOS.replace(/:username/gi, username),
      "GET",
      {
        page: page ?? 1,
        per_page: per_page ?? 10,
        order_by: order_by ?? "latest",
      }
    );
  };

  getUserCollections = (username: string, page?: number, per_page?: number): Promise<any> => {
    this.validateRequired(username, "username");
    return this.fetchUrl(
      this.API_LOCATION + urlConfig.USERS_COLLECTIONS.replace(/:username/gi, username),
      "GET",
      {
        page: page ?? 1,
        per_page: per_page ?? 10,
      }
    );
  };

  getUserStatistics = (username: string, resolution?: string, quantity?: number): Promise<any> => {
    this.validateRequired(username, "username");
    return this.fetchUrl(
      this.API_LOCATION + urlConfig.USERS_STATISTICS.replace(/:username/gi, username),
      "GET",
      {
        resolution: resolution ?? "days",
        quantity: quantity ?? 30,
      }
    );
  };

  listPhotos = (page?: number, per_page?: number, order_by?: string): Promise<any> => {
    if (order_by !== undefined && !this.availableOrders.includes(order_by)) {
      throw new Error("Parameter : order_by has an unsupported value!");
    }
    return this.fetchUrl(this.API_LOCATION + urlConfig.LIST_PHOTOS, "GET", {
      page: page ?? 1,
      per_page: per_page ?? 10,
      order_by: order_by ?? "latest",
    });
  };

  listCuratedPhotos = (page?: number, per_page?: number, order_by?: string): Promise<any> => {
    if (order_by !== undefined && !this.availableOrders.includes(order_by)) {
      throw new Error("Parameter : order_by has an unsupported value!");
    }
    return this.fetchUrl(this.API_LOCATION + urlConfig.LIST_CURATED_PHOTOS, "GET", {
      page: page ?? 1,
      per_page: per_page ?? 10,
      order_by: order_by ?? "latest",
    });
  };

  getAPhoto = (id: string, width?: number, height?: number, rect?: string): Promise<any> => {
    this.validateRequired(id, "id");
    return this.fetchUrl(this.API_LOCATION + urlConfig.GET_A_PHOTO.replace(/:id/gi, id), "GET", {
      w: width,
      h: height,
      rect: typeof rect === "string" ? rect : undefined,
    });
  };

  getARandomPhoto = (
    collections?: string | number,
    featured?: boolean,
    username?: string,
    query?: string,
    width?: number,
    height?: number,
    orientation?: string,
    count?: number
  ): Promise<any> => {
    this.validateSupportedValue(orientation, this.availableOrientations, "orientation");
    return this.fetchUrl(this.API_LOCATION + urlConfig.GET_A_RANDOM_PHOTO, "GET", {
      collections: collections !== undefined ? String(collections) : undefined,
      featured: featured ?? false,
      username,
      query,
      width,
      height,
      orientation: orientation ?? "landscape",
      count: count ?? 1,
    });
  };

  getPhotoStatistics = (id: string, resolution?: string, quantity?: number): Promise<any> => {
    this.validateRequired(id, "id");
    return this.fetchUrl(this.API_LOCATION + urlConfig.GET_A_PHOTO_STATISTICS.replace(/:id/gi, id), "GET", {
      resolution: resolution ?? "days",
      quantity: quantity ?? 30,
    });
  };

  getPhotoLink = (id: string): Promise<any> => {
    this.validateRequired(id, "id");
    return this.fetchUrl(this.API_LOCATION + urlConfig.GET_A_PHOTO_DOWNLOAD_LINK.replace(/:id/gi, id), "GET");
  };

  updatePhoto = (
    id: string,
    location: Record<string, string | number | boolean | undefined> = {},
    exif: Record<string, string | number | boolean | undefined> = {}
  ): Promise<any> => {
    this.validateRequired(id, "id");
    return this.fetchUrl(this.API_LOCATION + urlConfig.UPDATE_A_PHOTO.replace(/:id/gi, id), "PUT", {
      ...(location.latitude ? { "location[latitude]": location.latitude } : {}),
      ...(location.longitude ? { "location[longitude]": location.longitude } : {}),
      ...(location.name ? { "location[name]": location.name } : {}),
      ...(location.city ? { "location[city]": location.city } : {}),
      ...(location.country ? { "location[country]": location.country } : {}),
      ...(location.confidential ? { "location[confidential]": location.confidential } : {}),
      ...(exif.make ? { "exif[make]": exif.make } : {}),
      ...(exif.model ? { "exif[model]": exif.model } : {}),
      ...(exif.exposure_time ? { "exif[exposure_time]": exif.exposure_time } : {}),
      ...(exif.aperture_value ? { "exif[aperture_value]": exif.aperture_value } : {}),
      ...(exif.focal_length ? { "exif[focal_length]": exif.focal_length } : {}),
      ...(exif.iso_speed_ratings ? { "exif[iso_speed_ratings]": exif.iso_speed_ratings } : {}),
    });
  };

  likePhoto = (id: string): Promise<any> => {
    this.validateRequired(id, "id");
    return this.fetchUrl(this.API_LOCATION + urlConfig.LIKE_A_PHOTO.replace(/:id/gi, id), "POST");
  };

  unlikePhoto = (id: string): Promise<any> => {
    this.validateRequired(id, "id");
    return this.fetchUrl(this.API_LOCATION + urlConfig.UNLIKE_A_PHOTO.replace(/:id/gi, id), "DELETE");
  };

  search = (query: string, page?: number, per_page?: number, collections?: string | number, orientation?: string): Promise<any> => {
    this.validateRequired(query, "query");
    this.validateSupportedValue(orientation, this.availableOrientations, "orientation");
    return this.fetchUrl(this.API_LOCATION + urlConfig.SEARCH_PHOTOS, "GET", {
      query,
      page: page ?? 1,
      per_page: per_page ?? 10,
      collections: collections !== undefined ? String(collections) : undefined,
      orientation,
    });
  };

  searchCollections = (query: string, page?: number, per_page?: number): Promise<any> => {
    this.validateRequired(query, "query");
    return this.fetchUrl(this.API_LOCATION + urlConfig.SEARCH_COLLECTIONS, "GET", {
      query,
      page: page ?? 1,
      per_page: per_page ?? 10,
    });
  };

  searchUsers = (query: string, page?: number, per_page?: number): Promise<any> => {
    this.validateRequired(query, "query");
    return this.fetchUrl(this.API_LOCATION + urlConfig.SEARCH_USERS, "GET", {
      query,
      page: page ?? 1,
      per_page: per_page ?? 10,
    });
  };

  getStatsTotals = (): Promise<any> => {
    return this.fetchUrl(this.API_LOCATION + urlConfig.STATS_TOTALS, "GET");
  };

  getStatsMonth = (): Promise<any> => {
    return this.fetchUrl(this.API_LOCATION + urlConfig.STATS_MONTH, "GET");
  };

  listCollections = (page?: number, per_page?: number): Promise<any> => {
    return this.fetchUrl(this.API_LOCATION + urlConfig.LIST_COLLECTIONS, "GET", {
      page: page ?? 1,
      per_page: per_page ?? 10,
    });
  };

  listFeaturedCollections = (page?: number, per_page?: number): Promise<any> => {
    return this.fetchUrl(this.API_LOCATION + urlConfig.LIST_FEATURED_COLLECTIONS, "GET", {
      page: page ?? 1,
      per_page: per_page ?? 10,
    });
  };

  listCuratedCollections = (page?: number, per_page?: number): Promise<any> => {
    return this.fetchUrl(this.API_LOCATION + urlConfig.LIST_CURATED_COLLECTIONS, "GET", {
      page: page ?? 1,
      per_page: per_page ?? 10,
    });
  };

  getCollection = (id: string): Promise<any> => {
    this.validateRequired(id, "id");
    return this.fetchUrl(this.API_LOCATION + urlConfig.GET_COLLECTION.replace(/:id/gi, id), "GET");
  };

  getCuratedCollection = (id: string): Promise<any> => {
    this.validateRequired(id, "id");
    return this.fetchUrl(this.API_LOCATION + urlConfig.GET_CURATED_COLLECTION.replace(/:id/gi, id), "GET");
  };

  getCollectionPhotos = (id: string, page?: number, per_page?: number): Promise<any> => {
    this.validateRequired(id, "id");
    return this.fetchUrl(this.API_LOCATION + urlConfig.GET_COLLECTION_PHOTOS.replace(/:id/gi, id), "GET", {
      page: page ?? 1,
      per_page: per_page ?? 10,
    });
  };

  getCuratedCollectionPhotos = (id: string, page?: number, per_page?: number): Promise<any> => {
    this.validateRequired(id, "id");
    return this.fetchUrl(this.API_LOCATION + urlConfig.GET_CURATED_COLLECTION_PHOTOS.replace(/:id/gi, id), "GET", {
      page: page ?? 1,
      per_page: per_page ?? 10,
    });
  };

  listRelatedCollections = (id: string): Promise<any> => {
    this.validateRequired(id, "id");
    return this.fetchUrl(this.API_LOCATION + urlConfig.LIST_RELATED_COLLECTION.replace(/:id/gi, id), "GET");
  };

  /** Fetch a photo using the newer alias. */
  getPhoto = (id: string, width?: number, height?: number, rect?: string): Promise<any> => {
    return this.getAPhoto(id, width, height, rect);
  };

  getRandomPhoto = (
    collections?: string | number,
    featured?: boolean,
    username?: string,
    query?: string,
    width?: number,
    height?: number,
    orientation?: string,
    count?: number
  ): Promise<any> => {
    return this.getARandomPhoto(collections, featured, username, query, width, height, orientation, count);
  };

  createNewCollection = (title: string, description?: string, private_collection: boolean = false): Promise<any> => {
    this.validateRequired(title, "title");
    return this.fetchUrl(this.API_LOCATION + urlConfig.CREATE_NEW_COLLECTION, "POST", {
      title,
      description,
      private: private_collection,
    });
  };

  /** Create a collection using the newer alias. */
  createCollection = (title: string, description?: string, private_collection: boolean = false): Promise<any> => {
    return this.createNewCollection(title, description, private_collection);
  };

  createNewColection = (title: string, description?: string, private_collection: boolean = false): Promise<any> => {
    return this.createNewCollection(title, description, private_collection);
  };

  updateExistingCollection = (id: string, title: string, description?: string, private_collection: boolean = false): Promise<any> => {
    this.validateRequired(id, "id");
    this.validateRequired(title, "title");
    return this.fetchUrl(this.API_LOCATION + urlConfig.UPDATE_EXISTING_COLLECTION.replace(/:id/gi, id), "PUT", {
      title,
      description,
      private: private_collection,
    });
  };

  /** Update an existing collection using the newer alias. */
  updateCollection = (id: string, title: string, description?: string, private_collection: boolean = false): Promise<any> => {
    return this.updateExistingCollection(id, title, description, private_collection);
  };

  deleteCollection = (id: string): Promise<any> => {
    this.validateRequired(id, "id");
    return this.fetchUrl(this.API_LOCATION + urlConfig.DELETE_COLLECTION.replace(/:id/gi, id), "DELETE");
  };

  addPhotoToCollection = (collection_id: string, photo_id: string): Promise<any> => {
    this.validateRequired(collection_id, "collection_id");
    this.validateRequired(photo_id, "photo_id");
    return this.fetchUrl(this.API_LOCATION + urlConfig.ADD_PHOTO_TO_COLLECTION.replace(/:collection_id/gi, collection_id), "POST", {
      photo_id,
    });
  };

  removePhotoFromCollection = (collection_id: string, photo_id: string): Promise<any> => {
    this.validateRequired(collection_id, "collection_id");
    this.validateRequired(photo_id, "photo_id");
    return this.fetchUrl(this.API_LOCATION + urlConfig.REMOVE_PHOTO_FROM_COLLECTION.replace(/:collection_id/gi, collection_id), "DELETE", {
      photo_id,
    });
  };
}

export default WrapSplashApi;
