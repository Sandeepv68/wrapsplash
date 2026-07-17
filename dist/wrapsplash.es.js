import e from "axios";
//#region \0rolldown/runtime.js
var t = Object.create, n = Object.defineProperty, r = Object.getOwnPropertyDescriptor, i = Object.getOwnPropertyNames, a = Object.getPrototypeOf, o = Object.prototype.hasOwnProperty, s = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), c = (e, t, a, s) => {
	if (t && typeof t == "object" || typeof t == "function") for (var c = i(t), l = 0, u = c.length, d; l < u; l++) d = c[l], !o.call(e, d) && d !== a && n(e, d, {
		get: ((e) => t[e]).bind(null, d),
		enumerable: !(s = r(t, d)) || s.enumerable
	});
	return e;
}, l = (e, r, i) => (i = e == null ? {} : t(a(e)), c(r || !e || !e.__esModule ? n(i, "default", {
	value: e,
	enumerable: !0
}) : i, e)), u = /* @__PURE__ */ ((e) => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(e, { get: (e, t) => (typeof require < "u" ? require : e)[t] }) : e)(function(e) {
	if (typeof require < "u") return require.apply(this, arguments);
	throw Error("Calling `require` for \"" + e + "\" in an environment that doesn't expose the `require` function. See https://rolldown.rs/in-depth/bundling-cjs#require-external-modules for more details.");
}), d = /* @__PURE__ */ s(((e, t) => {
	t.exports = {};
})), f = /* @__PURE__ */ s(((e, t) => {
	(function(n, r) {
		typeof e == "object" ? t.exports = e = r() : typeof define == "function" && define.amd ? define([], r) : n.CryptoJS = r();
	})(e, function() {
		var e = e || function(e, t) {
			var n;
			if (typeof window < "u" && window.crypto && (n = window.crypto), typeof self < "u" && self.crypto && (n = self.crypto), typeof globalThis < "u" && globalThis.crypto && (n = globalThis.crypto), !n && typeof window < "u" && window.msCrypto && (n = window.msCrypto), !n && typeof global < "u" && global.crypto && (n = global.crypto), !n && typeof u == "function") try {
				n = d();
			} catch {}
			var r = function() {
				if (n) {
					if (typeof n.getRandomValues == "function") try {
						return n.getRandomValues(/* @__PURE__ */ new Uint32Array(1))[0];
					} catch {}
					if (typeof n.randomBytes == "function") try {
						return n.randomBytes(4).readInt32LE();
					} catch {}
				}
				throw Error("Native crypto module could not be used to get secure random number.");
			}, i = Object.create || function() {
				function e() {}
				return function(t) {
					var n;
					return e.prototype = t, n = new e(), e.prototype = null, n;
				};
			}(), a = {}, o = a.lib = {}, s = o.Base = function() {
				return {
					extend: function(e) {
						var t = i(this);
						return e && t.mixIn(e), (!t.hasOwnProperty("init") || this.init === t.init) && (t.init = function() {
							t.$super.init.apply(this, arguments);
						}), t.init.prototype = t, t.$super = this, t;
					},
					create: function() {
						var e = this.extend();
						return e.init.apply(e, arguments), e;
					},
					init: function() {},
					mixIn: function(e) {
						for (var t in e) e.hasOwnProperty(t) && (this[t] = e[t]);
						e.hasOwnProperty("toString") && (this.toString = e.toString);
					},
					clone: function() {
						return this.init.prototype.extend(this);
					}
				};
			}(), c = o.WordArray = s.extend({
				init: function(e, n) {
					e = this.words = e || [], n == t ? this.sigBytes = e.length * 4 : this.sigBytes = n;
				},
				toString: function(e) {
					return (e || f).stringify(this);
				},
				concat: function(e) {
					var t = this.words, n = e.words, r = this.sigBytes, i = e.sigBytes;
					if (this.clamp(), r % 4) for (var a = 0; a < i; a++) {
						var o = n[a >>> 2] >>> 24 - a % 4 * 8 & 255;
						t[r + a >>> 2] |= o << 24 - (r + a) % 4 * 8;
					}
					else for (var s = 0; s < i; s += 4) t[r + s >>> 2] = n[s >>> 2];
					return this.sigBytes += i, this;
				},
				clamp: function() {
					var t = this.words, n = this.sigBytes;
					t[n >>> 2] &= 4294967295 << 32 - n % 4 * 8, t.length = e.ceil(n / 4);
				},
				clone: function() {
					var e = s.clone.call(this);
					return e.words = this.words.slice(0), e;
				},
				random: function(e) {
					for (var t = [], n = 0; n < e; n += 4) t.push(r());
					return new c.init(t, e);
				}
			}), l = a.enc = {}, f = l.Hex = {
				stringify: function(e) {
					for (var t = e.words, n = e.sigBytes, r = [], i = 0; i < n; i++) {
						var a = t[i >>> 2] >>> 24 - i % 4 * 8 & 255;
						r.push((a >>> 4).toString(16)), r.push((a & 15).toString(16));
					}
					return r.join("");
				},
				parse: function(e) {
					for (var t = e.length, n = [], r = 0; r < t; r += 2) n[r >>> 3] |= parseInt(e.substr(r, 2), 16) << 24 - r % 8 * 4;
					return new c.init(n, t / 2);
				}
			}, p = l.Latin1 = {
				stringify: function(e) {
					for (var t = e.words, n = e.sigBytes, r = [], i = 0; i < n; i++) {
						var a = t[i >>> 2] >>> 24 - i % 4 * 8 & 255;
						r.push(String.fromCharCode(a));
					}
					return r.join("");
				},
				parse: function(e) {
					for (var t = e.length, n = [], r = 0; r < t; r++) n[r >>> 2] |= (e.charCodeAt(r) & 255) << 24 - r % 4 * 8;
					return new c.init(n, t);
				}
			}, m = l.Utf8 = {
				stringify: function(e) {
					try {
						return decodeURIComponent(escape(p.stringify(e)));
					} catch {
						throw Error("Malformed UTF-8 data");
					}
				},
				parse: function(e) {
					return p.parse(unescape(encodeURIComponent(e)));
				}
			}, h = o.BufferedBlockAlgorithm = s.extend({
				reset: function() {
					this._data = new c.init(), this._nDataBytes = 0;
				},
				_append: function(e) {
					typeof e == "string" && (e = m.parse(e)), this._data.concat(e), this._nDataBytes += e.sigBytes;
				},
				_process: function(t) {
					var n, r = this._data, i = r.words, a = r.sigBytes, o = this.blockSize, s = a / (o * 4);
					s = t ? e.ceil(s) : e.max((s | 0) - this._minBufferSize, 0);
					var l = s * o, u = e.min(l * 4, a);
					if (l) {
						for (var d = 0; d < l; d += o) this._doProcessBlock(i, d);
						n = i.splice(0, l), r.sigBytes -= u;
					}
					return new c.init(n, u);
				},
				clone: function() {
					var e = s.clone.call(this);
					return e._data = this._data.clone(), e;
				},
				_minBufferSize: 0
			});
			o.Hasher = h.extend({
				cfg: s.extend(),
				init: function(e) {
					this.cfg = this.cfg.extend(e), this.reset();
				},
				reset: function() {
					h.reset.call(this), this._doReset();
				},
				update: function(e) {
					return this._append(e), this._process(), this;
				},
				finalize: function(e) {
					return e && this._append(e), this._doFinalize();
				},
				blockSize: 512 / 32,
				_createHelper: function(e) {
					return function(t, n) {
						return new e.init(n).finalize(t);
					};
				},
				_createHmacHelper: function(e) {
					return function(t, n) {
						return new g.HMAC.init(e, n).finalize(t);
					};
				}
			});
			var g = a.algo = {};
			return a;
		}(Math);
		return e;
	});
})), p = /* @__PURE__ */ l((/* @__PURE__ */ s(((e, t) => {
	(function(n, r) {
		typeof e == "object" ? t.exports = e = r(f()) : typeof define == "function" && define.amd ? define(["./core"], r) : r(n.CryptoJS);
	})(e, function(e) {
		return (function(t) {
			var n = e, r = n.lib, i = r.WordArray, a = r.Hasher, o = n.algo, s = [], c = [];
			(function() {
				function e(e) {
					for (var n = t.sqrt(e), r = 2; r <= n; r++) if (!(e % r)) return !1;
					return !0;
				}
				function n(e) {
					return (e - (e | 0)) * 4294967296 | 0;
				}
				for (var r = 2, i = 0; i < 64;) e(r) && (i < 8 && (s[i] = n(t.pow(r, 1 / 2))), c[i] = n(t.pow(r, 1 / 3)), i++), r++;
			})();
			var l = [], u = o.SHA256 = a.extend({
				_doReset: function() {
					this._hash = new i.init(s.slice(0));
				},
				_doProcessBlock: function(e, t) {
					for (var n = this._hash.words, r = n[0], i = n[1], a = n[2], o = n[3], s = n[4], u = n[5], d = n[6], f = n[7], p = 0; p < 64; p++) {
						if (p < 16) l[p] = e[t + p] | 0;
						else {
							var m = l[p - 15], h = (m << 25 | m >>> 7) ^ (m << 14 | m >>> 18) ^ m >>> 3, g = l[p - 2], _ = (g << 15 | g >>> 17) ^ (g << 13 | g >>> 19) ^ g >>> 10;
							l[p] = h + l[p - 7] + _ + l[p - 16];
						}
						var v = s & u ^ ~s & d, y = r & i ^ r & a ^ i & a, b = (r << 30 | r >>> 2) ^ (r << 19 | r >>> 13) ^ (r << 10 | r >>> 22), x = (s << 26 | s >>> 6) ^ (s << 21 | s >>> 11) ^ (s << 7 | s >>> 25), S = f + x + v + c[p] + l[p], C = b + y;
						f = d, d = u, u = s, s = o + S | 0, o = a, a = i, i = r, r = S + C | 0;
					}
					n[0] = n[0] + r | 0, n[1] = n[1] + i | 0, n[2] = n[2] + a | 0, n[3] = n[3] + o | 0, n[4] = n[4] + s | 0, n[5] = n[5] + u | 0, n[6] = n[6] + d | 0, n[7] = n[7] + f | 0;
				},
				_doFinalize: function() {
					var e = this._data, n = e.words, r = this._nDataBytes * 8, i = e.sigBytes * 8;
					return n[i >>> 5] |= 128 << 24 - i % 32, n[(i + 64 >>> 9 << 4) + 14] = t.floor(r / 4294967296), n[(i + 64 >>> 9 << 4) + 15] = r, e.sigBytes = n.length * 4, this._process(), this._hash;
				},
				clone: function() {
					var e = a.clone.call(this);
					return e._hash = this._hash.clone(), e;
				}
			});
			n.SHA256 = a._createHelper(u), n.HmacSHA256 = a._createHmacHelper(u);
		})(Math), e.SHA256;
	});
})))()), m = {
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
}, h = class {
	http;
	constructor(t) {
		this.http = e.create(t || m);
	}
	makeRequest(e, t, n, r) {
		if (!e) throw Error("URL required");
		return this.http({
			method: t || "get",
			url: e,
			params: n,
			data: r
		});
	}
}, g = {
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
}, _ = class extends Error {
	constructor(e, t = 0, n = "", r) {
		super(e), this.name = "WrapSplashError", this.statusCode = t, this.statusText = n, this.cause = r, Object.setPrototypeOf(this, new.target.prototype);
	}
}, v = class {
	constructor() {
		this.API_LOCATION = g.API_LOCATION, this.BEARER_TOKEN_URL = g.BEARER_TOKEN_URL, this.options = {}, this.access_key = "", this.secret_key = "", this.redirect_uri = "", this.code = "", this.grant_type = "authorization_code", this.bearer_token = "", this.timeout = 1e4, this.headers = {
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
			if (!e || typeof e != "object" || Array.isArray(e)) throw Error("Initialisation parameters required!");
			if (this.options = { ...e }, this.timeout = typeof this.options.timeout == "number" && this.options.timeout > 0 ? this.options.timeout : 1e4, this.bearer_token = this.options.bearer_token ?? "", this.headers = {
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
				throw Error("Access Key missing!");
			})(), this.secret_key = this.options.secret_key ? this.options.secret_key : (() => {
				throw Error("Secret Key missing!");
			})(), this.redirect_uri = this.options.redirect_uri ? this.options.redirect_uri : (() => {
				throw Error("Redirect URI missing!");
			})(), this.code = this.options.code ? this.options.code : (() => {
				throw Error("Authorization Code missing!");
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
		})), this.getCurrentUserProfile = () => this.fetchUrl(this.API_LOCATION + g.CURRENT_USER_PROFILE, "GET"), this.updateCurrentUserProfile = (e, t, n, r, i, a, o, s) => this.fetchUrl(this.API_LOCATION + g.UPDATE_CURRENT_USER_PROFILE, "PUT", {
			username: e,
			first_name: t,
			last_name: n,
			email: r,
			url: i,
			location: a,
			bio: o,
			instagram_username: s
		}), this.getPublicProfile = (e, t, n) => (this.validateRequired(e, "username"), this.fetchUrl(this.API_LOCATION + g.USERS_PUBLIC_PROFILE + e, "GET", {
			w: t,
			h: n
		})), this.getUserPortfolio = (e) => (this.validateRequired(e, "username"), this.fetchUrl(this.API_LOCATION + g.USERS_PORTFOLIO.replace(/:username/gi, e), "GET")), this.getUserPhotos = (e, t, n, r, i, a, o) => {
			if (this.validateRequired(e, "username"), this.validateSupportedValue(o, this.availableOrders, "order_by"), r !== void 0 && typeof r != "boolean") throw new _("Parameter : stats is a boolean or optional!");
			return this.fetchUrl(this.API_LOCATION + g.USERS_PHOTOS.replace(/:username/gi, e), "GET", {
				page: t ?? 1,
				per_page: n ?? 10,
				order_by: o ?? "latest",
				stats: r ?? !1,
				resolution: i ?? "days",
				quantity: a ?? 30
			});
		}, this.getUserLikedPhotos = (e, t, n, r) => (this.validateRequired(e, "username"), this.validateSupportedValue(r, this.availableOrders, "order_by"), this.fetchUrl(this.API_LOCATION + g.USERS_LIKED_PHOTOS.replace(/:username/gi, e), "GET", {
			page: t ?? 1,
			per_page: n ?? 10,
			order_by: r ?? "latest"
		})), this.getUserCollections = (e, t, n) => (this.validateRequired(e, "username"), this.fetchUrl(this.API_LOCATION + g.USERS_COLLECTIONS.replace(/:username/gi, e), "GET", {
			page: t ?? 1,
			per_page: n ?? 10
		})), this.getUserStatistics = (e, t, n) => (this.validateRequired(e, "username"), this.fetchUrl(this.API_LOCATION + g.USERS_STATISTICS.replace(/:username/gi, e), "GET", {
			resolution: t ?? "days",
			quantity: n ?? 30
		})), this.listPhotos = (e, t, n) => {
			if (n !== void 0 && !this.availableOrders.includes(n)) throw new _("Parameter : order_by has an unsupported value!");
			return this.fetchUrl(this.API_LOCATION + g.LIST_PHOTOS, "GET", {
				page: e ?? 1,
				per_page: t ?? 10,
				order_by: n ?? "latest"
			});
		}, this.listCuratedPhotos = (e, t, n) => {
			if (n !== void 0 && !this.availableOrders.includes(n)) throw new _("Parameter : order_by has an unsupported value!");
			return this.fetchUrl(this.API_LOCATION + g.LIST_CURATED_PHOTOS, "GET", {
				page: e ?? 1,
				per_page: t ?? 10,
				order_by: n ?? "latest"
			});
		}, this.getAPhoto = (e, t, n, r) => (this.validateRequired(e, "id"), this.fetchUrl(this.API_LOCATION + g.GET_A_PHOTO.replace(/:id/gi, e), "GET", {
			w: t,
			h: n,
			rect: typeof r == "string" ? r : void 0
		})), this.getARandomPhoto = (e, t, n, r, i, a, o, s) => (this.validateSupportedValue(o, this.availableOrientations, "orientation"), this.fetchUrl(this.API_LOCATION + g.GET_A_RANDOM_PHOTO, "GET", {
			collections: e === void 0 ? void 0 : String(e),
			featured: t ?? !1,
			username: n,
			query: r,
			width: i,
			height: a,
			orientation: o ?? "landscape",
			count: s ?? 1
		})), this.getPhotoStatistics = (e, t, n) => (this.validateRequired(e, "id"), this.fetchUrl(this.API_LOCATION + g.GET_A_PHOTO_STATISTICS.replace(/:id/gi, e), "GET", {
			resolution: t ?? "days",
			quantity: n ?? 30
		})), this.getPhotoLink = (e) => (this.validateRequired(e, "id"), this.fetchUrl(this.API_LOCATION + g.GET_A_PHOTO_DOWNLOAD_LINK.replace(/:id/gi, e), "GET")), this.updatePhoto = (e, t = {}, n = {}) => (this.validateRequired(e, "id"), this.fetchUrl(this.API_LOCATION + g.UPDATE_A_PHOTO.replace(/:id/gi, e), "PUT", {
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
		})), this.likePhoto = (e) => (this.validateRequired(e, "id"), this.fetchUrl(this.API_LOCATION + g.LIKE_A_PHOTO.replace(/:id/gi, e), "POST")), this.unlikePhoto = (e) => (this.validateRequired(e, "id"), this.fetchUrl(this.API_LOCATION + g.UNLIKE_A_PHOTO.replace(/:id/gi, e), "DELETE")), this.search = (e, t, n, r, i) => (this.validateRequired(e, "query"), this.validateSupportedValue(i, this.availableOrientations, "orientation"), this.fetchUrl(this.API_LOCATION + g.SEARCH_PHOTOS, "GET", {
			query: e,
			page: t ?? 1,
			per_page: n ?? 10,
			collections: r === void 0 ? void 0 : String(r),
			orientation: i
		})), this.searchCollections = (e, t, n) => (this.validateRequired(e, "query"), this.fetchUrl(this.API_LOCATION + g.SEARCH_COLLECTIONS, "GET", {
			query: e,
			page: t ?? 1,
			per_page: n ?? 10
		})), this.searchUsers = (e, t, n) => (this.validateRequired(e, "query"), this.fetchUrl(this.API_LOCATION + g.SEARCH_USERS, "GET", {
			query: e,
			page: t ?? 1,
			per_page: n ?? 10
		})), this.getStatsTotals = () => this.fetchUrl(this.API_LOCATION + g.STATS_TOTALS, "GET"), this.getStatsMonth = () => this.fetchUrl(this.API_LOCATION + g.STATS_MONTH, "GET"), this.listCollections = (e, t) => this.fetchUrl(this.API_LOCATION + g.LIST_COLLECTIONS, "GET", {
			page: e ?? 1,
			per_page: t ?? 10
		}), this.listFeaturedCollections = (e, t) => this.fetchUrl(this.API_LOCATION + g.LIST_FEATURED_COLLECTIONS, "GET", {
			page: e ?? 1,
			per_page: t ?? 10
		}), this.listCuratedCollections = (e, t) => this.fetchUrl(this.API_LOCATION + g.LIST_CURATED_COLLECTIONS, "GET", {
			page: e ?? 1,
			per_page: t ?? 10
		}), this.getCollection = (e) => (this.validateRequired(e, "id"), this.fetchUrl(this.API_LOCATION + g.GET_COLLECTION.replace(/:id/gi, e), "GET")), this.getCuratedCollection = (e) => (this.validateRequired(e, "id"), this.fetchUrl(this.API_LOCATION + g.GET_CURATED_COLLECTION.replace(/:id/gi, e), "GET")), this.getCollectionPhotos = (e, t, n) => (this.validateRequired(e, "id"), this.fetchUrl(this.API_LOCATION + g.GET_COLLECTION_PHOTOS.replace(/:id/gi, e), "GET", {
			page: t ?? 1,
			per_page: n ?? 10
		})), this.getCuratedCollectionPhotos = (e, t, n) => (this.validateRequired(e, "id"), this.fetchUrl(this.API_LOCATION + g.GET_CURATED_COLLECTION_PHOTOS.replace(/:id/gi, e), "GET", {
			page: t ?? 1,
			per_page: n ?? 10
		})), this.listRelatedCollections = (e) => (this.validateRequired(e, "id"), this.fetchUrl(this.API_LOCATION + g.LIST_RELATED_COLLECTION.replace(/:id/gi, e), "GET")), this.getPhoto = (e, t, n, r) => this.getAPhoto(e, t, n, r), this.getRandomPhoto = (e, t, n, r, i, a, o, s) => this.getARandomPhoto(e, t, n, r, i, a, o, s), this.createNewCollection = (e, t, n = !1) => (this.validateRequired(e, "title"), this.fetchUrl(this.API_LOCATION + g.CREATE_NEW_COLLECTION, "POST", {
			title: e,
			description: t,
			private: n
		})), this.createCollection = (e, t, n = !1) => this.createNewCollection(e, t, n), this.createNewColection = (e, t, n = !1) => this.createNewCollection(e, t, n), this.updateExistingCollection = (e, t, n, r = !1) => (this.validateRequired(e, "id"), this.validateRequired(t, "title"), this.fetchUrl(this.API_LOCATION + g.UPDATE_EXISTING_COLLECTION.replace(/:id/gi, e), "PUT", {
			title: t,
			description: n,
			private: r
		})), this.updateCollection = (e, t, n, r = !1) => this.updateExistingCollection(e, t, n, r), this.deleteCollection = (e) => (this.validateRequired(e, "id"), this.fetchUrl(this.API_LOCATION + g.DELETE_COLLECTION.replace(/:id/gi, e), "DELETE")), this.addPhotoToCollection = (e, t) => (this.validateRequired(e, "collection_id"), this.validateRequired(t, "photo_id"), this.fetchUrl(this.API_LOCATION + g.ADD_PHOTO_TO_COLLECTION.replace(/:collection_id/gi, e), "POST", { photo_id: t })), this.removePhotoFromCollection = (e, t) => (this.validateRequired(e, "collection_id"), this.validateRequired(t, "photo_id"), this.fetchUrl(this.API_LOCATION + g.REMOVE_PHOTO_FROM_COLLECTION.replace(/:collection_id/gi, e), "DELETE", { photo_id: t }));
	}
	computeHash(e) {
		return (0, p.default)(e).toString();
	}
	validateRequired(e, t) {
		if (e == null || e === "") {
			let e = t === "id" ? "Parameter : id is required!" : t === "query" ? "Parameter : query is missing!" : `Parameter : ${t} is required and cannot be empty!`;
			throw Error(e);
		}
	}
	validateSupportedValue(e, t, n) {
		if (e !== void 0 && !t.includes(e)) throw Error(`Parameter : ${n} has an unsupported value!`);
	}
	buildQueryParameters(e) {
		let t = {};
		return Object.entries(e).forEach(([e, n]) => {
			n != null && n !== "" && (t[e] = n);
		}), t;
	}
	fetchUrl(e, t, n = {}, r = void 0) {
		return new h({
			headers: this.headers,
			timeout: this.timeout
		}).makeRequest(e, t.toLowerCase(), this.buildQueryParameters(n), r).then((e) => e.status === 204 ? {
			status: e.status,
			statusText: e.statusText,
			message: "Content Deleted"
		} : e.status === 403 ? {
			status: e.status,
			statusText: e.statusText,
			message: "Rate Limit Exceeded"
		} : e.data).catch((e) => Promise.reject(e));
	}
};
//#endregion
export { v as default };

//# sourceMappingURL=wrapsplash.es.js.map