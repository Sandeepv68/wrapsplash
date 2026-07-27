import { createHash as e } from "crypto";
import t from "axios";
//#region config/axiosConfig.ts
var n = {
	url: "",
	method: "",
	baseURL: "",
	headers: {},
	data: {},
	timeout: 1e3,
	withCredentials: !1,
	responseType: "json",
	responseEncoding: "utf8",
	validateStatus: function(e) {
		return e >= 200 && e < 300;
	},
	maxRedirects: 5,
	socketPath: null
}, r = class {
	http;
	retries;
	retryDelayMs;
	constructor(e) {
		this.http = t.create(e || n), this.retries = e?.retries ?? 2, this.retryDelayMs = e?.retryDelayMs ?? 100;
	}
	sleep(e) {
		return new Promise((t) => setTimeout(t, e));
	}
	isRetryableError(e) {
		if (t.isCancel(e)) return !1;
		let n = e;
		if (!n.response) return !0;
		let r = n.response.status;
		return r === 429 || r >= 500;
	}
	getRetryDelay(e, t) {
		let n = e;
		if (n.response) {
			let e = n.response.headers?.["retry-after"];
			if (e) {
				let t = Number(e);
				if (!Number.isNaN(t) && t > 0) return t * 1e3;
			}
		}
		return this.retryDelayMs * 2 ** t;
	}
	async makeRequest(e, t, n, r) {
		if (!e) throw Error("URL required");
		let i;
		for (let a = 0; a <= this.retries; a += 1) try {
			return await this.http({
				method: t || "get",
				url: e,
				params: n,
				data: r
			});
		} catch (e) {
			if (i = e, a >= this.retries || !this.isRetryableError(e)) throw e;
			let t = this.getRetryDelay(e, a);
			t > 0 && await this.sleep(t);
		}
		throw i;
	}
}, i = {
	API_LOCATION: "https://api.unsplash.com/",
	BEARER_TOKEN_URL: "https://unsplash.com/oauth/token",
	USERS_PUBLIC_PROFILE: "users/",
	USERS_PORTFOLIO: "users/:username/portfolio",
	USERS_PHOTOS: "users/:username/photos",
	USERS_LIKED_PHOTOS: "users/:username/likes",
	USERS_COLLECTIONS: "users/:username/collections",
	USERS_STATISTICS: "users/:username/statistics",
	LIST_PHOTOS: "photos",
	LIST_CURATED_PHOTOS: "photos/curated",
	GET_A_PHOTO: "photos/:id",
	GET_A_RANDOM_PHOTO: "photos/random",
	GET_A_PHOTO_STATISTICS: "photos/:id/statistics",
	GET_A_PHOTO_DOWNLOAD_LINK: "photos/:id/download",
	UPDATE_A_PHOTO: "photos/:id",
	LIKE_A_PHOTO: "photos/:id/like",
	UNLIKE_A_PHOTO: "photos/:id/like",
	SEARCH_PHOTOS: "search/photos",
	SEARCH_COLLECTIONS: "search/collections",
	SEARCH_USERS: "search/users",
	CURRENT_USER_PROFILE: "me",
	UPDATE_CURRENT_USER_PROFILE: "me",
	STATS_TOTALS: "stats/total",
	STATS_MONTH: "stats/month",
	LIST_COLLECTIONS: "collections",
	LIST_FEATURED_COLLECTIONS: "collections/featured",
	LIST_CURATED_COLLECTIONS: "collections/curated",
	GET_COLLECTION: "collections/:id",
	GET_CURATED_COLLECTION: "collections/curated/:id",
	GET_COLLECTION_PHOTOS: "collections/:id/photos",
	GET_CURATED_COLLECTION_PHOTOS: "collections/curated/:id/photos",
	LIST_RELATED_COLLECTION: "collections/:id/related",
	CREATE_NEW_COLLECTION: "collections",
	UPDATE_EXISTING_COLLECTION: "collections/:id",
	DELETE_COLLECTION: "collections/:id",
	ADD_PHOTO_TO_COLLECTION: "collections/:collection_id/add",
	REMOVE_PHOTO_FROM_COLLECTION: "collections/:collection_id/remove"
}, a = class extends Error {
	constructor(e, t, n, r) {
		super(e), this.name = "WrapSplashError", typeof t == "object" && t && !Array.isArray(t) ? (this.cause = t.cause, this.statusCode = t.statusCode, this.statusText = t.statusText) : typeof t == "number" && (this.statusCode = t, this.statusText = n, this.cause = r), Object.setPrototypeOf(this, new.target.prototype);
	}
}, o = class {
	constructor() {
		this.API_LOCATION = i.API_LOCATION, this.BEARER_TOKEN_URL = i.BEARER_TOKEN_URL, this.options = {}, this.access_key = "", this.secret_key = "", this.redirect_uri = "", this.code = "", this.grant_type = "authorization_code", this.bearer_token = "", this.timeout = 1e4, this.retries = 2, this.retryDelayMs = 100, this.headers = {
			"Content-type": "application/json",
			"X-Requested-With": "WrapSplash"
		}, this.availableOrders = [
			"latest",
			"oldest",
			"popular"
		], this.availableOrientations = [
			"landscape",
			"portrait",
			"squarish"
		], this.init = (e = {}) => {
			if (!e || typeof e != "object" || Array.isArray(e)) throw new a("Initialisation parameters required!");
			if (this.options = { ...e }, this.timeout = typeof this.options.timeout == "number" && this.options.timeout > 0 ? this.options.timeout : 1e4, this.retries = typeof this.options.retries == "number" && this.options.retries >= 0 ? this.options.retries : 2, this.retryDelayMs = typeof this.options.retryDelayMs == "number" && this.options.retryDelayMs >= 0 ? this.options.retryDelayMs : 100, this.bearer_token = this.options.bearer_token ?? "", this.headers = {
				"Content-type": "application/json",
				"X-Requested-With": "WrapSplash"
			}, this.options.bearer_token) {
				this.headers = {
					...this.headers,
					Authorization: `Bearer ${this.options.bearer_token}`,
					"X-WrapSplash-Header": this.computeHash(this.options.bearer_token)
				};
				return;
			}
			this.access_key = this.options.access_key ? this.options.access_key : (() => {
				throw new a("Access Key missing!");
			})(), this.secret_key = this.options.secret_key ? this.options.secret_key : (() => {
				throw new a("Secret Key missing!");
			})(), this.redirect_uri = this.options.redirect_uri ? this.options.redirect_uri : (() => {
				throw new a("Redirect URI missing!");
			})(), this.code = this.options.code ? this.options.code : (() => {
				throw new a("Authorization Code missing!");
			})(), this.headers = {
				...this.headers,
				Authorization: `Client-ID ${this.options.access_key}`,
				"X-WrapSplash-Header": this.computeHash(this.options.access_key)
			};
		}, this.generateBearerToken = () => (this.validateRequired(this.access_key, "access_key"), this.validateRequired(this.secret_key, "secret_key"), this.validateRequired(this.redirect_uri, "redirect_uri"), this.validateRequired(this.code, "code"), this.fetchUrl(this.BEARER_TOKEN_URL, "POST", {
			client_id: this.access_key,
			client_secret: this.secret_key,
			redirect_uri: this.redirect_uri,
			code: this.code,
			grant_type: this.grant_type
		})), this.getCurrentUserProfile = () => this.fetchUrl(this.API_LOCATION + i.CURRENT_USER_PROFILE, "GET"), this.updateCurrentUserProfile = (e, t, n, r, a, o, s, c) => this.fetchUrl(this.API_LOCATION + i.UPDATE_CURRENT_USER_PROFILE, "PUT", {
			username: e,
			first_name: t,
			last_name: n,
			email: r,
			url: a,
			location: o,
			bio: s,
			instagram_username: c
		}), this.getPublicProfile = (e, t, n) => (this.validateRequired(e, "username"), this.fetchUrl(this.API_LOCATION + i.USERS_PUBLIC_PROFILE + e, "GET", {
			w: t,
			h: n
		})), this.getUserPortfolio = (e) => (this.validateRequired(e, "username"), this.fetchUrl(this.API_LOCATION + i.USERS_PORTFOLIO.replace(/:username/gi, e), "GET")), this.getUserPhotos = (e, t, n, r, o, s, c) => {
			if (this.validateRequired(e, "username"), this.validateSupportedValue(c, this.availableOrders, "order_by"), r !== void 0 && typeof r != "boolean") throw new a("Parameter : stats is a boolean or optional!");
			return this.fetchUrl(this.API_LOCATION + i.USERS_PHOTOS.replace(/:username/gi, e), "GET", {
				page: t ?? 1,
				per_page: n ?? 10,
				order_by: c ?? "latest",
				stats: r ?? !1,
				resolution: o ?? "days",
				quantity: s ?? 30
			});
		}, this.getUserLikedPhotos = (e, t, n, r) => (this.validateRequired(e, "username"), this.validateSupportedValue(r, this.availableOrders, "order_by"), this.fetchUrl(this.API_LOCATION + i.USERS_LIKED_PHOTOS.replace(/:username/gi, e), "GET", {
			page: t ?? 1,
			per_page: n ?? 10,
			order_by: r ?? "latest"
		})), this.getUserCollections = (e, t, n) => (this.validateRequired(e, "username"), this.fetchUrl(this.API_LOCATION + i.USERS_COLLECTIONS.replace(/:username/gi, e), "GET", {
			page: t ?? 1,
			per_page: n ?? 10
		})), this.getUserStatistics = (e, t, n) => (this.validateRequired(e, "username"), this.fetchUrl(this.API_LOCATION + i.USERS_STATISTICS.replace(/:username/gi, e), "GET", {
			resolution: t ?? "days",
			quantity: n ?? 30
		})), this.listPhotos = (e, t, n) => {
			if (n !== void 0 && !this.availableOrders.includes(n)) throw new a("Parameter : order_by has an unsupported value!");
			return this.fetchUrl(this.API_LOCATION + i.LIST_PHOTOS, "GET", {
				page: e ?? 1,
				per_page: t ?? 10,
				order_by: n ?? "latest"
			});
		}, this.listCuratedPhotos = (e, t, n) => {
			if (n !== void 0 && !this.availableOrders.includes(n)) throw new a("Parameter : order_by has an unsupported value!");
			return this.fetchUrl(this.API_LOCATION + i.LIST_CURATED_PHOTOS, "GET", {
				page: e ?? 1,
				per_page: t ?? 10,
				order_by: n ?? "latest"
			});
		}, this.getAPhoto = (e, t, n, r) => (this.validateRequired(e, "id"), this.fetchUrl(this.API_LOCATION + i.GET_A_PHOTO.replace(/:id/gi, e), "GET", {
			w: t,
			h: n,
			rect: typeof r == "string" ? r : void 0
		})), this.getARandomPhoto = (e, t, n, r, a, o, s, c) => (this.validateSupportedValue(s, this.availableOrientations, "orientation"), this.fetchUrl(this.API_LOCATION + i.GET_A_RANDOM_PHOTO, "GET", {
			collections: e === void 0 ? void 0 : String(e),
			featured: t ?? !1,
			username: n,
			query: r,
			width: a,
			height: o,
			orientation: s ?? "landscape",
			count: c ?? 1
		})), this.getPhotoStatistics = (e, t, n) => (this.validateRequired(e, "id"), this.fetchUrl(this.API_LOCATION + i.GET_A_PHOTO_STATISTICS.replace(/:id/gi, e), "GET", {
			resolution: t ?? "days",
			quantity: n ?? 30
		})), this.getPhotoLink = (e) => (this.validateRequired(e, "id"), this.fetchUrl(this.API_LOCATION + i.GET_A_PHOTO_DOWNLOAD_LINK.replace(/:id/gi, e), "GET")), this.updatePhoto = (e, t = {}, n = {}) => (this.validateRequired(e, "id"), this.fetchUrl(this.API_LOCATION + i.UPDATE_A_PHOTO.replace(/:id/gi, e), "PUT", {
			...t.latitude ? { "location[latitude]": t.latitude } : {},
			...t.longitude ? { "location[longitude]": t.longitude } : {},
			...t.name ? { "location[name]": t.name } : {},
			...t.city ? { "location[city]": t.city } : {},
			...t.country ? { "location[country]": t.country } : {},
			...t.confidential ? { "location[confidential]": t.confidential } : {},
			...n.make ? { "exif[make]": n.make } : {},
			...n.model ? { "exif[model]": n.model } : {},
			...n.exposure_time ? { "exif[exposure_time]": n.exposure_time } : {},
			...n.aperture_value ? { "exif[aperture_value]": n.aperture_value } : {},
			...n.focal_length ? { "exif[focal_length]": n.focal_length } : {},
			...n.iso_speed_ratings ? { "exif[iso_speed_ratings]": n.iso_speed_ratings } : {}
		})), this.likePhoto = (e) => (this.validateRequired(e, "id"), this.fetchUrl(this.API_LOCATION + i.LIKE_A_PHOTO.replace(/:id/gi, e), "POST")), this.unlikePhoto = (e) => (this.validateRequired(e, "id"), this.fetchUrl(this.API_LOCATION + i.UNLIKE_A_PHOTO.replace(/:id/gi, e), "DELETE")), this.search = (e, t, n, r, a) => (this.validateRequired(e, "query"), this.validateSupportedValue(a, this.availableOrientations, "orientation"), this.fetchUrl(this.API_LOCATION + i.SEARCH_PHOTOS, "GET", {
			query: e,
			page: t ?? 1,
			per_page: n ?? 10,
			collections: r === void 0 ? void 0 : String(r),
			orientation: a
		})), this.searchCollections = (e, t, n) => (this.validateRequired(e, "query"), this.fetchUrl(this.API_LOCATION + i.SEARCH_COLLECTIONS, "GET", {
			query: e,
			page: t ?? 1,
			per_page: n ?? 10
		})), this.searchUsers = (e, t, n) => (this.validateRequired(e, "query"), this.fetchUrl(this.API_LOCATION + i.SEARCH_USERS, "GET", {
			query: e,
			page: t ?? 1,
			per_page: n ?? 10
		})), this.getStatsTotals = () => this.fetchUrl(this.API_LOCATION + i.STATS_TOTALS, "GET"), this.getStatsMonth = () => this.fetchUrl(this.API_LOCATION + i.STATS_MONTH, "GET"), this.listCollections = (e, t) => this.fetchUrl(this.API_LOCATION + i.LIST_COLLECTIONS, "GET", {
			page: e ?? 1,
			per_page: t ?? 10
		}), this.listFeaturedCollections = (e, t) => this.fetchUrl(this.API_LOCATION + i.LIST_FEATURED_COLLECTIONS, "GET", {
			page: e ?? 1,
			per_page: t ?? 10
		}), this.listCuratedCollections = (e, t) => this.fetchUrl(this.API_LOCATION + i.LIST_CURATED_COLLECTIONS, "GET", {
			page: e ?? 1,
			per_page: t ?? 10
		}), this.getCollection = (e) => (this.validateRequired(e, "id"), this.fetchUrl(this.API_LOCATION + i.GET_COLLECTION.replace(/:id/gi, e), "GET")), this.getCuratedCollection = (e) => (this.validateRequired(e, "id"), this.fetchUrl(this.API_LOCATION + i.GET_CURATED_COLLECTION.replace(/:id/gi, e), "GET")), this.getCollectionPhotos = (e, t, n) => (this.validateRequired(e, "id"), this.fetchUrl(this.API_LOCATION + i.GET_COLLECTION_PHOTOS.replace(/:id/gi, e), "GET", {
			page: t ?? 1,
			per_page: n ?? 10
		})), this.getCuratedCollectionPhotos = (e, t, n) => (this.validateRequired(e, "id"), this.fetchUrl(this.API_LOCATION + i.GET_CURATED_COLLECTION_PHOTOS.replace(/:id/gi, e), "GET", {
			page: t ?? 1,
			per_page: n ?? 10
		})), this.listRelatedCollections = (e) => (this.validateRequired(e, "id"), this.fetchUrl(this.API_LOCATION + i.LIST_RELATED_COLLECTION.replace(/:id/gi, e), "GET")), this.getPhoto = (e, t, n, r) => this.getAPhoto(e, t, n, r), this.getRandomPhoto = (e, t, n, r, i, a, o, s) => this.getARandomPhoto(e, t, n, r, i, a, o, s), this.createNewCollection = (e, t, n = !1) => (this.validateRequired(e, "title"), this.fetchUrl(this.API_LOCATION + i.CREATE_NEW_COLLECTION, "POST", {
			title: e,
			description: t,
			private: n
		})), this.createCollection = (e, t, n = !1) => this.createNewCollection(e, t, n), this.createNewColection = (e, t, n = !1) => this.createNewCollection(e, t, n), this.updateExistingCollection = (e, t, n, r = !1) => (this.validateRequired(e, "id"), this.validateRequired(t, "title"), this.fetchUrl(this.API_LOCATION + i.UPDATE_EXISTING_COLLECTION.replace(/:id/gi, e), "PUT", {
			title: t,
			description: n,
			private: r
		})), this.updateCollection = (e, t, n, r = !1) => this.updateExistingCollection(e, t, n, r), this.deleteCollection = (e) => (this.validateRequired(e, "id"), this.fetchUrl(this.API_LOCATION + i.DELETE_COLLECTION.replace(/:id/gi, e), "DELETE")), this.addPhotoToCollection = (e, t) => (this.validateRequired(e, "collection_id"), this.validateRequired(t, "photo_id"), this.fetchUrl(this.API_LOCATION + i.ADD_PHOTO_TO_COLLECTION.replace(/:collection_id/gi, e), "POST", { photo_id: t })), this.removePhotoFromCollection = (e, t) => (this.validateRequired(e, "collection_id"), this.validateRequired(t, "photo_id"), this.fetchUrl(this.API_LOCATION + i.REMOVE_PHOTO_FROM_COLLECTION.replace(/:collection_id/gi, e), "DELETE", { photo_id: t }));
	}
	computeHash(t) {
		return e("sha256").update(t).digest("hex");
	}
	validateRequired(e, t) {
		if (e == null || e === "") throw new a(t === "id" ? "Parameter : id is required!" : t === "query" ? "Parameter : query is missing!" : `Parameter : ${t} is required and cannot be empty!`);
	}
	validateSupportedValue(e, t, n) {
		if (e !== void 0 && !t.includes(e)) throw new a(`Parameter : ${n} has an unsupported value!`);
	}
	buildQueryParameters(e) {
		let t = {};
		return Object.entries(e).forEach(([e, n]) => {
			n != null && n !== "" && (t[e] = n);
		}), t;
	}
	getErrorMessage(e) {
		return e instanceof Error ? e.message : typeof e == "string" ? e : "Request failed";
	}
	createWrapSplashError(e) {
		if (e instanceof a) return e;
		let t = typeof e == "object" && e && "response" in e && e.response && typeof e.response == "object" && "status" in e.response ? e.response.status : void 0, n = typeof e == "object" && e && "response" in e && e.response && typeof e.response == "object" && "statusText" in e.response ? e.response.statusText : void 0;
		return new a(this.getErrorMessage(e), {
			cause: e,
			statusCode: t,
			statusText: n
		});
	}
	fetchUrl(e, t, n = {}, i = void 0) {
		return new r({
			headers: this.headers,
			timeout: this.timeout,
			retries: this.retries,
			retryDelayMs: this.retryDelayMs
		}).makeRequest(e, t.toLowerCase(), this.buildQueryParameters(n), i).then((e) => {
			let t = e;
			return t.status === 204 ? {
				status: t.status,
				statusText: t.statusText,
				message: "Content Deleted"
			} : t.status === 403 ? {
				status: t.status,
				statusText: t.statusText,
				message: "Rate Limit Exceeded"
			} : t.data;
		}).catch((e) => Promise.reject(this.createWrapSplashError(e)));
	}
};
//#endregion
export { a as WrapSplashError, o as default };

//# sourceMappingURL=wrapsplash.es.js.map