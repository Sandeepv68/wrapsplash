type WrapSplashOptions = {
    access_key?: string;
    secret_key?: string;
    redirect_uri?: string;
    code?: string;
    bearer_token?: string;
    timeout?: number;
    retries?: number;
    retryDelayMs?: number;
};
type WrapSplashResponse = Record<string, unknown>;
interface ErrorOptions {
    cause?: unknown;
    statusCode?: number;
    statusText?: string;
}
declare class WrapSplashError extends Error {
    statusCode?: number;
    statusText?: string;
    cause?: unknown;
    constructor(message: string, options?: ErrorOptions | number, statusText?: string, cause?: unknown);
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
    generateBearerToken: () => Promise<WrapSplashResponse>;
    getCurrentUserProfile: () => Promise<WrapSplashResponse>;
    updateCurrentUserProfile: (username?: string, first_name?: string, last_name?: string, email?: string, url?: string, location?: string, bio?: string, instagram_username?: string) => Promise<WrapSplashResponse>;
    getPublicProfile: (username: string, width?: number, height?: number) => Promise<WrapSplashResponse>;
    getUserPortfolio: (username: string) => Promise<WrapSplashResponse>;
    getUserPhotos: (username: string, page?: number, per_page?: number, stats?: boolean, resolution?: string, quantity?: number, order_by?: string) => Promise<WrapSplashResponse>;
    getUserLikedPhotos: (username: string, page?: number, per_page?: number, order_by?: string) => Promise<WrapSplashResponse>;
    getUserCollections: (username: string, page?: number, per_page?: number) => Promise<WrapSplashResponse>;
    getUserStatistics: (username: string, resolution?: string, quantity?: number) => Promise<WrapSplashResponse>;
    listPhotos: (page?: number, per_page?: number, order_by?: string) => Promise<WrapSplashResponse>;
    listCuratedPhotos: (page?: number, per_page?: number, order_by?: string) => Promise<WrapSplashResponse>;
    getAPhoto: (id: string, width?: number, height?: number, rect?: string) => Promise<WrapSplashResponse>;
    getARandomPhoto: (collections?: string | number, featured?: boolean, username?: string, query?: string, width?: number, height?: number, orientation?: string, count?: number) => Promise<WrapSplashResponse>;
    getPhotoStatistics: (id: string, resolution?: string, quantity?: number) => Promise<WrapSplashResponse>;
    getPhotoLink: (id: string) => Promise<WrapSplashResponse>;
    updatePhoto: (id: string, location?: Record<string, string | number | boolean | undefined>, exif?: Record<string, string | number | boolean | undefined>) => Promise<WrapSplashResponse>;
    likePhoto: (id: string) => Promise<WrapSplashResponse>;
    unlikePhoto: (id: string) => Promise<WrapSplashResponse>;
    search: (query: string, page?: number, per_page?: number, collections?: string | number, orientation?: string) => Promise<WrapSplashResponse>;
    searchCollections: (query: string, page?: number, per_page?: number) => Promise<WrapSplashResponse>;
    searchUsers: (query: string, page?: number, per_page?: number) => Promise<WrapSplashResponse>;
    getStatsTotals: () => Promise<WrapSplashResponse>;
    getStatsMonth: () => Promise<WrapSplashResponse>;
    listCollections: (page?: number, per_page?: number) => Promise<WrapSplashResponse>;
    listFeaturedCollections: (page?: number, per_page?: number) => Promise<WrapSplashResponse>;
    listCuratedCollections: (page?: number, per_page?: number) => Promise<WrapSplashResponse>;
    getCollection: (id: string) => Promise<WrapSplashResponse>;
    getCuratedCollection: (id: string) => Promise<WrapSplashResponse>;
    getCollectionPhotos: (id: string, page?: number, per_page?: number) => Promise<WrapSplashResponse>;
    getCuratedCollectionPhotos: (id: string, page?: number, per_page?: number) => Promise<WrapSplashResponse>;
    listRelatedCollections: (id: string) => Promise<WrapSplashResponse>;
    /** Fetch a photo using the newer alias. */
    getPhoto: (id: string, width?: number, height?: number, rect?: string) => Promise<WrapSplashResponse>;
    getRandomPhoto: (collections?: string | number, featured?: boolean, username?: string, query?: string, width?: number, height?: number, orientation?: string, count?: number) => Promise<WrapSplashResponse>;
    createNewCollection: (title: string, description?: string, private_collection?: boolean) => Promise<WrapSplashResponse>;
    /** Create a collection using the newer alias. */
    createCollection: (title: string, description?: string, private_collection?: boolean) => Promise<WrapSplashResponse>;
    /**
     * Backward-compatible alias for createNewCollection.
     * @deprecated Use createNewCollection instead.
     */
    createNewColection: (title: string, description?: string, private_collection?: boolean) => Promise<WrapSplashResponse>;
    updateExistingCollection: (id: string, title: string, description?: string, private_collection?: boolean) => Promise<WrapSplashResponse>;
    /** Update an existing collection using the newer alias. */
    updateCollection: (id: string, title: string, description?: string, private_collection?: boolean) => Promise<WrapSplashResponse>;
    deleteCollection: (id: string) => Promise<WrapSplashResponse>;
    addPhotoToCollection: (collection_id: string, photo_id: string) => Promise<WrapSplashResponse>;
    removePhotoFromCollection: (collection_id: string, photo_id: string) => Promise<WrapSplashResponse>;
}
export { WrapSplashError };
export default WrapSplashApi;
