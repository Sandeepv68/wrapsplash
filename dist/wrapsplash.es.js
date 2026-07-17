import x from "axios";
var m = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function F(_) {
  return _ && _.__esModule && Object.prototype.hasOwnProperty.call(_, "default") ? _.default : _;
}
function W(_) {
  if (_.__esModule) return _;
  var e = _.default;
  if (typeof e == "function") {
    var r = function i() {
      return this instanceof i ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    r.prototype = e.prototype;
  } else r = {};
  return Object.defineProperty(r, "__esModule", { value: !0 }), Object.keys(_).forEach(function(i) {
    var o = Object.getOwnPropertyDescriptor(_, i);
    Object.defineProperty(r, i, o.get ? o : {
      enumerable: !0,
      get: function() {
        return _[i];
      }
    });
  }), r;
}
var D = { exports: {} };
function K(_) {
  throw new Error('Could not dynamically require "' + _ + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var U = { exports: {} };
const j = {}, z = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: j
}, Symbol.toStringTag, { value: "Module" })), M = /* @__PURE__ */ W(z);
var H;
function $() {
  return H || (H = 1, function(_, e) {
    (function(r, i) {
      _.exports = i();
    })(m, function() {
      var r = r || function(i, o) {
        var u;
        if (typeof window < "u" && window.crypto && (u = window.crypto), typeof self < "u" && self.crypto && (u = self.crypto), typeof globalThis < "u" && globalThis.crypto && (u = globalThis.crypto), !u && typeof window < "u" && window.msCrypto && (u = window.msCrypto), !u && typeof m < "u" && m.crypto && (u = m.crypto), !u && typeof K == "function")
          try {
            u = M;
          } catch {
          }
        var T = function() {
          if (u) {
            if (typeof u.getRandomValues == "function")
              try {
                return u.getRandomValues(new Uint32Array(1))[0];
              } catch {
              }
            if (typeof u.randomBytes == "function")
              try {
                return u.randomBytes(4).readInt32LE();
              } catch {
              }
          }
          throw new Error("Native crypto module could not be used to get secure random number.");
        }, E = Object.create || /* @__PURE__ */ function() {
          function t() {
          }
          return function(s) {
            var n;
            return t.prototype = s, n = new t(), t.prototype = null, n;
          };
        }(), A = {}, v = A.lib = {}, S = v.Base = /* @__PURE__ */ function() {
          return {
            /**
             * Creates a new object that inherits from this object.
             *
             * @param {Object} overrides Properties to copy into the new object.
             *
             * @return {Object} The new object.
             *
             * @static
             *
             * @example
             *
             *     var MyType = CryptoJS.lib.Base.extend({
             *         field: 'value',
             *
             *         method: function () {
             *         }
             *     });
             */
            extend: function(t) {
              var s = E(this);
              return t && s.mixIn(t), (!s.hasOwnProperty("init") || this.init === s.init) && (s.init = function() {
                s.$super.init.apply(this, arguments);
              }), s.init.prototype = s, s.$super = this, s;
            },
            /**
             * Extends this object and runs the init method.
             * Arguments to create() will be passed to init().
             *
             * @return {Object} The new object.
             *
             * @static
             *
             * @example
             *
             *     var instance = MyType.create();
             */
            create: function() {
              var t = this.extend();
              return t.init.apply(t, arguments), t;
            },
            /**
             * Initializes a newly created object.
             * Override this method to add some logic when your objects are created.
             *
             * @example
             *
             *     var MyType = CryptoJS.lib.Base.extend({
             *         init: function () {
             *             // ...
             *         }
             *     });
             */
            init: function() {
            },
            /**
             * Copies properties into this object.
             *
             * @param {Object} properties The properties to mix in.
             *
             * @example
             *
             *     MyType.mixIn({
             *         field: 'value'
             *     });
             */
            mixIn: function(t) {
              for (var s in t)
                t.hasOwnProperty(s) && (this[s] = t[s]);
              t.hasOwnProperty("toString") && (this.toString = t.toString);
            },
            /**
             * Creates a copy of this object.
             *
             * @return {Object} The clone.
             *
             * @example
             *
             *     var clone = instance.clone();
             */
            clone: function() {
              return this.init.prototype.extend(this);
            }
          };
        }(), C = v.WordArray = S.extend({
          /**
           * Initializes a newly created word array.
           *
           * @param {Array} words (Optional) An array of 32-bit words.
           * @param {number} sigBytes (Optional) The number of significant bytes in the words.
           *
           * @example
           *
           *     var wordArray = CryptoJS.lib.WordArray.create();
           *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
           *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
           */
          init: function(t, s) {
            t = this.words = t || [], s != o ? this.sigBytes = s : this.sigBytes = t.length * 4;
          },
          /**
           * Converts this word array to a string.
           *
           * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
           *
           * @return {string} The stringified word array.
           *
           * @example
           *
           *     var string = wordArray + '';
           *     var string = wordArray.toString();
           *     var string = wordArray.toString(CryptoJS.enc.Utf8);
           */
          toString: function(t) {
            return (t || I).stringify(this);
          },
          /**
           * Concatenates a word array to this word array.
           *
           * @param {WordArray} wordArray The word array to append.
           *
           * @return {WordArray} This word array.
           *
           * @example
           *
           *     wordArray1.concat(wordArray2);
           */
          concat: function(t) {
            var s = this.words, n = t.words, c = this.sigBytes, O = t.sigBytes;
            if (this.clamp(), c % 4)
              for (var d = 0; d < O; d++) {
                var f = n[d >>> 2] >>> 24 - d % 4 * 8 & 255;
                s[c + d >>> 2] |= f << 24 - (c + d) % 4 * 8;
              }
            else
              for (var p = 0; p < O; p += 4)
                s[c + p >>> 2] = n[p >>> 2];
            return this.sigBytes += O, this;
          },
          /**
           * Removes insignificant bits.
           *
           * @example
           *
           *     wordArray.clamp();
           */
          clamp: function() {
            var t = this.words, s = this.sigBytes;
            t[s >>> 2] &= 4294967295 << 32 - s % 4 * 8, t.length = i.ceil(s / 4);
          },
          /**
           * Creates a copy of this word array.
           *
           * @return {WordArray} The clone.
           *
           * @example
           *
           *     var clone = wordArray.clone();
           */
          clone: function() {
            var t = S.clone.call(this);
            return t.words = this.words.slice(0), t;
          },
          /**
           * Creates a word array filled with random bytes.
           *
           * @param {number} nBytes The number of random bytes to generate.
           *
           * @return {WordArray} The random word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.lib.WordArray.random(16);
           */
          random: function(t) {
            for (var s = [], n = 0; n < t; n += 4)
              s.push(T());
            return new C.init(s, t);
          }
        }), w = A.enc = {}, I = w.Hex = {
          /**
           * Converts a word array to a hex string.
           *
           * @param {WordArray} wordArray The word array.
           *
           * @return {string} The hex string.
           *
           * @static
           *
           * @example
           *
           *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
           */
          stringify: function(t) {
            for (var s = t.words, n = t.sigBytes, c = [], O = 0; O < n; O++) {
              var d = s[O >>> 2] >>> 24 - O % 4 * 8 & 255;
              c.push((d >>> 4).toString(16)), c.push((d & 15).toString(16));
            }
            return c.join("");
          },
          /**
           * Converts a hex string to a word array.
           *
           * @param {string} hexStr The hex string.
           *
           * @return {WordArray} The word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
           */
          parse: function(t) {
            for (var s = t.length, n = [], c = 0; c < s; c += 2)
              n[c >>> 3] |= parseInt(t.substr(c, 2), 16) << 24 - c % 8 * 4;
            return new C.init(n, s / 2);
          }
        }, P = w.Latin1 = {
          /**
           * Converts a word array to a Latin1 string.
           *
           * @param {WordArray} wordArray The word array.
           *
           * @return {string} The Latin1 string.
           *
           * @static
           *
           * @example
           *
           *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
           */
          stringify: function(t) {
            for (var s = t.words, n = t.sigBytes, c = [], O = 0; O < n; O++) {
              var d = s[O >>> 2] >>> 24 - O % 4 * 8 & 255;
              c.push(String.fromCharCode(d));
            }
            return c.join("");
          },
          /**
           * Converts a Latin1 string to a word array.
           *
           * @param {string} latin1Str The Latin1 string.
           *
           * @return {WordArray} The word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
           */
          parse: function(t) {
            for (var s = t.length, n = [], c = 0; c < s; c++)
              n[c >>> 2] |= (t.charCodeAt(c) & 255) << 24 - c % 4 * 8;
            return new C.init(n, s);
          }
        }, h = w.Utf8 = {
          /**
           * Converts a word array to a UTF-8 string.
           *
           * @param {WordArray} wordArray The word array.
           *
           * @return {string} The UTF-8 string.
           *
           * @static
           *
           * @example
           *
           *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
           */
          stringify: function(t) {
            try {
              return decodeURIComponent(escape(P.stringify(t)));
            } catch {
              throw new Error("Malformed UTF-8 data");
            }
          },
          /**
           * Converts a UTF-8 string to a word array.
           *
           * @param {string} utf8Str The UTF-8 string.
           *
           * @return {WordArray} The word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
           */
          parse: function(t) {
            return P.parse(unescape(encodeURIComponent(t)));
          }
        }, l = v.BufferedBlockAlgorithm = S.extend({
          /**
           * Resets this block algorithm's data buffer to its initial state.
           *
           * @example
           *
           *     bufferedBlockAlgorithm.reset();
           */
          reset: function() {
            this._data = new C.init(), this._nDataBytes = 0;
          },
          /**
           * Adds new data to this block algorithm's buffer.
           *
           * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
           *
           * @example
           *
           *     bufferedBlockAlgorithm._append('data');
           *     bufferedBlockAlgorithm._append(wordArray);
           */
          _append: function(t) {
            typeof t == "string" && (t = h.parse(t)), this._data.concat(t), this._nDataBytes += t.sigBytes;
          },
          /**
           * Processes available data blocks.
           *
           * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
           *
           * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
           *
           * @return {WordArray} The processed data.
           *
           * @example
           *
           *     var processedData = bufferedBlockAlgorithm._process();
           *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
           */
          _process: function(t) {
            var s, n = this._data, c = n.words, O = n.sigBytes, d = this.blockSize, f = d * 4, p = O / f;
            t ? p = i.ceil(p) : p = i.max((p | 0) - this._minBufferSize, 0);
            var y = p * d, g = i.min(y * 4, O);
            if (y) {
              for (var R = 0; R < y; R += d)
                this._doProcessBlock(c, R);
              s = c.splice(0, y), n.sigBytes -= g;
            }
            return new C.init(s, g);
          },
          /**
           * Creates a copy of this object.
           *
           * @return {Object} The clone.
           *
           * @example
           *
           *     var clone = bufferedBlockAlgorithm.clone();
           */
          clone: function() {
            var t = S.clone.call(this);
            return t._data = this._data.clone(), t;
          },
          _minBufferSize: 0
        });
        v.Hasher = l.extend({
          /**
           * Configuration options.
           */
          cfg: S.extend(),
          /**
           * Initializes a newly created hasher.
           *
           * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
           *
           * @example
           *
           *     var hasher = CryptoJS.algo.SHA256.create();
           */
          init: function(t) {
            this.cfg = this.cfg.extend(t), this.reset();
          },
          /**
           * Resets this hasher to its initial state.
           *
           * @example
           *
           *     hasher.reset();
           */
          reset: function() {
            l.reset.call(this), this._doReset();
          },
          /**
           * Updates this hasher with a message.
           *
           * @param {WordArray|string} messageUpdate The message to append.
           *
           * @return {Hasher} This hasher.
           *
           * @example
           *
           *     hasher.update('message');
           *     hasher.update(wordArray);
           */
          update: function(t) {
            return this._append(t), this._process(), this;
          },
          /**
           * Finalizes the hash computation.
           * Note that the finalize operation is effectively a destructive, read-once operation.
           *
           * @param {WordArray|string} messageUpdate (Optional) A final message update.
           *
           * @return {WordArray} The hash.
           *
           * @example
           *
           *     var hash = hasher.finalize();
           *     var hash = hasher.finalize('message');
           *     var hash = hasher.finalize(wordArray);
           */
          finalize: function(t) {
            t && this._append(t);
            var s = this._doFinalize();
            return s;
          },
          blockSize: 16,
          /**
           * Creates a shortcut function to a hasher's object interface.
           *
           * @param {Hasher} hasher The hasher to create a helper for.
           *
           * @return {Function} The shortcut function.
           *
           * @static
           *
           * @example
           *
           *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
           */
          _createHelper: function(t) {
            return function(s, n) {
              return new t.init(n).finalize(s);
            };
          },
          /**
           * Creates a shortcut function to the HMAC's object interface.
           *
           * @param {Hasher} hasher The hasher to use in this HMAC helper.
           *
           * @return {Function} The shortcut function.
           *
           * @static
           *
           * @example
           *
           *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
           */
          _createHmacHelper: function(t) {
            return function(s, n) {
              return new L.HMAC.init(t, n).finalize(s);
            };
          }
        });
        var L = A.algo = {};
        return A;
      }(Math);
      return r;
    });
  }(U)), U.exports;
}
(function(_, e) {
  (function(r, i) {
    _.exports = i($());
  })(m, function(r) {
    return function(i) {
      var o = r, u = o.lib, T = u.WordArray, E = u.Hasher, A = o.algo, v = [], S = [];
      (function() {
        function I(L) {
          for (var t = i.sqrt(L), s = 2; s <= t; s++)
            if (!(L % s))
              return !1;
          return !0;
        }
        function P(L) {
          return (L - (L | 0)) * 4294967296 | 0;
        }
        for (var h = 2, l = 0; l < 64; )
          I(h) && (l < 8 && (v[l] = P(i.pow(h, 1 / 2))), S[l] = P(i.pow(h, 1 / 3)), l++), h++;
      })();
      var C = [], w = A.SHA256 = E.extend({
        _doReset: function() {
          this._hash = new T.init(v.slice(0));
        },
        _doProcessBlock: function(I, P) {
          for (var h = this._hash.words, l = h[0], L = h[1], t = h[2], s = h[3], n = h[4], c = h[5], O = h[6], d = h[7], f = 0; f < 64; f++) {
            if (f < 16)
              C[f] = I[P + f] | 0;
            else {
              var p = C[f - 15], y = (p << 25 | p >>> 7) ^ (p << 14 | p >>> 18) ^ p >>> 3, g = C[f - 2], R = (g << 15 | g >>> 17) ^ (g << 13 | g >>> 19) ^ g >>> 10;
              C[f] = y + C[f - 7] + R + C[f - 16];
            }
            var b = n & c ^ ~n & O, G = l & L ^ l & t ^ L & t, B = (l << 30 | l >>> 2) ^ (l << 19 | l >>> 13) ^ (l << 10 | l >>> 22), q = (n << 26 | n >>> 6) ^ (n << 21 | n >>> 11) ^ (n << 7 | n >>> 25), N = d + q + b + S[f] + C[f], k = B + G;
            d = O, O = c, c = n, n = s + N | 0, s = t, t = L, L = l, l = N + k | 0;
          }
          h[0] = h[0] + l | 0, h[1] = h[1] + L | 0, h[2] = h[2] + t | 0, h[3] = h[3] + s | 0, h[4] = h[4] + n | 0, h[5] = h[5] + c | 0, h[6] = h[6] + O | 0, h[7] = h[7] + d | 0;
        },
        _doFinalize: function() {
          var I = this._data, P = I.words, h = this._nDataBytes * 8, l = I.sigBytes * 8;
          return P[l >>> 5] |= 128 << 24 - l % 32, P[(l + 64 >>> 9 << 4) + 14] = i.floor(h / 4294967296), P[(l + 64 >>> 9 << 4) + 15] = h, I.sigBytes = P.length * 4, this._process(), this._hash;
        },
        clone: function() {
          var I = E.clone.call(this);
          return I._hash = this._hash.clone(), I;
        }
      });
      o.SHA256 = E._createHelper(w), o.HmacSHA256 = E._createHmacHelper(w);
    }(Math), r.SHA256;
  });
})(D);
var X = D.exports;
const V = /* @__PURE__ */ F(X), Q = {
  url: "",
  method: "",
  baseURL: "",
  headers: {},
  data: {},
  timeout: 1e3,
  withCredentials: !1,
  responseType: "json",
  responseEncoding: "utf8",
  validateStatus: function(_) {
    return _ >= 200 && _ < 300;
  },
  maxRedirects: 5,
  socketPath: null
};
class J {
  constructor(e) {
    this.http = x.create(e || Q);
  }
  makeRequest(e, r, i, o) {
    if (!e)
      throw new Error("URL required");
    return this.http({
      method: r || "get",
      url: e,
      params: i,
      data: o
    });
  }
}
const Y = "https://api.unsplash.com/", Z = "https://unsplash.com/oauth/token", ee = "users/", te = "users/:username/portfolio", re = "users/:username/photos", ie = "users/:username/likes", se = "users/:username/collections", oe = "users/:username/statistics", ne = "photos", ae = "photos/curated", he = "photos/:id", ce = "photos/random", ue = "photos/:id/statistics", le = "photos/:id/download", _e = "photos/:id", Oe = "photos/:id/like", Te = "photos/:id/like", de = "search/photos", Ee = "search/collections", fe = "search/users", pe = "me", Ce = "me", Le = "stats/total", Ie = "stats/month", Pe = "collections", Ae = "collections/featured", Se = "collections/curated", ge = "collections/:id", ve = "collections/curated/:id", we = "collections/:id/photos", ye = "collections/curated/:id/photos", Re = "collections/:id/related", me = "collections", Ue = "collections/:id", Ne = "collections/:id", He = "collections/:collection_id/add", De = "collections/:collection_id/remove", a = {
  API_LOCATION: Y,
  BEARER_TOKEN_URL: Z,
  USERS_PUBLIC_PROFILE: ee,
  USERS_PORTFOLIO: te,
  USERS_PHOTOS: re,
  USERS_LIKED_PHOTOS: ie,
  USERS_COLLECTIONS: se,
  USERS_STATISTICS: oe,
  LIST_PHOTOS: ne,
  LIST_CURATED_PHOTOS: ae,
  GET_A_PHOTO: he,
  GET_A_RANDOM_PHOTO: ce,
  GET_A_PHOTO_STATISTICS: ue,
  GET_A_PHOTO_DOWNLOAD_LINK: le,
  UPDATE_A_PHOTO: _e,
  LIKE_A_PHOTO: Oe,
  UNLIKE_A_PHOTO: Te,
  SEARCH_PHOTOS: de,
  SEARCH_COLLECTIONS: Ee,
  SEARCH_USERS: fe,
  CURRENT_USER_PROFILE: pe,
  UPDATE_CURRENT_USER_PROFILE: Ce,
  STATS_TOTALS: Le,
  STATS_MONTH: Ie,
  LIST_COLLECTIONS: Pe,
  LIST_FEATURED_COLLECTIONS: Ae,
  LIST_CURATED_COLLECTIONS: Se,
  GET_COLLECTION: ge,
  GET_CURATED_COLLECTION: ve,
  GET_COLLECTION_PHOTOS: we,
  GET_CURATED_COLLECTION_PHOTOS: ye,
  LIST_RELATED_COLLECTION: Re,
  CREATE_NEW_COLLECTION: me,
  UPDATE_EXISTING_COLLECTION: Ue,
  DELETE_COLLECTION: Ne,
  ADD_PHOTO_TO_COLLECTION: He,
  REMOVE_PHOTO_FROM_COLLECTION: De
};
class Ge {
  constructor() {
    this.API_LOCATION = a.API_LOCATION, this.BEARER_TOKEN_URL = a.BEARER_TOKEN_URL, this.options = {}, this.access_key = "", this.secret_key = "", this.redirect_uri = "", this.code = "", this.grant_type = "authorization_code", this.bearer_token = "", this.headers = {
      "Content-type": "application/json",
      "X-Requested-With": "WrapSplash"
    }, this.availableOrders = ["latest", "oldest", "popular"], this.availableOrientations = ["landscape", "portrait", "squarish"], this.init = (e = {}) => {
      if (!e || typeof e != "object")
        throw new Error("Initialisation parameters required!");
      if (this.options = { ...e }, this.options.bearer_token) {
        this.headers = {
          ...this.headers,
          Authorization: `Bearer ${this.options.bearer_token}`,
          "X-WrapSplash-Header": this.computeHash(this.options.bearer_token)
        };
        return;
      }
      this.access_key = this.options.access_key ? this.options.access_key : (() => {
        throw new Error("Access Key missing!");
      })(), this.secret_key = this.options.secret_key ? this.options.secret_key : (() => {
        throw new Error("Secret Key missing!");
      })(), this.redirect_uri = this.options.redirect_uri ? this.options.redirect_uri : (() => {
        throw new Error("Redirect URI missing!");
      })(), this.code = this.options.code ? this.options.code : (() => {
        throw new Error("Authorization Code missing!");
      })(), this.headers = {
        ...this.headers,
        Authorization: `Client-ID ${this.options.access_key}`,
        "X-WrapSplash-Header": this.computeHash(this.options.access_key)
      };
    }, this.generateBearerToken = () => this.fetchUrl(this.BEARER_TOKEN_URL, "POST", {
      client_id: this.access_key,
      client_secret: this.secret_key,
      redirect_uri: this.redirect_uri,
      code: this.code,
      grant_type: this.grant_type
    }), this.getCurrentUserProfile = () => this.fetchUrl(this.API_LOCATION + a.CURRENT_USER_PROFILE, "GET"), this.updateCurrentUserProfile = (e, r, i, o, u, T, E, A) => this.fetchUrl(this.API_LOCATION + a.UPDATE_CURRENT_USER_PROFILE, "PUT", {
      username: e,
      first_name: r,
      last_name: i,
      email: o,
      url: u,
      location: T,
      bio: E,
      instagram_username: A
    }), this.getPublicProfile = (e, r, i) => {
      if (!e)
        throw new Error("Parameter : username is required and cannot be empty!");
      return this.fetchUrl(this.API_LOCATION + a.USERS_PUBLIC_PROFILE + e, "GET", {
        w: r,
        h: i
      });
    }, this.getUserPortfolio = (e) => {
      if (!e)
        throw new Error("Parameter : username is required and cannot be empty!");
      return this.fetchUrl(
        this.API_LOCATION + a.USERS_PORTFOLIO.replace(/:username/gi, e),
        "GET"
      );
    }, this.getUserPhotos = (e, r, i, o, u, T, E) => {
      if (!e)
        throw new Error("Parameter : username is required and cannot be empty!");
      if (E !== void 0 && !this.availableOrders.includes(E))
        throw new Error("Parameter : order_by has an unsupported value!");
      if (o !== void 0 && typeof o != "boolean")
        throw new Error("Parameter : stats is a boolean or optional!");
      return this.fetchUrl(
        this.API_LOCATION + a.USERS_PHOTOS.replace(/:username/gi, e),
        "GET",
        {
          page: r ?? 1,
          per_page: i ?? 10,
          order_by: E ?? "latest",
          stats: o ?? !1,
          resolution: u ?? "days",
          quantity: T ?? 30
        }
      );
    }, this.getUserLikedPhotos = (e, r, i, o) => {
      if (!e)
        throw new Error("Parameter : username is required and cannot be empty!");
      if (o !== void 0 && !this.availableOrders.includes(o))
        throw new Error("Parameter : order_by has an unsupported value!");
      return this.fetchUrl(
        this.API_LOCATION + a.USERS_LIKED_PHOTOS.replace(/:username/gi, e),
        "GET",
        {
          page: r ?? 1,
          per_page: i ?? 10,
          order_by: o ?? "latest"
        }
      );
    }, this.getUserCollections = (e, r, i) => {
      if (!e)
        throw new Error("Parameter : username is required and cannot be empty!");
      return this.fetchUrl(
        this.API_LOCATION + a.USERS_COLLECTIONS.replace(/:username/gi, e),
        "GET",
        {
          page: r ?? 1,
          per_page: i ?? 10
        }
      );
    }, this.getUserStatistics = (e, r, i) => {
      if (!e)
        throw new Error("Parameter : username is required and cannot be empty!");
      return this.fetchUrl(
        this.API_LOCATION + a.USERS_STATISTICS.replace(/:username/gi, e),
        "GET",
        {
          resolution: r ?? "days",
          quantity: i ?? 30
        }
      );
    }, this.listPhotos = (e, r, i) => {
      if (i !== void 0 && !this.availableOrders.includes(i))
        throw new Error("Parameter : order_by has an unsupported value!");
      return this.fetchUrl(this.API_LOCATION + a.LIST_PHOTOS, "GET", {
        page: e ?? 1,
        per_page: r ?? 10,
        order_by: i ?? "latest"
      });
    }, this.listCuratedPhotos = (e, r, i) => {
      if (i !== void 0 && !this.availableOrders.includes(i))
        throw new Error("Parameter : order_by has an unsupported value!");
      return this.fetchUrl(this.API_LOCATION + a.LIST_CURATED_PHOTOS, "GET", {
        page: e ?? 1,
        per_page: r ?? 10,
        order_by: i ?? "latest"
      });
    }, this.getAPhoto = (e, r, i, o) => {
      if (!e)
        throw new Error("Parameter : id is required!");
      return this.fetchUrl(this.API_LOCATION + a.GET_A_PHOTO.replace(/:id/gi, e), "GET", {
        w: r,
        h: i,
        rect: typeof o == "string" ? o : void 0
      });
    }, this.getARandomPhoto = (e, r, i, o, u, T, E, A) => {
      if (E !== void 0 && !this.availableOrientations.includes(E))
        throw new Error("Parameter : orientation has an unsupported value!");
      return this.fetchUrl(this.API_LOCATION + a.GET_A_RANDOM_PHOTO, "GET", {
        collections: e !== void 0 ? String(e) : void 0,
        featured: r ?? !1,
        username: i,
        query: o,
        width: u,
        height: T,
        orientation: E ?? "landscape",
        count: A ?? 1
      });
    }, this.getPhotoStatistics = (e, r, i) => {
      if (!e)
        throw new Error("Parameter : id is required!");
      return this.fetchUrl(this.API_LOCATION + a.GET_A_PHOTO_STATISTICS.replace(/:id/gi, e), "GET", {
        resolution: r ?? "days",
        quantity: i ?? 30
      });
    }, this.getPhotoLink = (e) => {
      if (!e)
        throw new Error("Parameter : id is required!");
      return this.fetchUrl(this.API_LOCATION + a.GET_A_PHOTO_DOWNLOAD_LINK.replace(/:id/gi, e), "GET");
    }, this.updatePhoto = (e, r = {}, i = {}) => {
      if (!e)
        throw new Error("Parameter : id is required!");
      return this.fetchUrl(this.API_LOCATION + a.UPDATE_A_PHOTO.replace(/:id/gi, e), "PUT", {
        ...r.latitude ? { "location[latitude]": r.latitude } : {},
        ...r.longitude ? { "location[longitude]": r.longitude } : {},
        ...r.name ? { "location[name]": r.name } : {},
        ...r.city ? { "location[city]": r.city } : {},
        ...r.country ? { "location[country]": r.country } : {},
        ...r.confidential ? { "location[confidential]": r.confidential } : {},
        ...i.make ? { "exif[make]": i.make } : {},
        ...i.model ? { "exif[model]": i.model } : {},
        ...i.exposure_time ? { "exif[exposure_time]": i.exposure_time } : {},
        ...i.aperture_value ? { "exif[aperture_value]": i.aperture_value } : {},
        ...i.focal_length ? { "exif[focal_length]": i.focal_length } : {},
        ...i.iso_speed_ratings ? { "exif[iso_speed_ratings]": i.iso_speed_ratings } : {}
      });
    }, this.likePhoto = (e) => {
      if (!e)
        throw new Error("Parameter : id is required!");
      return this.fetchUrl(this.API_LOCATION + a.LIKE_A_PHOTO.replace(/:id/gi, e), "POST");
    }, this.unlikePhoto = (e) => {
      if (!e)
        throw new Error("Parameter : id is required!");
      return this.fetchUrl(this.API_LOCATION + a.UNLIKE_A_PHOTO.replace(/:id/gi, e), "DELETE");
    }, this.search = (e, r, i, o, u) => {
      if (e === void 0)
        throw new Error("Parameter : query is missing!");
      if (u !== void 0 && !this.availableOrientations.includes(u))
        throw new Error("Parameter : orientation has an unsupported value!");
      return this.fetchUrl(this.API_LOCATION + a.SEARCH_PHOTOS, "GET", {
        query: e,
        page: r ?? 1,
        per_page: i ?? 10,
        collections: o !== void 0 ? String(o) : void 0,
        orientation: u
      });
    }, this.searchCollections = (e, r, i) => {
      if (e === void 0)
        throw new Error("Parameter : query is missing!");
      return this.fetchUrl(this.API_LOCATION + a.SEARCH_COLLECTIONS, "GET", {
        query: e,
        page: r ?? 1,
        per_page: i ?? 10
      });
    }, this.searchUsers = (e, r, i) => {
      if (e === void 0)
        throw new Error("Parameter : query is missing!");
      return this.fetchUrl(this.API_LOCATION + a.SEARCH_USERS, "GET", {
        query: e,
        page: r ?? 1,
        per_page: i ?? 10
      });
    }, this.getStatsTotals = () => this.fetchUrl(this.API_LOCATION + a.STATS_TOTALS, "GET"), this.getStatsMonth = () => this.fetchUrl(this.API_LOCATION + a.STATS_MONTH, "GET"), this.listCollections = (e, r) => this.fetchUrl(this.API_LOCATION + a.LIST_COLLECTIONS, "GET", {
      page: e ?? 1,
      per_page: r ?? 10
    }), this.listFeaturedCollections = (e, r) => this.fetchUrl(this.API_LOCATION + a.LIST_FEATURED_COLLECTIONS, "GET", {
      page: e ?? 1,
      per_page: r ?? 10
    }), this.listCuratedCollections = (e, r) => this.fetchUrl(this.API_LOCATION + a.LIST_CURATED_COLLECTIONS, "GET", {
      page: e ?? 1,
      per_page: r ?? 10
    }), this.getCollection = (e) => {
      if (!e)
        throw new Error("Parameter : id is required!");
      return this.fetchUrl(this.API_LOCATION + a.GET_COLLECTION.replace(/:id/gi, e), "GET");
    }, this.getCuratedCollection = (e) => {
      if (!e)
        throw new Error("Parameter : id is required!");
      return this.fetchUrl(this.API_LOCATION + a.GET_CURATED_COLLECTION.replace(/:id/gi, e), "GET");
    }, this.getCollectionPhotos = (e, r, i) => {
      if (!e)
        throw new Error("Parameter : id is required!");
      return this.fetchUrl(this.API_LOCATION + a.GET_COLLECTION_PHOTOS.replace(/:id/gi, e), "GET", {
        page: r ?? 1,
        per_page: i ?? 10
      });
    }, this.getCuratedCollectionPhotos = (e, r, i) => {
      if (!e)
        throw new Error("Parameter : id is required!");
      return this.fetchUrl(this.API_LOCATION + a.GET_CURATED_COLLECTION_PHOTOS.replace(/:id/gi, e), "GET", {
        page: r ?? 1,
        per_page: i ?? 10
      });
    }, this.listRelatedCollections = (e) => {
      if (!e)
        throw new Error("Parameter : id is required!");
      return this.fetchUrl(this.API_LOCATION + a.LIST_RELATED_COLLECTION.replace(/:id/gi, e), "GET");
    }, this.createNewColection = (e, r, i = !1) => {
      if (!e)
        throw new Error("Parameter : title is required!");
      return this.fetchUrl(this.API_LOCATION + a.CREATE_NEW_COLLECTION, "POST", {
        title: e,
        description: r,
        private: i
      });
    }, this.updateExistingCollection = (e, r, i, o = !1) => {
      if (!e)
        throw new Error("Parameter : id is required!");
      if (!r)
        throw new Error("Parameter : title is required!");
      return this.fetchUrl(this.API_LOCATION + a.UPDATE_EXISTING_COLLECTION.replace(/:id/gi, e), "PUT", {
        title: r,
        description: i,
        private: o
      });
    }, this.deleteCollection = (e) => {
      if (!e)
        throw new Error("Parameter : id is required!");
      return this.fetchUrl(this.API_LOCATION + a.DELETE_COLLECTION.replace(/:id/gi, e), "DELETE");
    }, this.addPhotoToCollection = (e, r) => {
      if (!e)
        throw new Error("Parameter : collection_id is required!");
      if (!r)
        throw new Error("Parameter : photo_id is required!");
      return this.fetchUrl(this.API_LOCATION + a.ADD_PHOTO_TO_COLLECTION.replace(/:collection_id/gi, e), "POST", {
        photo_id: r
      });
    }, this.removePhotoFromCollection = (e, r) => {
      if (!e)
        throw new Error("Parameter : collection_id is required!");
      if (!r)
        throw new Error("Parameter : photo_id is required!");
      return this.fetchUrl(this.API_LOCATION + a.REMOVE_PHOTO_FROM_COLLECTION.replace(/:collection_id/gi, e), "DELETE", {
        photo_id: r
      });
    };
  }
  computeHash(e) {
    return V(e).toString();
  }
  buildQueryParameters(e) {
    const r = {};
    return Object.entries(e).forEach(([i, o]) => {
      o != null && o !== "" && (r[i] = o);
    }), r;
  }
  fetchUrl(e, r, i = {}, o = void 0) {
    return new J({
      headers: this.headers
    }).makeRequest(e, r.toLowerCase(), this.buildQueryParameters(i), o).then((T) => T.status === 204 ? {
      status: T.status,
      statusText: T.statusText,
      message: "Content Deleted"
    } : T.status === 403 ? {
      status: T.status,
      statusText: T.statusText,
      message: "Rate Limit Exceeded"
    } : T.data).catch((T) => Promise.reject(T));
  }
}
export {
  Ge as default
};
//# sourceMappingURL=wrapsplash.es.js.map
