import x from "axios";
var N = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function F(_) {
  return _ && _.__esModule && Object.prototype.hasOwnProperty.call(_, "default") ? _.default : _;
}
function W(_) {
  if (_.__esModule) return _;
  var t = _.default;
  if (typeof t == "function") {
    var e = function r() {
      return this instanceof r ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    e.prototype = t.prototype;
  } else e = {};
  return Object.defineProperty(e, "__esModule", { value: !0 }), Object.keys(_).forEach(function(r) {
    var o = Object.getOwnPropertyDescriptor(_, r);
    Object.defineProperty(e, r, o.get ? o : {
      enumerable: !0,
      get: function() {
        return _[r];
      }
    });
  }), e;
}
var D = { exports: {} };
function j(_) {
  throw new Error('Could not dynamically require "' + _ + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var m = { exports: {} };
const K = {}, z = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: K
}, Symbol.toStringTag, { value: "Module" })), M = /* @__PURE__ */ W(z);
var H;
function V() {
  return H || (H = 1, function(_, t) {
    (function(e, r) {
      _.exports = r();
    })(N, function() {
      var e = e || function(r, o) {
        var l;
        if (typeof window < "u" && window.crypto && (l = window.crypto), typeof self < "u" && self.crypto && (l = self.crypto), typeof globalThis < "u" && globalThis.crypto && (l = globalThis.crypto), !l && typeof window < "u" && window.msCrypto && (l = window.msCrypto), !l && typeof N < "u" && N.crypto && (l = N.crypto), !l && typeof j == "function")
          try {
            l = M;
          } catch {
          }
        var d = function() {
          if (l) {
            if (typeof l.getRandomValues == "function")
              try {
                return l.getRandomValues(new Uint32Array(1))[0];
              } catch {
              }
            if (typeof l.randomBytes == "function")
              try {
                return l.randomBytes(4).readInt32LE();
              } catch {
              }
          }
          throw new Error("Native crypto module could not be used to get secure random number.");
        }, p = Object.create || /* @__PURE__ */ function() {
          function i() {
          }
          return function(s) {
            var n;
            return i.prototype = s, n = new i(), i.prototype = null, n;
          };
        }(), I = {}, R = I.lib = {}, v = R.Base = /* @__PURE__ */ function() {
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
            extend: function(i) {
              var s = p(this);
              return i && s.mixIn(i), (!s.hasOwnProperty("init") || this.init === s.init) && (s.init = function() {
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
              var i = this.extend();
              return i.init.apply(i, arguments), i;
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
            mixIn: function(i) {
              for (var s in i)
                i.hasOwnProperty(s) && (this[s] = i[s]);
              i.hasOwnProperty("toString") && (this.toString = i.toString);
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
        }(), C = R.WordArray = v.extend({
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
          init: function(i, s) {
            i = this.words = i || [], s != o ? this.sigBytes = s : this.sigBytes = i.length * 4;
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
          toString: function(i) {
            return (i || S).stringify(this);
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
          concat: function(i) {
            var s = this.words, n = i.words, c = this.sigBytes, O = i.sigBytes;
            if (this.clamp(), c % 4)
              for (var T = 0; T < O; T++) {
                var E = n[T >>> 2] >>> 24 - T % 4 * 8 & 255;
                s[c + T >>> 2] |= E << 24 - (c + T) % 4 * 8;
              }
            else
              for (var f = 0; f < O; f += 4)
                s[c + f >>> 2] = n[f >>> 2];
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
            var i = this.words, s = this.sigBytes;
            i[s >>> 2] &= 4294967295 << 32 - s % 4 * 8, i.length = r.ceil(s / 4);
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
            var i = v.clone.call(this);
            return i.words = this.words.slice(0), i;
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
          random: function(i) {
            for (var s = [], n = 0; n < i; n += 4)
              s.push(d());
            return new C.init(s, i);
          }
        }), g = I.enc = {}, S = g.Hex = {
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
          stringify: function(i) {
            for (var s = i.words, n = i.sigBytes, c = [], O = 0; O < n; O++) {
              var T = s[O >>> 2] >>> 24 - O % 4 * 8 & 255;
              c.push((T >>> 4).toString(16)), c.push((T & 15).toString(16));
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
          parse: function(i) {
            for (var s = i.length, n = [], c = 0; c < s; c += 2)
              n[c >>> 3] |= parseInt(i.substr(c, 2), 16) << 24 - c % 8 * 4;
            return new C.init(n, s / 2);
          }
        }, A = g.Latin1 = {
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
          stringify: function(i) {
            for (var s = i.words, n = i.sigBytes, c = [], O = 0; O < n; O++) {
              var T = s[O >>> 2] >>> 24 - O % 4 * 8 & 255;
              c.push(String.fromCharCode(T));
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
          parse: function(i) {
            for (var s = i.length, n = [], c = 0; c < s; c++)
              n[c >>> 2] |= (i.charCodeAt(c) & 255) << 24 - c % 4 * 8;
            return new C.init(n, s);
          }
        }, h = g.Utf8 = {
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
          stringify: function(i) {
            try {
              return decodeURIComponent(escape(A.stringify(i)));
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
          parse: function(i) {
            return A.parse(unescape(encodeURIComponent(i)));
          }
        }, u = R.BufferedBlockAlgorithm = v.extend({
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
          _append: function(i) {
            typeof i == "string" && (i = h.parse(i)), this._data.concat(i), this._nDataBytes += i.sigBytes;
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
          _process: function(i) {
            var s, n = this._data, c = n.words, O = n.sigBytes, T = this.blockSize, E = T * 4, f = O / E;
            i ? f = r.ceil(f) : f = r.max((f | 0) - this._minBufferSize, 0);
            var y = f * T, P = r.min(y * 4, O);
            if (y) {
              for (var U = 0; U < y; U += T)
                this._doProcessBlock(c, U);
              s = c.splice(0, y), n.sigBytes -= P;
            }
            return new C.init(s, P);
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
            var i = v.clone.call(this);
            return i._data = this._data.clone(), i;
          },
          _minBufferSize: 0
        });
        R.Hasher = u.extend({
          /**
           * Configuration options.
           */
          cfg: v.extend(),
          /**
           * Initializes a newly created hasher.
           *
           * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
           *
           * @example
           *
           *     var hasher = CryptoJS.algo.SHA256.create();
           */
          init: function(i) {
            this.cfg = this.cfg.extend(i), this.reset();
          },
          /**
           * Resets this hasher to its initial state.
           *
           * @example
           *
           *     hasher.reset();
           */
          reset: function() {
            u.reset.call(this), this._doReset();
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
          update: function(i) {
            return this._append(i), this._process(), this;
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
          finalize: function(i) {
            i && this._append(i);
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
          _createHelper: function(i) {
            return function(s, n) {
              return new i.init(n).finalize(s);
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
          _createHmacHelper: function(i) {
            return function(s, n) {
              return new L.HMAC.init(i, n).finalize(s);
            };
          }
        });
        var L = I.algo = {};
        return I;
      }(Math);
      return e;
    });
  }(m)), m.exports;
}
(function(_, t) {
  (function(e, r) {
    _.exports = r(V());
  })(N, function(e) {
    return function(r) {
      var o = e, l = o.lib, d = l.WordArray, p = l.Hasher, I = o.algo, R = [], v = [];
      (function() {
        function S(L) {
          for (var i = r.sqrt(L), s = 2; s <= i; s++)
            if (!(L % s))
              return !1;
          return !0;
        }
        function A(L) {
          return (L - (L | 0)) * 4294967296 | 0;
        }
        for (var h = 2, u = 0; u < 64; )
          S(h) && (u < 8 && (R[u] = A(r.pow(h, 1 / 2))), v[u] = A(r.pow(h, 1 / 3)), u++), h++;
      })();
      var C = [], g = I.SHA256 = p.extend({
        _doReset: function() {
          this._hash = new d.init(R.slice(0));
        },
        _doProcessBlock: function(S, A) {
          for (var h = this._hash.words, u = h[0], L = h[1], i = h[2], s = h[3], n = h[4], c = h[5], O = h[6], T = h[7], E = 0; E < 64; E++) {
            if (E < 16)
              C[E] = S[A + E] | 0;
            else {
              var f = C[E - 15], y = (f << 25 | f >>> 7) ^ (f << 14 | f >>> 18) ^ f >>> 3, P = C[E - 2], U = (P << 15 | P >>> 17) ^ (P << 13 | P >>> 19) ^ P >>> 10;
              C[E] = y + C[E - 7] + U + C[E - 16];
            }
            var b = n & c ^ ~n & O, q = u & L ^ u & i ^ L & i, G = (u << 30 | u >>> 2) ^ (u << 19 | u >>> 13) ^ (u << 10 | u >>> 22), B = (n << 26 | n >>> 6) ^ (n << 21 | n >>> 11) ^ (n << 7 | n >>> 25), w = T + B + b + v[E] + C[E], k = G + q;
            T = O, O = c, c = n, n = s + w | 0, s = i, i = L, L = u, u = w + k | 0;
          }
          h[0] = h[0] + u | 0, h[1] = h[1] + L | 0, h[2] = h[2] + i | 0, h[3] = h[3] + s | 0, h[4] = h[4] + n | 0, h[5] = h[5] + c | 0, h[6] = h[6] + O | 0, h[7] = h[7] + T | 0;
        },
        _doFinalize: function() {
          var S = this._data, A = S.words, h = this._nDataBytes * 8, u = S.sigBytes * 8;
          return A[u >>> 5] |= 128 << 24 - u % 32, A[(u + 64 >>> 9 << 4) + 14] = r.floor(h / 4294967296), A[(u + 64 >>> 9 << 4) + 15] = h, S.sigBytes = A.length * 4, this._process(), this._hash;
        },
        clone: function() {
          var S = p.clone.call(this);
          return S._hash = this._hash.clone(), S;
        }
      });
      o.SHA256 = p._createHelper(g), o.HmacSHA256 = p._createHmacHelper(g);
    }(Math), e.SHA256;
  });
})(D);
var $ = D.exports;
const X = /* @__PURE__ */ F($), Q = {
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
  constructor(t) {
    this.http = x.create(t || Q);
  }
  makeRequest(t, e, r, o) {
    if (!t)
      throw new Error("URL required");
    return this.http({
      method: e || "get",
      url: t,
      params: r,
      data: o
    });
  }
}
const Y = "https://api.unsplash.com/", Z = "https://unsplash.com/oauth/token", tt = "users/", et = "users/:username/portfolio", rt = "users/:username/photos", it = "users/:username/likes", st = "users/:username/collections", ot = "users/:username/statistics", nt = "photos", at = "photos/curated", ht = "photos/:id", ct = "photos/random", lt = "photos/:id/statistics", ut = "photos/:id/download", _t = "photos/:id", dt = "photos/:id/like", Ot = "photos/:id/like", Tt = "search/photos", pt = "search/collections", Et = "search/users", ft = "me", Ct = "me", Lt = "stats/total", It = "stats/month", St = "collections", At = "collections/featured", vt = "collections/curated", Pt = "collections/:id", Rt = "collections/curated/:id", gt = "collections/:id/photos", yt = "collections/curated/:id/photos", Ut = "collections/:id/related", Nt = "collections", mt = "collections/:id", wt = "collections/:id", Ht = "collections/:collection_id/add", Dt = "collections/:collection_id/remove", a = {
  API_LOCATION: Y,
  BEARER_TOKEN_URL: Z,
  USERS_PUBLIC_PROFILE: tt,
  USERS_PORTFOLIO: et,
  USERS_PHOTOS: rt,
  USERS_LIKED_PHOTOS: it,
  USERS_COLLECTIONS: st,
  USERS_STATISTICS: ot,
  LIST_PHOTOS: nt,
  LIST_CURATED_PHOTOS: at,
  GET_A_PHOTO: ht,
  GET_A_RANDOM_PHOTO: ct,
  GET_A_PHOTO_STATISTICS: lt,
  GET_A_PHOTO_DOWNLOAD_LINK: ut,
  UPDATE_A_PHOTO: _t,
  LIKE_A_PHOTO: dt,
  UNLIKE_A_PHOTO: Ot,
  SEARCH_PHOTOS: Tt,
  SEARCH_COLLECTIONS: pt,
  SEARCH_USERS: Et,
  CURRENT_USER_PROFILE: ft,
  UPDATE_CURRENT_USER_PROFILE: Ct,
  STATS_TOTALS: Lt,
  STATS_MONTH: It,
  LIST_COLLECTIONS: St,
  LIST_FEATURED_COLLECTIONS: At,
  LIST_CURATED_COLLECTIONS: vt,
  GET_COLLECTION: Pt,
  GET_CURATED_COLLECTION: Rt,
  GET_COLLECTION_PHOTOS: gt,
  GET_CURATED_COLLECTION_PHOTOS: yt,
  LIST_RELATED_COLLECTION: Ut,
  CREATE_NEW_COLLECTION: Nt,
  UPDATE_EXISTING_COLLECTION: mt,
  DELETE_COLLECTION: wt,
  ADD_PHOTO_TO_COLLECTION: Ht,
  REMOVE_PHOTO_FROM_COLLECTION: Dt
};
class qt {
  constructor() {
    this.API_LOCATION = a.API_LOCATION, this.BEARER_TOKEN_URL = a.BEARER_TOKEN_URL, this.options = {}, this.access_key = "", this.secret_key = "", this.redirect_uri = "", this.code = "", this.grant_type = "authorization_code", this.bearer_token = "", this.timeout = 1e4, this.headers = {
      "Content-type": "application/json",
      "X-Requested-With": "WrapSplash"
    }, this.availableOrders = ["latest", "oldest", "popular"], this.availableOrientations = ["landscape", "portrait", "squarish"], this.init = (t = {}) => {
      if (!t || typeof t != "object" || Array.isArray(t))
        throw new Error("Initialisation parameters required!");
      if (this.options = { ...t }, this.timeout = typeof this.options.timeout == "number" && this.options.timeout > 0 ? this.options.timeout : 1e4, this.bearer_token = this.options.bearer_token ?? "", this.headers = {
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
    }, this.generateBearerToken = () => (this.validateRequired(this.access_key, "access_key"), this.validateRequired(this.secret_key, "secret_key"), this.validateRequired(this.redirect_uri, "redirect_uri"), this.validateRequired(this.code, "code"), this.fetchUrl(this.BEARER_TOKEN_URL, "POST", {
      client_id: this.access_key,
      client_secret: this.secret_key,
      redirect_uri: this.redirect_uri,
      code: this.code,
      grant_type: this.grant_type
    })), this.getCurrentUserProfile = () => this.fetchUrl(this.API_LOCATION + a.CURRENT_USER_PROFILE, "GET"), this.updateCurrentUserProfile = (t, e, r, o, l, d, p, I) => this.fetchUrl(this.API_LOCATION + a.UPDATE_CURRENT_USER_PROFILE, "PUT", {
      username: t,
      first_name: e,
      last_name: r,
      email: o,
      url: l,
      location: d,
      bio: p,
      instagram_username: I
    }), this.getPublicProfile = (t, e, r) => (this.validateRequired(t, "username"), this.fetchUrl(this.API_LOCATION + a.USERS_PUBLIC_PROFILE + t, "GET", {
      w: e,
      h: r
    })), this.getUserPortfolio = (t) => (this.validateRequired(t, "username"), this.fetchUrl(
      this.API_LOCATION + a.USERS_PORTFOLIO.replace(/:username/gi, t),
      "GET"
    )), this.getUserPhotos = (t, e, r, o, l, d, p) => {
      if (this.validateRequired(t, "username"), this.validateSupportedValue(p, this.availableOrders, "order_by"), o !== void 0 && typeof o != "boolean")
        throw new Error("Parameter : stats is a boolean or optional!");
      return this.fetchUrl(
        this.API_LOCATION + a.USERS_PHOTOS.replace(/:username/gi, t),
        "GET",
        {
          page: e ?? 1,
          per_page: r ?? 10,
          order_by: p ?? "latest",
          stats: o ?? !1,
          resolution: l ?? "days",
          quantity: d ?? 30
        }
      );
    }, this.getUserLikedPhotos = (t, e, r, o) => (this.validateRequired(t, "username"), this.validateSupportedValue(o, this.availableOrders, "order_by"), this.fetchUrl(
      this.API_LOCATION + a.USERS_LIKED_PHOTOS.replace(/:username/gi, t),
      "GET",
      {
        page: e ?? 1,
        per_page: r ?? 10,
        order_by: o ?? "latest"
      }
    )), this.getUserCollections = (t, e, r) => (this.validateRequired(t, "username"), this.fetchUrl(
      this.API_LOCATION + a.USERS_COLLECTIONS.replace(/:username/gi, t),
      "GET",
      {
        page: e ?? 1,
        per_page: r ?? 10
      }
    )), this.getUserStatistics = (t, e, r) => (this.validateRequired(t, "username"), this.fetchUrl(
      this.API_LOCATION + a.USERS_STATISTICS.replace(/:username/gi, t),
      "GET",
      {
        resolution: e ?? "days",
        quantity: r ?? 30
      }
    )), this.listPhotos = (t, e, r) => {
      if (r !== void 0 && !this.availableOrders.includes(r))
        throw new Error("Parameter : order_by has an unsupported value!");
      return this.fetchUrl(this.API_LOCATION + a.LIST_PHOTOS, "GET", {
        page: t ?? 1,
        per_page: e ?? 10,
        order_by: r ?? "latest"
      });
    }, this.listCuratedPhotos = (t, e, r) => {
      if (r !== void 0 && !this.availableOrders.includes(r))
        throw new Error("Parameter : order_by has an unsupported value!");
      return this.fetchUrl(this.API_LOCATION + a.LIST_CURATED_PHOTOS, "GET", {
        page: t ?? 1,
        per_page: e ?? 10,
        order_by: r ?? "latest"
      });
    }, this.getAPhoto = (t, e, r, o) => (this.validateRequired(t, "id"), this.fetchUrl(this.API_LOCATION + a.GET_A_PHOTO.replace(/:id/gi, t), "GET", {
      w: e,
      h: r,
      rect: typeof o == "string" ? o : void 0
    })), this.getARandomPhoto = (t, e, r, o, l, d, p, I) => (this.validateSupportedValue(p, this.availableOrientations, "orientation"), this.fetchUrl(this.API_LOCATION + a.GET_A_RANDOM_PHOTO, "GET", {
      collections: t !== void 0 ? String(t) : void 0,
      featured: e ?? !1,
      username: r,
      query: o,
      width: l,
      height: d,
      orientation: p ?? "landscape",
      count: I ?? 1
    })), this.getPhotoStatistics = (t, e, r) => (this.validateRequired(t, "id"), this.fetchUrl(this.API_LOCATION + a.GET_A_PHOTO_STATISTICS.replace(/:id/gi, t), "GET", {
      resolution: e ?? "days",
      quantity: r ?? 30
    })), this.getPhotoLink = (t) => (this.validateRequired(t, "id"), this.fetchUrl(this.API_LOCATION + a.GET_A_PHOTO_DOWNLOAD_LINK.replace(/:id/gi, t), "GET")), this.updatePhoto = (t, e = {}, r = {}) => (this.validateRequired(t, "id"), this.fetchUrl(this.API_LOCATION + a.UPDATE_A_PHOTO.replace(/:id/gi, t), "PUT", {
      ...e.latitude ? { "location[latitude]": e.latitude } : {},
      ...e.longitude ? { "location[longitude]": e.longitude } : {},
      ...e.name ? { "location[name]": e.name } : {},
      ...e.city ? { "location[city]": e.city } : {},
      ...e.country ? { "location[country]": e.country } : {},
      ...e.confidential ? { "location[confidential]": e.confidential } : {},
      ...r.make ? { "exif[make]": r.make } : {},
      ...r.model ? { "exif[model]": r.model } : {},
      ...r.exposure_time ? { "exif[exposure_time]": r.exposure_time } : {},
      ...r.aperture_value ? { "exif[aperture_value]": r.aperture_value } : {},
      ...r.focal_length ? { "exif[focal_length]": r.focal_length } : {},
      ...r.iso_speed_ratings ? { "exif[iso_speed_ratings]": r.iso_speed_ratings } : {}
    })), this.likePhoto = (t) => (this.validateRequired(t, "id"), this.fetchUrl(this.API_LOCATION + a.LIKE_A_PHOTO.replace(/:id/gi, t), "POST")), this.unlikePhoto = (t) => (this.validateRequired(t, "id"), this.fetchUrl(this.API_LOCATION + a.UNLIKE_A_PHOTO.replace(/:id/gi, t), "DELETE")), this.search = (t, e, r, o, l) => (this.validateRequired(t, "query"), this.validateSupportedValue(l, this.availableOrientations, "orientation"), this.fetchUrl(this.API_LOCATION + a.SEARCH_PHOTOS, "GET", {
      query: t,
      page: e ?? 1,
      per_page: r ?? 10,
      collections: o !== void 0 ? String(o) : void 0,
      orientation: l
    })), this.searchCollections = (t, e, r) => (this.validateRequired(t, "query"), this.fetchUrl(this.API_LOCATION + a.SEARCH_COLLECTIONS, "GET", {
      query: t,
      page: e ?? 1,
      per_page: r ?? 10
    })), this.searchUsers = (t, e, r) => (this.validateRequired(t, "query"), this.fetchUrl(this.API_LOCATION + a.SEARCH_USERS, "GET", {
      query: t,
      page: e ?? 1,
      per_page: r ?? 10
    })), this.getStatsTotals = () => this.fetchUrl(this.API_LOCATION + a.STATS_TOTALS, "GET"), this.getStatsMonth = () => this.fetchUrl(this.API_LOCATION + a.STATS_MONTH, "GET"), this.listCollections = (t, e) => this.fetchUrl(this.API_LOCATION + a.LIST_COLLECTIONS, "GET", {
      page: t ?? 1,
      per_page: e ?? 10
    }), this.listFeaturedCollections = (t, e) => this.fetchUrl(this.API_LOCATION + a.LIST_FEATURED_COLLECTIONS, "GET", {
      page: t ?? 1,
      per_page: e ?? 10
    }), this.listCuratedCollections = (t, e) => this.fetchUrl(this.API_LOCATION + a.LIST_CURATED_COLLECTIONS, "GET", {
      page: t ?? 1,
      per_page: e ?? 10
    }), this.getCollection = (t) => (this.validateRequired(t, "id"), this.fetchUrl(this.API_LOCATION + a.GET_COLLECTION.replace(/:id/gi, t), "GET")), this.getCuratedCollection = (t) => (this.validateRequired(t, "id"), this.fetchUrl(this.API_LOCATION + a.GET_CURATED_COLLECTION.replace(/:id/gi, t), "GET")), this.getCollectionPhotos = (t, e, r) => (this.validateRequired(t, "id"), this.fetchUrl(this.API_LOCATION + a.GET_COLLECTION_PHOTOS.replace(/:id/gi, t), "GET", {
      page: e ?? 1,
      per_page: r ?? 10
    })), this.getCuratedCollectionPhotos = (t, e, r) => (this.validateRequired(t, "id"), this.fetchUrl(this.API_LOCATION + a.GET_CURATED_COLLECTION_PHOTOS.replace(/:id/gi, t), "GET", {
      page: e ?? 1,
      per_page: r ?? 10
    })), this.listRelatedCollections = (t) => (this.validateRequired(t, "id"), this.fetchUrl(this.API_LOCATION + a.LIST_RELATED_COLLECTION.replace(/:id/gi, t), "GET")), this.getPhoto = (t, e, r, o) => this.getAPhoto(t, e, r, o), this.getRandomPhoto = (t, e, r, o, l, d, p, I) => this.getARandomPhoto(t, e, r, o, l, d, p, I), this.createNewCollection = (t, e, r = !1) => (this.validateRequired(t, "title"), this.fetchUrl(this.API_LOCATION + a.CREATE_NEW_COLLECTION, "POST", {
      title: t,
      description: e,
      private: r
    })), this.createCollection = (t, e, r = !1) => this.createNewCollection(t, e, r), this.createNewColection = (t, e, r = !1) => this.createNewCollection(t, e, r), this.updateExistingCollection = (t, e, r, o = !1) => (this.validateRequired(t, "id"), this.validateRequired(e, "title"), this.fetchUrl(this.API_LOCATION + a.UPDATE_EXISTING_COLLECTION.replace(/:id/gi, t), "PUT", {
      title: e,
      description: r,
      private: o
    })), this.updateCollection = (t, e, r, o = !1) => this.updateExistingCollection(t, e, r, o), this.deleteCollection = (t) => (this.validateRequired(t, "id"), this.fetchUrl(this.API_LOCATION + a.DELETE_COLLECTION.replace(/:id/gi, t), "DELETE")), this.addPhotoToCollection = (t, e) => (this.validateRequired(t, "collection_id"), this.validateRequired(e, "photo_id"), this.fetchUrl(this.API_LOCATION + a.ADD_PHOTO_TO_COLLECTION.replace(/:collection_id/gi, t), "POST", {
      photo_id: e
    })), this.removePhotoFromCollection = (t, e) => (this.validateRequired(t, "collection_id"), this.validateRequired(e, "photo_id"), this.fetchUrl(this.API_LOCATION + a.REMOVE_PHOTO_FROM_COLLECTION.replace(/:collection_id/gi, t), "DELETE", {
      photo_id: e
    }));
  }
  computeHash(t) {
    return X(t).toString();
  }
  validateRequired(t, e) {
    if (t == null || t === "") {
      const r = e === "id" ? "Parameter : id is required!" : e === "query" ? "Parameter : query is missing!" : `Parameter : ${e} is required and cannot be empty!`;
      throw new Error(r);
    }
  }
  validateSupportedValue(t, e, r) {
    if (t !== void 0 && !e.includes(t))
      throw new Error(`Parameter : ${r} has an unsupported value!`);
  }
  buildQueryParameters(t) {
    const e = {};
    return Object.entries(t).forEach(([r, o]) => {
      o != null && o !== "" && (e[r] = o);
    }), e;
  }
  fetchUrl(t, e, r = {}, o = void 0) {
    return new J({
      headers: this.headers,
      timeout: this.timeout
    }).makeRequest(t, e.toLowerCase(), this.buildQueryParameters(r), o).then((d) => d.status === 204 ? {
      status: d.status,
      statusText: d.statusText,
      message: "Content Deleted"
    } : d.status === 403 ? {
      status: d.status,
      statusText: d.statusText,
      message: "Rate Limit Exceeded"
    } : d.data).catch((d) => Promise.reject(d));
  }
}
export {
  qt as default
};
//# sourceMappingURL=wrapsplash.es.js.map
