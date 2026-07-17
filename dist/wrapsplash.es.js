import M from "axios";
var m = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function W(d) {
  return d && d.__esModule && Object.prototype.hasOwnProperty.call(d, "default") ? d.default : d;
}
function F(d) {
  if (d.__esModule) return d;
  var t = d.default;
  if (typeof t == "function") {
    var e = function r() {
      return this instanceof r ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    e.prototype = t.prototype;
  } else e = {};
  return Object.defineProperty(e, "__esModule", { value: !0 }), Object.keys(d).forEach(function(r) {
    var o = Object.getOwnPropertyDescriptor(d, r);
    Object.defineProperty(e, r, o.get ? o : {
      enumerable: !0,
      get: function() {
        return d[r];
      }
    });
  }), e;
}
var b = { exports: {} };
function j(d) {
  throw new Error('Could not dynamically require "' + d + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var w = { exports: {} };
const K = {}, z = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: K
}, Symbol.toStringTag, { value: "Module" })), V = /* @__PURE__ */ F(z);
var D;
function $() {
  return D || (D = 1, function(d, t) {
    (function(e, r) {
      d.exports = r();
    })(m, function() {
      var e = e || function(r, o) {
        var c;
        if (typeof window < "u" && window.crypto && (c = window.crypto), typeof self < "u" && self.crypto && (c = self.crypto), typeof globalThis < "u" && globalThis.crypto && (c = globalThis.crypto), !c && typeof window < "u" && window.msCrypto && (c = window.msCrypto), !c && typeof m < "u" && m.crypto && (c = m.crypto), !c && typeof j == "function")
          try {
            c = V;
          } catch {
          }
        var T = function() {
          if (c) {
            if (typeof c.getRandomValues == "function")
              try {
                return c.getRandomValues(new Uint32Array(1))[0];
              } catch {
              }
            if (typeof c.randomBytes == "function")
              try {
                return c.randomBytes(4).readInt32LE();
              } catch {
              }
          }
          throw new Error("Native crypto module could not be used to get secure random number.");
        }, u = Object.create || /* @__PURE__ */ function() {
          function s() {
          }
          return function(i) {
            var a;
            return s.prototype = i, a = new s(), s.prototype = null, a;
          };
        }(), S = {}, P = S.lib = {}, y = P.Base = /* @__PURE__ */ function() {
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
            extend: function(s) {
              var i = u(this);
              return s && i.mixIn(s), (!i.hasOwnProperty("init") || this.init === i.init) && (i.init = function() {
                i.$super.init.apply(this, arguments);
              }), i.init.prototype = i, i.$super = this, i;
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
              var s = this.extend();
              return s.init.apply(s, arguments), s;
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
            mixIn: function(s) {
              for (var i in s)
                s.hasOwnProperty(i) && (this[i] = s[i]);
              s.hasOwnProperty("toString") && (this.toString = s.toString);
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
        }(), C = P.WordArray = y.extend({
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
          init: function(s, i) {
            s = this.words = s || [], i != o ? this.sigBytes = i : this.sigBytes = s.length * 4;
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
          toString: function(s) {
            return (s || I).stringify(this);
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
          concat: function(s) {
            var i = this.words, a = s.words, l = this.sigBytes, O = s.sigBytes;
            if (this.clamp(), l % 4)
              for (var p = 0; p < O; p++) {
                var f = a[p >>> 2] >>> 24 - p % 4 * 8 & 255;
                i[l + p >>> 2] |= f << 24 - (l + p) % 4 * 8;
              }
            else
              for (var E = 0; E < O; E += 4)
                i[l + E >>> 2] = a[E >>> 2];
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
            var s = this.words, i = this.sigBytes;
            s[i >>> 2] &= 4294967295 << 32 - i % 4 * 8, s.length = r.ceil(i / 4);
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
            var s = y.clone.call(this);
            return s.words = this.words.slice(0), s;
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
          random: function(s) {
            for (var i = [], a = 0; a < s; a += 4)
              i.push(T());
            return new C.init(i, s);
          }
        }), R = S.enc = {}, I = R.Hex = {
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
          stringify: function(s) {
            for (var i = s.words, a = s.sigBytes, l = [], O = 0; O < a; O++) {
              var p = i[O >>> 2] >>> 24 - O % 4 * 8 & 255;
              l.push((p >>> 4).toString(16)), l.push((p & 15).toString(16));
            }
            return l.join("");
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
          parse: function(s) {
            for (var i = s.length, a = [], l = 0; l < i; l += 2)
              a[l >>> 3] |= parseInt(s.substr(l, 2), 16) << 24 - l % 8 * 4;
            return new C.init(a, i / 2);
          }
        }, A = R.Latin1 = {
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
          stringify: function(s) {
            for (var i = s.words, a = s.sigBytes, l = [], O = 0; O < a; O++) {
              var p = i[O >>> 2] >>> 24 - O % 4 * 8 & 255;
              l.push(String.fromCharCode(p));
            }
            return l.join("");
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
          parse: function(s) {
            for (var i = s.length, a = [], l = 0; l < i; l++)
              a[l >>> 2] |= (s.charCodeAt(l) & 255) << 24 - l % 4 * 8;
            return new C.init(a, i);
          }
        }, h = R.Utf8 = {
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
          stringify: function(s) {
            try {
              return decodeURIComponent(escape(A.stringify(s)));
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
          parse: function(s) {
            return A.parse(unescape(encodeURIComponent(s)));
          }
        }, _ = P.BufferedBlockAlgorithm = y.extend({
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
          _append: function(s) {
            typeof s == "string" && (s = h.parse(s)), this._data.concat(s), this._nDataBytes += s.sigBytes;
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
          _process: function(s) {
            var i, a = this._data, l = a.words, O = a.sigBytes, p = this.blockSize, f = p * 4, E = O / f;
            s ? E = r.ceil(E) : E = r.max((E | 0) - this._minBufferSize, 0);
            var U = E * p, g = r.min(U * 4, O);
            if (U) {
              for (var N = 0; N < U; N += p)
                this._doProcessBlock(l, N);
              i = l.splice(0, U), a.sigBytes -= g;
            }
            return new C.init(i, g);
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
            var s = y.clone.call(this);
            return s._data = this._data.clone(), s;
          },
          _minBufferSize: 0
        });
        P.Hasher = _.extend({
          /**
           * Configuration options.
           */
          cfg: y.extend(),
          /**
           * Initializes a newly created hasher.
           *
           * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
           *
           * @example
           *
           *     var hasher = CryptoJS.algo.SHA256.create();
           */
          init: function(s) {
            this.cfg = this.cfg.extend(s), this.reset();
          },
          /**
           * Resets this hasher to its initial state.
           *
           * @example
           *
           *     hasher.reset();
           */
          reset: function() {
            _.reset.call(this), this._doReset();
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
          update: function(s) {
            return this._append(s), this._process(), this;
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
          finalize: function(s) {
            s && this._append(s);
            var i = this._doFinalize();
            return i;
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
          _createHelper: function(s) {
            return function(i, a) {
              return new s.init(a).finalize(i);
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
          _createHmacHelper: function(s) {
            return function(i, a) {
              return new L.HMAC.init(s, a).finalize(i);
            };
          }
        });
        var L = S.algo = {};
        return S;
      }(Math);
      return e;
    });
  }(w)), w.exports;
}
(function(d, t) {
  (function(e, r) {
    d.exports = r($());
  })(m, function(e) {
    return function(r) {
      var o = e, c = o.lib, T = c.WordArray, u = c.Hasher, S = o.algo, P = [], y = [];
      (function() {
        function I(L) {
          for (var s = r.sqrt(L), i = 2; i <= s; i++)
            if (!(L % i))
              return !1;
          return !0;
        }
        function A(L) {
          return (L - (L | 0)) * 4294967296 | 0;
        }
        for (var h = 2, _ = 0; _ < 64; )
          I(h) && (_ < 8 && (P[_] = A(r.pow(h, 1 / 2))), y[_] = A(r.pow(h, 1 / 3)), _++), h++;
      })();
      var C = [], R = S.SHA256 = u.extend({
        _doReset: function() {
          this._hash = new T.init(P.slice(0));
        },
        _doProcessBlock: function(I, A) {
          for (var h = this._hash.words, _ = h[0], L = h[1], s = h[2], i = h[3], a = h[4], l = h[5], O = h[6], p = h[7], f = 0; f < 64; f++) {
            if (f < 16)
              C[f] = I[A + f] | 0;
            else {
              var E = C[f - 15], U = (E << 25 | E >>> 7) ^ (E << 14 | E >>> 18) ^ E >>> 3, g = C[f - 2], N = (g << 15 | g >>> 17) ^ (g << 13 | g >>> 19) ^ g >>> 10;
              C[f] = U + C[f - 7] + N + C[f - 16];
            }
            var q = a & l ^ ~a & O, G = _ & L ^ _ & s ^ L & s, B = (_ << 30 | _ >>> 2) ^ (_ << 19 | _ >>> 13) ^ (_ << 10 | _ >>> 22), k = (a << 26 | a >>> 6) ^ (a << 21 | a >>> 11) ^ (a << 7 | a >>> 25), H = p + k + q + y[f] + C[f], x = B + G;
            p = O, O = l, l = a, a = i + H | 0, i = s, s = L, L = _, _ = H + x | 0;
          }
          h[0] = h[0] + _ | 0, h[1] = h[1] + L | 0, h[2] = h[2] + s | 0, h[3] = h[3] + i | 0, h[4] = h[4] + a | 0, h[5] = h[5] + l | 0, h[6] = h[6] + O | 0, h[7] = h[7] + p | 0;
        },
        _doFinalize: function() {
          var I = this._data, A = I.words, h = this._nDataBytes * 8, _ = I.sigBytes * 8;
          return A[_ >>> 5] |= 128 << 24 - _ % 32, A[(_ + 64 >>> 9 << 4) + 14] = r.floor(h / 4294967296), A[(_ + 64 >>> 9 << 4) + 15] = h, I.sigBytes = A.length * 4, this._process(), this._hash;
        },
        clone: function() {
          var I = u.clone.call(this);
          return I._hash = this._hash.clone(), I;
        }
      });
      o.SHA256 = u._createHelper(R), o.HmacSHA256 = u._createHmacHelper(R);
    }(Math), e.SHA256;
  });
})(b);
var X = b.exports;
const Q = /* @__PURE__ */ W(X), J = {
  url: "",
  method: "",
  baseURL: "",
  headers: {},
  data: {},
  timeout: 1e3,
  withCredentials: !1,
  responseType: "json",
  responseEncoding: "utf8",
  validateStatus: function(d) {
    return d >= 200 && d < 300;
  },
  maxRedirects: 5,
  socketPath: null
};
class Y {
  constructor(t) {
    this.http = M.create(t || J), this.retries = (t == null ? void 0 : t.retries) ?? 2, this.retryDelayMs = (t == null ? void 0 : t.retryDelayMs) ?? 100;
  }
  async sleep(t) {
    await new Promise((e) => setTimeout(e, t));
  }
  async makeRequest(t, e, r, o) {
    if (!t)
      throw new Error("URL required");
    let c;
    for (let T = 0; T <= this.retries; T += 1)
      try {
        return await this.http({
          method: e || "get",
          url: t,
          params: r,
          data: o
        });
      } catch (u) {
        if (c = u, T >= this.retries)
          throw u;
        this.retryDelayMs > 0 && await this.sleep(this.retryDelayMs);
      }
    throw c;
  }
}
const Z = "https://api.unsplash.com/", tt = "https://unsplash.com/oauth/token", et = "users/", rt = "users/:username/portfolio", st = "users/:username/photos", it = "users/:username/likes", ot = "users/:username/collections", at = "users/:username/statistics", nt = "photos", ht = "photos/curated", ct = "photos/:id", lt = "photos/random", ut = "photos/:id/statistics", _t = "photos/:id/download", dt = "photos/:id", Ot = "photos/:id/like", Tt = "photos/:id/like", pt = "search/photos", ft = "search/collections", Et = "search/users", Ct = "me", Lt = "me", St = "stats/total", It = "stats/month", At = "collections", vt = "collections/featured", yt = "collections/curated", gt = "collections/:id", Pt = "collections/curated/:id", Rt = "collections/:id/photos", Ut = "collections/curated/:id/photos", Nt = "collections/:id/related", mt = "collections", wt = "collections/:id", Ht = "collections/:id", Dt = "collections/:collection_id/add", bt = "collections/:collection_id/remove", n = {
  API_LOCATION: Z,
  BEARER_TOKEN_URL: tt,
  USERS_PUBLIC_PROFILE: et,
  USERS_PORTFOLIO: rt,
  USERS_PHOTOS: st,
  USERS_LIKED_PHOTOS: it,
  USERS_COLLECTIONS: ot,
  USERS_STATISTICS: at,
  LIST_PHOTOS: nt,
  LIST_CURATED_PHOTOS: ht,
  GET_A_PHOTO: ct,
  GET_A_RANDOM_PHOTO: lt,
  GET_A_PHOTO_STATISTICS: ut,
  GET_A_PHOTO_DOWNLOAD_LINK: _t,
  UPDATE_A_PHOTO: dt,
  LIKE_A_PHOTO: Ot,
  UNLIKE_A_PHOTO: Tt,
  SEARCH_PHOTOS: pt,
  SEARCH_COLLECTIONS: ft,
  SEARCH_USERS: Et,
  CURRENT_USER_PROFILE: Ct,
  UPDATE_CURRENT_USER_PROFILE: Lt,
  STATS_TOTALS: St,
  STATS_MONTH: It,
  LIST_COLLECTIONS: At,
  LIST_FEATURED_COLLECTIONS: vt,
  LIST_CURATED_COLLECTIONS: yt,
  GET_COLLECTION: gt,
  GET_CURATED_COLLECTION: Pt,
  GET_COLLECTION_PHOTOS: Rt,
  GET_CURATED_COLLECTION_PHOTOS: Ut,
  LIST_RELATED_COLLECTION: Nt,
  CREATE_NEW_COLLECTION: mt,
  UPDATE_EXISTING_COLLECTION: wt,
  DELETE_COLLECTION: Ht,
  ADD_PHOTO_TO_COLLECTION: Dt,
  REMOVE_PHOTO_FROM_COLLECTION: bt
};
class v extends Error {
  constructor(t, e = {}) {
    super(t), this.name = "WrapSplashError", this.cause = e.cause, this.statusCode = e.statusCode, this.statusText = e.statusText, Object.setPrototypeOf(this, new.target.prototype);
  }
}
class Gt {
  constructor() {
    this.API_LOCATION = n.API_LOCATION, this.BEARER_TOKEN_URL = n.BEARER_TOKEN_URL, this.options = {}, this.access_key = "", this.secret_key = "", this.redirect_uri = "", this.code = "", this.grant_type = "authorization_code", this.bearer_token = "", this.timeout = 1e4, this.retries = 2, this.retryDelayMs = 100, this.headers = {
      "Content-type": "application/json",
      "X-Requested-With": "WrapSplash"
    }, this.availableOrders = ["latest", "oldest", "popular"], this.availableOrientations = ["landscape", "portrait", "squarish"], this.init = (t = {}) => {
      if (!t || typeof t != "object" || Array.isArray(t))
        throw new v("Initialisation parameters required!");
      if (this.options = { ...t }, this.timeout = typeof this.options.timeout == "number" && this.options.timeout > 0 ? this.options.timeout : 1e4, this.retries = typeof this.options.retries == "number" && this.options.retries >= 0 ? this.options.retries : 2, this.retryDelayMs = typeof this.options.retryDelayMs == "number" && this.options.retryDelayMs >= 0 ? this.options.retryDelayMs : 100, this.bearer_token = this.options.bearer_token ?? "", this.headers = {
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
        throw new v("Access Key missing!");
      })(), this.secret_key = this.options.secret_key ? this.options.secret_key : (() => {
        throw new v("Secret Key missing!");
      })(), this.redirect_uri = this.options.redirect_uri ? this.options.redirect_uri : (() => {
        throw new v("Redirect URI missing!");
      })(), this.code = this.options.code ? this.options.code : (() => {
        throw new v("Authorization Code missing!");
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
    })), this.getCurrentUserProfile = () => this.fetchUrl(this.API_LOCATION + n.CURRENT_USER_PROFILE, "GET"), this.updateCurrentUserProfile = (t, e, r, o, c, T, u, S) => this.fetchUrl(this.API_LOCATION + n.UPDATE_CURRENT_USER_PROFILE, "PUT", {
      username: t,
      first_name: e,
      last_name: r,
      email: o,
      url: c,
      location: T,
      bio: u,
      instagram_username: S
    }), this.getPublicProfile = (t, e, r) => (this.validateRequired(t, "username"), this.fetchUrl(this.API_LOCATION + n.USERS_PUBLIC_PROFILE + t, "GET", {
      w: e,
      h: r
    })), this.getUserPortfolio = (t) => (this.validateRequired(t, "username"), this.fetchUrl(
      this.API_LOCATION + n.USERS_PORTFOLIO.replace(/:username/gi, t),
      "GET"
    )), this.getUserPhotos = (t, e, r, o, c, T, u) => {
      if (this.validateRequired(t, "username"), this.validateSupportedValue(u, this.availableOrders, "order_by"), o !== void 0 && typeof o != "boolean")
        throw new Error("Parameter : stats is a boolean or optional!");
      return this.fetchUrl(
        this.API_LOCATION + n.USERS_PHOTOS.replace(/:username/gi, t),
        "GET",
        {
          page: e ?? 1,
          per_page: r ?? 10,
          order_by: u ?? "latest",
          stats: o ?? !1,
          resolution: c ?? "days",
          quantity: T ?? 30
        }
      );
    }, this.getUserLikedPhotos = (t, e, r, o) => (this.validateRequired(t, "username"), this.validateSupportedValue(o, this.availableOrders, "order_by"), this.fetchUrl(
      this.API_LOCATION + n.USERS_LIKED_PHOTOS.replace(/:username/gi, t),
      "GET",
      {
        page: e ?? 1,
        per_page: r ?? 10,
        order_by: o ?? "latest"
      }
    )), this.getUserCollections = (t, e, r) => (this.validateRequired(t, "username"), this.fetchUrl(
      this.API_LOCATION + n.USERS_COLLECTIONS.replace(/:username/gi, t),
      "GET",
      {
        page: e ?? 1,
        per_page: r ?? 10
      }
    )), this.getUserStatistics = (t, e, r) => (this.validateRequired(t, "username"), this.fetchUrl(
      this.API_LOCATION + n.USERS_STATISTICS.replace(/:username/gi, t),
      "GET",
      {
        resolution: e ?? "days",
        quantity: r ?? 30
      }
    )), this.listPhotos = (t, e, r) => {
      if (r !== void 0 && !this.availableOrders.includes(r))
        throw new Error("Parameter : order_by has an unsupported value!");
      return this.fetchUrl(this.API_LOCATION + n.LIST_PHOTOS, "GET", {
        page: t ?? 1,
        per_page: e ?? 10,
        order_by: r ?? "latest"
      });
    }, this.listCuratedPhotos = (t, e, r) => {
      if (r !== void 0 && !this.availableOrders.includes(r))
        throw new Error("Parameter : order_by has an unsupported value!");
      return this.fetchUrl(this.API_LOCATION + n.LIST_CURATED_PHOTOS, "GET", {
        page: t ?? 1,
        per_page: e ?? 10,
        order_by: r ?? "latest"
      });
    }, this.getAPhoto = (t, e, r, o) => (this.validateRequired(t, "id"), this.fetchUrl(this.API_LOCATION + n.GET_A_PHOTO.replace(/:id/gi, t), "GET", {
      w: e,
      h: r,
      rect: typeof o == "string" ? o : void 0
    })), this.getARandomPhoto = (t, e, r, o, c, T, u, S) => (this.validateSupportedValue(u, this.availableOrientations, "orientation"), this.fetchUrl(this.API_LOCATION + n.GET_A_RANDOM_PHOTO, "GET", {
      collections: t !== void 0 ? String(t) : void 0,
      featured: e ?? !1,
      username: r,
      query: o,
      width: c,
      height: T,
      orientation: u ?? "landscape",
      count: S ?? 1
    })), this.getPhotoStatistics = (t, e, r) => (this.validateRequired(t, "id"), this.fetchUrl(this.API_LOCATION + n.GET_A_PHOTO_STATISTICS.replace(/:id/gi, t), "GET", {
      resolution: e ?? "days",
      quantity: r ?? 30
    })), this.getPhotoLink = (t) => (this.validateRequired(t, "id"), this.fetchUrl(this.API_LOCATION + n.GET_A_PHOTO_DOWNLOAD_LINK.replace(/:id/gi, t), "GET")), this.updatePhoto = (t, e = {}, r = {}) => (this.validateRequired(t, "id"), this.fetchUrl(this.API_LOCATION + n.UPDATE_A_PHOTO.replace(/:id/gi, t), "PUT", {
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
    })), this.likePhoto = (t) => (this.validateRequired(t, "id"), this.fetchUrl(this.API_LOCATION + n.LIKE_A_PHOTO.replace(/:id/gi, t), "POST")), this.unlikePhoto = (t) => (this.validateRequired(t, "id"), this.fetchUrl(this.API_LOCATION + n.UNLIKE_A_PHOTO.replace(/:id/gi, t), "DELETE")), this.search = (t, e, r, o, c) => (this.validateRequired(t, "query"), this.validateSupportedValue(c, this.availableOrientations, "orientation"), this.fetchUrl(this.API_LOCATION + n.SEARCH_PHOTOS, "GET", {
      query: t,
      page: e ?? 1,
      per_page: r ?? 10,
      collections: o !== void 0 ? String(o) : void 0,
      orientation: c
    })), this.searchCollections = (t, e, r) => (this.validateRequired(t, "query"), this.fetchUrl(this.API_LOCATION + n.SEARCH_COLLECTIONS, "GET", {
      query: t,
      page: e ?? 1,
      per_page: r ?? 10
    })), this.searchUsers = (t, e, r) => (this.validateRequired(t, "query"), this.fetchUrl(this.API_LOCATION + n.SEARCH_USERS, "GET", {
      query: t,
      page: e ?? 1,
      per_page: r ?? 10
    })), this.getStatsTotals = () => this.fetchUrl(this.API_LOCATION + n.STATS_TOTALS, "GET"), this.getStatsMonth = () => this.fetchUrl(this.API_LOCATION + n.STATS_MONTH, "GET"), this.listCollections = (t, e) => this.fetchUrl(this.API_LOCATION + n.LIST_COLLECTIONS, "GET", {
      page: t ?? 1,
      per_page: e ?? 10
    }), this.listFeaturedCollections = (t, e) => this.fetchUrl(this.API_LOCATION + n.LIST_FEATURED_COLLECTIONS, "GET", {
      page: t ?? 1,
      per_page: e ?? 10
    }), this.listCuratedCollections = (t, e) => this.fetchUrl(this.API_LOCATION + n.LIST_CURATED_COLLECTIONS, "GET", {
      page: t ?? 1,
      per_page: e ?? 10
    }), this.getCollection = (t) => (this.validateRequired(t, "id"), this.fetchUrl(this.API_LOCATION + n.GET_COLLECTION.replace(/:id/gi, t), "GET")), this.getCuratedCollection = (t) => (this.validateRequired(t, "id"), this.fetchUrl(this.API_LOCATION + n.GET_CURATED_COLLECTION.replace(/:id/gi, t), "GET")), this.getCollectionPhotos = (t, e, r) => (this.validateRequired(t, "id"), this.fetchUrl(this.API_LOCATION + n.GET_COLLECTION_PHOTOS.replace(/:id/gi, t), "GET", {
      page: e ?? 1,
      per_page: r ?? 10
    })), this.getCuratedCollectionPhotos = (t, e, r) => (this.validateRequired(t, "id"), this.fetchUrl(this.API_LOCATION + n.GET_CURATED_COLLECTION_PHOTOS.replace(/:id/gi, t), "GET", {
      page: e ?? 1,
      per_page: r ?? 10
    })), this.listRelatedCollections = (t) => (this.validateRequired(t, "id"), this.fetchUrl(this.API_LOCATION + n.LIST_RELATED_COLLECTION.replace(/:id/gi, t), "GET")), this.getPhoto = (t, e, r, o) => this.getAPhoto(t, e, r, o), this.getRandomPhoto = (t, e, r, o, c, T, u, S) => this.getARandomPhoto(t, e, r, o, c, T, u, S), this.createNewCollection = (t, e, r = !1) => (this.validateRequired(t, "title"), this.fetchUrl(this.API_LOCATION + n.CREATE_NEW_COLLECTION, "POST", {
      title: t,
      description: e,
      private: r
    })), this.createCollection = (t, e, r = !1) => this.createNewCollection(t, e, r), this.createNewColection = (t, e, r = !1) => this.createNewCollection(t, e, r), this.updateExistingCollection = (t, e, r, o = !1) => (this.validateRequired(t, "id"), this.validateRequired(e, "title"), this.fetchUrl(this.API_LOCATION + n.UPDATE_EXISTING_COLLECTION.replace(/:id/gi, t), "PUT", {
      title: e,
      description: r,
      private: o
    })), this.updateCollection = (t, e, r, o = !1) => this.updateExistingCollection(t, e, r, o), this.deleteCollection = (t) => (this.validateRequired(t, "id"), this.fetchUrl(this.API_LOCATION + n.DELETE_COLLECTION.replace(/:id/gi, t), "DELETE")), this.addPhotoToCollection = (t, e) => (this.validateRequired(t, "collection_id"), this.validateRequired(e, "photo_id"), this.fetchUrl(this.API_LOCATION + n.ADD_PHOTO_TO_COLLECTION.replace(/:collection_id/gi, t), "POST", {
      photo_id: e
    })), this.removePhotoFromCollection = (t, e) => (this.validateRequired(t, "collection_id"), this.validateRequired(e, "photo_id"), this.fetchUrl(this.API_LOCATION + n.REMOVE_PHOTO_FROM_COLLECTION.replace(/:collection_id/gi, t), "DELETE", {
      photo_id: e
    }));
  }
  computeHash(t) {
    return Q(t).toString();
  }
  validateRequired(t, e) {
    if (t == null || t === "") {
      const r = e === "id" ? "Parameter : id is required!" : e === "query" ? "Parameter : query is missing!" : `Parameter : ${e} is required and cannot be empty!`;
      throw new v(r);
    }
  }
  validateSupportedValue(t, e, r) {
    if (t !== void 0 && !e.includes(t))
      throw new v(`Parameter : ${r} has an unsupported value!`);
  }
  buildQueryParameters(t) {
    const e = {};
    return Object.entries(t).forEach(([r, o]) => {
      o != null && o !== "" && (e[r] = o);
    }), e;
  }
  getErrorMessage(t) {
    return t instanceof Error ? t.message : typeof t == "string" ? t : "Request failed";
  }
  createWrapSplashError(t) {
    if (t instanceof v)
      return t;
    const e = typeof t == "object" && t !== null && "response" in t && t.response && typeof t.response == "object" && "status" in t.response ? t.response.status : void 0, r = typeof t == "object" && t !== null && "response" in t && t.response && typeof t.response == "object" && "statusText" in t.response ? t.response.statusText : void 0;
    return new v(this.getErrorMessage(t), {
      cause: t,
      statusCode: e,
      statusText: r
    });
  }
  fetchUrl(t, e, r = {}, o = void 0) {
    return new Y({
      headers: this.headers,
      timeout: this.timeout,
      retries: this.retries,
      retryDelayMs: this.retryDelayMs
    }).makeRequest(t, e.toLowerCase(), this.buildQueryParameters(r), o).then((T) => {
      const u = T;
      return u.status === 204 ? {
        status: u.status,
        statusText: u.statusText,
        message: "Content Deleted"
      } : u.status === 403 ? {
        status: u.status,
        statusText: u.statusText,
        message: "Rate Limit Exceeded"
      } : u.data;
    }).catch((T) => Promise.reject(this.createWrapSplashError(T)));
  }
}
export {
  v as WrapSplashError,
  Gt as default
};
//# sourceMappingURL=wrapsplash.es.js.map
