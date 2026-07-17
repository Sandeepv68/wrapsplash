export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonValue[] | {
    [key: string]: JsonValue;
};
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
export declare class WrapSplashError extends Error {
    readonly cause?: unknown;
    readonly statusCode?: number;
    readonly statusText?: string;
    constructor(message: string, options?: WrapSplashErrorOptions);
}
declare class WrapSplashApi {
    private API_LOCATION;
    private BEARER_TOKEN_URL;
    private options;
    private access_key;
    private secret_key;
    private redirect_uri;
    private code;
    private grant_type;
    private bearer_token;
    private timeout;
    private retries;
    private retryDelayMs;
    private headers;
    private computeHash;
    private validateRequired;
    private validateSupportedValue;
    private availableOrders;
    private availableOrientations;
    /** Initialize the client with API credentials or a bearer token. */
    init: (options?: WrapSplashOptions) => void;
    private buildQueryParameters;
    private getErrorMessage;
    private createWrapSplashError;
    private fetchUrl;
    /** Exchange the authorization code for a bearer token. */
    generateBearerToken: () => Promise<any>;
    getCurrentUserProfile: () => Promise<any>;
    updateCurrentUserProfile: (username?: string, first_name?: string, last_name?: string, email?: string, url?: string, location?: string, bio?: string, instagram_username?: string) => Promise<any>;
    getPublicProfile: (username: string, width?: number, height?: number) => Promise<any>;
    getUserPortfolio: (username: string) => Promise<any>;
    getUserPhotos: (username: string, page?: number, per_page?: number, stats?: boolean, resolution?: string, quantity?: number, order_by?: string) => Promise<any>;
    getUserLikedPhotos: (username: string, page?: number, per_page?: number, order_by?: string) => Promise<any>;
    getUserCollections: (username: string, page?: number, per_page?: number) => Promise<any>;
    getUserStatistics: (username: string, resolution?: string, quantity?: number) => Promise<any>;
    listPhotos: (page?: number, per_page?: number, order_by?: string) => Promise<any>;
    listCuratedPhotos: (page?: number, per_page?: number, order_by?: string) => Promise<any>;
    getAPhoto: (id: string, width?: number, height?: number, rect?: string) => Promise<any>;
    getARandomPhoto: (collections?: string | number, featured?: boolean, username?: string, query?: string, width?: number, height?: number, orientation?: string, count?: number) => Promise<any>;
    getPhotoStatistics: (id: string, resolution?: string, quantity?: number) => Promise<any>;
    getPhotoLink: (id: string) => Promise<any>;
    updatePhoto: (id: string, location?: Record<string, string | number | boolean | undefined>, exif?: Record<string, string | number | boolean | undefined>) => Promise<any>;
    likePhoto: (id: string) => Promise<any>;
    unlikePhoto: (id: string) => Promise<any>;
    search: (query: string, page?: number, per_page?: number, collections?: string | number, orientation?: string) => Promise<any>;
    searchCollections: (query: string, page?: number, per_page?: number) => Promise<any>;
    searchUsers: (query: string, page?: number, per_page?: number) => Promise<any>;
    getStatsTotals: () => Promise<any>;
    getStatsMonth: () => Promise<any>;
    listCollections: (page?: number, per_page?: number) => Promise<any>;
    listFeaturedCollections: (page?: number, per_page?: number) => Promise<any>;
    listCuratedCollections: (page?: number, per_page?: number) => Promise<any>;
    getCollection: (id: string) => Promise<any>;
    getCuratedCollection: (id: string) => Promise<any>;
    getCollectionPhotos: (id: string, page?: number, per_page?: number) => Promise<any>;
    getCuratedCollectionPhotos: (id: string, page?: number, per_page?: number) => Promise<any>;
    listRelatedCollections: (id: string) => Promise<any>;
    /** Fetch a photo using the newer alias. */
    getPhoto: (id: string, width?: number, height?: number, rect?: string) => Promise<any>;
    getRandomPhoto: (collections?: string | number, featured?: boolean, username?: string, query?: string, width?: number, height?: number, orientation?: string, count?: number) => Promise<any>;
    createNewCollection: (title: string, description?: string, private_collection?: boolean) => Promise<any>;
    /** Create a collection using the newer alias. */
    createCollection: (title: string, description?: string, private_collection?: boolean) => Promise<any>;
    createNewColection: (title: string, description?: string, private_collection?: boolean) => Promise<any>;
    updateExistingCollection: (id: string, title: string, description?: string, private_collection?: boolean) => Promise<any>;
    /** Update an existing collection using the newer alias. */
    updateCollection: (id: string, title: string, description?: string, private_collection?: boolean) => Promise<any>;
    deleteCollection: (id: string) => Promise<any>;
    addPhotoToCollection: (collection_id: string, photo_id: string) => Promise<any>;
    removePhotoFromCollection: (collection_id: string, photo_id: string) => Promise<any>;
}
export default WrapSplashApi;
