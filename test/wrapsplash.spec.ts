import { beforeEach, describe, expect, test, vi } from "vitest";

const bearerToken = "test-bearer-token";
let capturedAxiosOptions: any = null;
const makeRequestMock = vi.fn(async (url: string, method: string, queryParameters: any, body: any) => {
  return {
    status: 200,
    statusText: "OK",
    data: {
      url,
      method,
      queryParameters,
      body,
    },
  };
});

vi.mock("../lib/axiosAjaxLib", () => {
  return {
    default: class {
      constructor(options: any) {
        capturedAxiosOptions = options;
      }

      makeRequest = makeRequestMock;
    },
  };
});

import WrapsplashLib, { WrapSplashError } from "../src/index";

let wrapsplash: InstanceType<typeof WrapsplashLib>;

beforeEach(() => {
  vi.clearAllMocks();
  capturedAxiosOptions = null;
  wrapsplash = new WrapsplashLib();
  wrapsplash.init({ bearer_token: bearerToken });
});

describe("Wrapsplash API wrapper", () => {
  test("initializes with bearer token and sets authorization headers", async () => {
    await wrapsplash.getCurrentUserProfile();

    expect(capturedAxiosOptions).toEqual({
      headers: expect.objectContaining({
        Authorization: `Bearer ${bearerToken}`,
        "X-WrapSplash-Header": expect.any(String),
      }),
      timeout: 10000,
      retries: 2,
      retryDelayMs: 100,
    });
  });

  test("throws a WrapSplashError for missing initialization values", () => {
    const invalidClient = new WrapsplashLib();

    expect(() => invalidClient.init({ access_key: "abc", secret_key: "def" } as any)).toThrow(WrapSplashError);
    expect(() => invalidClient.init({ access_key: "abc", secret_key: "def" } as any)).toThrow("Redirect URI missing!");
  });

  test("wraps request failures in a WrapSplashError", async () => {
    makeRequestMock.mockRejectedValueOnce(new Error("boom"));

    await expect(wrapsplash.getCurrentUserProfile()).rejects.toBeInstanceOf(WrapSplashError);
  });

  test("getCurrentUserProfile requests the me endpoint", async () => {
    const response = await wrapsplash.getCurrentUserProfile();

    expect(makeRequestMock).toHaveBeenCalledWith(
      "https://api.unsplash.com/me",
      "get",
      {},
      undefined
    );
    expect(response).toEqual({
      url: "https://api.unsplash.com/me",
      method: "get",
      queryParameters: {},
      body: undefined,
    });
  });

  test("getPhoto aliases the photo lookup endpoint", async () => {
    const response = await wrapsplash.getPhoto("g3PyXO4A0yc", 120, 180, "0,0,100,200");

    expect(makeRequestMock).toHaveBeenCalledWith(
      "https://api.unsplash.com/photos/g3PyXO4A0yc",
      "get",
      { w: 120, h: 180, rect: "0,0,100,200" },
      undefined
    );
    expect(response.queryParameters.rect).toBe("0,0,100,200");
  });

  test("getRandomPhoto aliases the random photo endpoint", async () => {
    const response = await wrapsplash.getRandomPhoto("123", true, "sandeepv", "nature", 400, 300, "portrait", 2);

    expect(makeRequestMock).toHaveBeenCalledWith(
      "https://api.unsplash.com/photos/random",
      "get",
      {
        collections: "123",
        featured: true,
        username: "sandeepv",
        query: "nature",
        width: 400,
        height: 300,
        orientation: "portrait",
        count: 2,
      },
      undefined
    );
    expect(response.queryParameters.orientation).toBe("portrait");
  });

  test("createCollection sends the correct collection payload", async () => {
    const response = await wrapsplash.createCollection("Test collection", "A test collection", true);

    expect(makeRequestMock).toHaveBeenCalledWith(
      "https://api.unsplash.com/collections",
      "post",
      {
        title: "Test collection",
        description: "A test collection",
        private: true,
      },
      undefined
    );
    expect(response.queryParameters.private).toBe(true);
  });

  test("createNewCollection sends the correct collection payload", async () => {
    const response = await wrapsplash.createNewCollection("My Collection", "desc", true);

    expect(makeRequestMock).toHaveBeenCalledWith(
      "https://api.unsplash.com/collections",
      "post",
      { title: "My Collection", description: "desc", private: true },
      undefined
    );
    expect(response.queryParameters.private).toBe(true);
  });

  test("updateCurrentUserProfile sends the correct PUT payload", async () => {
    const payload = {
      username: "mock-user",
      first_name: "Mock",
      last_name: "User",
      email: "mock@example.com",
      url: "https://example.com",
      location: "Earth",
      bio: "Testing",
      instagram_username: "mock_insta",
    };

    const response = await wrapsplash.updateCurrentUserProfile(
      payload.username,
      payload.first_name,
      payload.last_name,
      payload.email,
      payload.url,
      payload.location,
      payload.bio,
      payload.instagram_username
    );

    expect(makeRequestMock).toHaveBeenCalledWith(
      "https://api.unsplash.com/me",
      "put",
      payload,
      undefined
    );
    expect(response.queryParameters).toEqual(payload);
  });

  test("getPublicProfile uses username and width/height query parameters", async () => {
    const response = await wrapsplash.getPublicProfile("sandeepv", 200, 300);

    expect(makeRequestMock).toHaveBeenCalledWith(
      "https://api.unsplash.com/users/sandeepv",
      "get",
      { w: 200, h: 300 },
      undefined
    );
    expect(response.queryParameters).toEqual({ w: 200, h: 300 });
  });

  test("getUserPortfolio requests the correct portfolio endpoint", async () => {
    const response = await wrapsplash.getUserPortfolio("sandeepv");

    expect(makeRequestMock).toHaveBeenCalledWith(
      "https://api.unsplash.com/users/sandeepv/portfolio",
      "get",
      {},
      undefined
    );
    expect(response.url).toContain("portfolio");
  });

  test("getUserPhotos sends default pagination and stats parameters", async () => {
    const response = await wrapsplash.getUserPhotos("sandeepv");

    expect(makeRequestMock).toHaveBeenCalledWith(
      "https://api.unsplash.com/users/sandeepv/photos",
      "get",
      {
        page: 1,
        per_page: 10,
        order_by: "latest",
        stats: false,
        resolution: "days",
        quantity: 30,
      },
      undefined
    );
    expect(response.queryParameters.page).toBe(1);
  });

  test("getUserLikedPhotos supports custom order_by values", async () => {
    const response = await wrapsplash.getUserLikedPhotos("sandeepv", 2, 5, "popular");

    expect(makeRequestMock).toHaveBeenCalledWith(
      "https://api.unsplash.com/users/sandeepv/likes",
      "get",
      {
        page: 2,
        per_page: 5,
        order_by: "popular",
      },
      undefined
    );
    expect(response.queryParameters.order_by).toBe("popular");
  });

  test("getUserCollections uses default page and per_page values", async () => {
    const response = await wrapsplash.getUserCollections("sandeepv");

    expect(makeRequestMock).toHaveBeenCalledWith(
      "https://api.unsplash.com/users/sandeepv/collections",
      "get",
      { page: 1, per_page: 10 },
      undefined
    );
    expect(response.queryParameters).toEqual({ page: 1, per_page: 10 });
  });

  test("getUserStatistics sends default resolution and quantity", async () => {
    const response = await wrapsplash.getUserStatistics("sandeepv");

    expect(makeRequestMock).toHaveBeenCalledWith(
      "https://api.unsplash.com/users/sandeepv/statistics",
      "get",
      { resolution: "days", quantity: 30 },
      undefined
    );
    expect(response.queryParameters.resolution).toBe("days");
  });

  test("getAPhoto builds width, height, and rect query parameters", async () => {
    const response = await wrapsplash.getAPhoto("g3PyXO4A0yc", 100, 200, "0,0,100,200");

    expect(makeRequestMock).toHaveBeenCalledWith(
      "https://api.unsplash.com/photos/g3PyXO4A0yc",
      "get",
      { w: 100, h: 200, rect: "0,0,100,200" },
      undefined
    );
    expect(response.queryParameters.rect).toBe("0,0,100,200");
  });

  test("getARandomPhoto includes collection, featured, orientation, and count parameters", async () => {
    const response = await wrapsplash.getARandomPhoto("123", true, "sandeepv", "nature", 400, 300, "portrait", 2);

    expect(makeRequestMock).toHaveBeenCalledWith(
      "https://api.unsplash.com/photos/random",
      "get",
      {
        collections: "123",
        featured: true,
        username: "sandeepv",
        query: "nature",
        width: 400,
        height: 300,
        orientation: "portrait",
        count: 2,
      },
      undefined
    );
    expect(response.queryParameters.orientation).toBe("portrait");
  });

  test("getPhotoStatistics sends the correct photo-specific request", async () => {
    const response = await wrapsplash.getPhotoStatistics("g3PyXO4A0yc", "weeks", 10);

    expect(makeRequestMock).toHaveBeenCalledWith(
      "https://api.unsplash.com/photos/g3PyXO4A0yc/statistics",
      "get",
      { resolution: "weeks", quantity: 10 },
      undefined
    );
    expect(response.queryParameters.quantity).toBe(10);
  });

  test("getPhotoLink requests the download link endpoint", async () => {
    const response = await wrapsplash.getPhotoLink("g3PyXO4A0yc");

    expect(makeRequestMock).toHaveBeenCalledWith(
      "https://api.unsplash.com/photos/g3PyXO4A0yc/download",
      "get",
      {},
      undefined
    );
    expect(response.url).toContain("/download");
  });

  test("updatePhoto sends location and exif query parameters", async () => {
    const location = { latitude: 10.1, longitude: 20.2, name: "Test" };
    const exif = { make: "Canon", model: "EOS", iso_speed_ratings: 100 };

    const response = await wrapsplash.updatePhoto("g3PyXO4A0yc", location, exif);

    expect(makeRequestMock).toHaveBeenCalledWith(
      "https://api.unsplash.com/photos/g3PyXO4A0yc",
      "put",
      {
        "location[latitude]": 10.1,
        "location[longitude]": 20.2,
        "location[name]": "Test",
        "exif[make]": "Canon",
        "exif[model]": "EOS",
        "exif[iso_speed_ratings]": 100,
      },
      undefined
    );
    expect(response.queryParameters["location[name]"]).toBe("Test");
  });

  test("likePhoto and unlikePhoto request the correct endpoints", async () => {
    await wrapsplash.likePhoto("g3PyXO4A0yc");
    expect(makeRequestMock).toHaveBeenCalledWith(
      "https://api.unsplash.com/photos/g3PyXO4A0yc/like",
      "post",
      {},
      undefined
    );

    await wrapsplash.unlikePhoto("g3PyXO4A0yc");
    expect(makeRequestMock).toHaveBeenCalledWith(
      "https://api.unsplash.com/photos/g3PyXO4A0yc/like",
      "delete",
      {},
      undefined
    );
  });

  test("search and searchCollections and searchUsers send the right queries", async () => {
    const photoResponse = await wrapsplash.search("ocean", 2, 15, "123", "landscape");
    expect(makeRequestMock).toHaveBeenCalledWith(
      "https://api.unsplash.com/search/photos",
      "get",
      {
        query: "ocean",
        page: 2,
        per_page: 15,
        collections: "123",
        orientation: "landscape",
      },
      undefined
    );
    expect(photoResponse.queryParameters.query).toBe("ocean");

    const collectionResponse = await wrapsplash.searchCollections("travel", 3, 20);
    expect(makeRequestMock).toHaveBeenCalledWith(
      "https://api.unsplash.com/search/collections",
      "get",
      { query: "travel", page: 3, per_page: 20 },
      undefined
    );
    expect(collectionResponse.queryParameters.page).toBe(3);

    const userResponse = await wrapsplash.searchUsers("john", 4, 5);
    expect(makeRequestMock).toHaveBeenCalledWith(
      "https://api.unsplash.com/search/users",
      "get",
      { query: "john", page: 4, per_page: 5 },
      undefined
    );
    expect(userResponse.queryParameters.per_page).toBe(5);
  });

  test("stats and collection endpoints send the expected routes", async () => {
    await wrapsplash.getStatsTotals();
    expect(makeRequestMock).toHaveBeenCalledWith(
      "https://api.unsplash.com/stats/total",
      "get",
      {},
      undefined
    );

    await wrapsplash.getStatsMonth();
    expect(makeRequestMock).toHaveBeenCalledWith(
      "https://api.unsplash.com/stats/month",
      "get",
      {},
      undefined
    );

    await wrapsplash.listCollections();
    expect(makeRequestMock).toHaveBeenCalledWith(
      "https://api.unsplash.com/collections",
      "get",
      { page: 1, per_page: 10 },
      undefined
    );

    await wrapsplash.listFeaturedCollections(2, 8);
    expect(makeRequestMock).toHaveBeenCalledWith(
      "https://api.unsplash.com/collections/featured",
      "get",
      { page: 2, per_page: 8 },
      undefined
    );

    await wrapsplash.listCuratedCollections(3, 9);
    expect(makeRequestMock).toHaveBeenCalledWith(
      "https://api.unsplash.com/collections/curated",
      "get",
      { page: 3, per_page: 9 },
      undefined
    );
  });

  test("collection detail endpoints use ids and pagination", async () => {
    await wrapsplash.getCollection("collection-id");
    expect(makeRequestMock).toHaveBeenCalledWith(
      "https://api.unsplash.com/collections/collection-id",
      "get",
      {},
      undefined
    );

    await wrapsplash.getCuratedCollection("curated-id");
    expect(makeRequestMock).toHaveBeenCalledWith(
      "https://api.unsplash.com/collections/curated/curated-id",
      "get",
      {},
      undefined
    );

    await wrapsplash.getCollectionPhotos("collection-id", 4, 12);
    expect(makeRequestMock).toHaveBeenCalledWith(
      "https://api.unsplash.com/collections/collection-id/photos",
      "get",
      { page: 4, per_page: 12 },
      undefined
    );

    await wrapsplash.getCuratedCollectionPhotos("curated-id", 5, 13);
    expect(makeRequestMock).toHaveBeenCalledWith(
      "https://api.unsplash.com/collections/curated/curated-id/photos",
      "get",
      { page: 5, per_page: 13 },
      undefined
    );

    await wrapsplash.listRelatedCollections("collection-id");
    expect(makeRequestMock).toHaveBeenCalledWith(
      "https://api.unsplash.com/collections/collection-id/related",
      "get",
      {},
      undefined
    );
  });

  test("collection CRUD and add/remove photo endpoints submit correct payloads", async () => {
    const createResponse = await wrapsplash.createNewColection("My Collection", "desc", true);
    expect(makeRequestMock).toHaveBeenCalledWith(
      "https://api.unsplash.com/collections",
      "post",
      { title: "My Collection", description: "desc", private: true },
      undefined
    );
    expect(createResponse.queryParameters.private).toBe(true);

    const updateResponse = await wrapsplash.updateExistingCollection("cid", "Title", "desc2", false);
    expect(makeRequestMock).toHaveBeenCalledWith(
      "https://api.unsplash.com/collections/cid",
      "put",
      { title: "Title", description: "desc2", private: false },
      undefined
    );
    expect(updateResponse.queryParameters.title).toBe("Title");

    await wrapsplash.deleteCollection("cid");
    expect(makeRequestMock).toHaveBeenCalledWith(
      "https://api.unsplash.com/collections/cid",
      "delete",
      {},
      undefined
    );

    await wrapsplash.addPhotoToCollection("cid", "pid");
    expect(makeRequestMock).toHaveBeenCalledWith(
      "https://api.unsplash.com/collections/cid/add",
      "post",
      { photo_id: "pid" },
      undefined
    );

    await wrapsplash.removePhotoFromCollection("cid", "pid");
    expect(makeRequestMock).toHaveBeenCalledWith(
      "https://api.unsplash.com/collections/cid/remove",
      "delete",
      { photo_id: "pid" },
      undefined
    );
  });

  test("generateBearerToken sends correct OAuth token request after init with access credentials", async () => {
    wrapsplash = new WrapsplashLib();
    wrapsplash.init({
      access_key: "access-key",
      secret_key: "secret-key",
      redirect_uri: "https://example.com/callback",
      code: "authorization-code",
    });

    const response = await wrapsplash.generateBearerToken();

    expect(makeRequestMock).toHaveBeenCalledWith(
      "https://unsplash.com/oauth/token",
      "post",
      {
        client_id: "access-key",
        client_secret: "secret-key",
        redirect_uri: "https://example.com/callback",
        code: "authorization-code",
        grant_type: "authorization_code",
      },
      undefined
    );
    expect(response.queryParameters.code).toBe("authorization-code");
  });

  describe("error handling", () => {
    test("getPublicProfile throws when username is empty", () => {
      expect(() => wrapsplash.getPublicProfile("" as any)).toThrow(
        "Parameter : username is required and cannot be empty!"
      );
    });

    test("getUserPhotos throws for unsupported order_by values", () => {
      expect(() => wrapsplash.getUserPhotos("sandeepv", 1, 10, false, "days", 30, "invalid_order"))
        .toThrow("Parameter : order_by has an unsupported value!");
    });

    test("getUserLikedPhotos throws for unsupported order_by values", () => {
      expect(() => wrapsplash.getUserLikedPhotos("sandeepv", 1, 10, "bad_order"))
        .toThrow("Parameter : order_by has an unsupported value!");
    });

    test("getAPhoto throws when id is missing", () => {
      expect(() => wrapsplash.getAPhoto("" as any)).toThrow("Parameter : id is required!");
    });

    test("getARandomPhoto throws for unsupported orientation values", () => {
      expect(() => wrapsplash.getARandomPhoto(undefined, false, undefined, undefined, undefined, undefined, "invalid_orientation"))
        .toThrow("Parameter : orientation has an unsupported value!");
    });

    test("search throws when query is missing", () => {
      expect(() => wrapsplash.search(undefined as any)).toThrow("Parameter : query is missing!");
    });
  });

  describe("WrapSplashError", () => {
    test("constructs with new options object signature", () => {
      const error = new WrapSplashError("test message", {
        statusCode: 418,
        statusText: "I'm a teapot",
        cause: new Error("original"),
      });

      expect(error).toBeInstanceOf(Error);
      expect(error.name).toBe("WrapSplashError");
      expect(error.message).toBe("test message");
      expect(error.statusCode).toBe(418);
      expect(error.statusText).toBe("I'm a teapot");
      expect(error.cause).toBeInstanceOf(Error);
    });

    test("constructs with legacy positional signature", () => {
      const cause = new Error("root cause");
      const error = new WrapSplashError("legacy", 500, "Server Error", cause);

      expect(error.statusCode).toBe(500);
      expect(error.statusText).toBe("Server Error");
      expect(error.cause).toBe(cause);
    });

    test("constructs with no options", () => {
      const error = new WrapSplashError("simple");
      expect(error.statusCode).toBeUndefined();
      expect(error.statusText).toBeUndefined();
      expect(error.cause).toBeUndefined();
    });

    test("constructs with null options", () => {
      const error = new WrapSplashError("with null", null as any);
      expect(error.statusCode).toBeUndefined();
    });

    test("preserves prototype chain for instanceof checks", () => {
      const error = new WrapSplashError("proto test");
      expect(error instanceof WrapSplashError).toBe(true);
      expect(error instanceof Error).toBe(true);
    });
  });

  describe("init validation", () => {
    test("throws for non-object init parameter", () => {
      const client = new WrapsplashLib();
      expect(() => client.init(null as any)).toThrow("Initialisation parameters required!");
      expect(() => client.init("string" as any)).toThrow("Initialisation parameters required!");
      expect(() => client.init(42 as any)).toThrow("Initialisation parameters required!");
    });

    test("throws for array init parameter", () => {
      const client = new WrapsplashLib();
      expect(() => client.init([] as any)).toThrow("Initialisation parameters required!");
    });

    test("throws when access_key is missing in credential mode", () => {
      const client = new WrapsplashLib();
      expect(() =>
        client.init({ secret_key: "sk", redirect_uri: "r", code: "c" } as any)
      ).toThrow("Access Key missing!");
    });

    test("throws when secret_key is missing in credential mode", () => {
      const client = new WrapsplashLib();
      expect(() =>
        client.init({ access_key: "ak", redirect_uri: "r", code: "c" } as any)
      ).toThrow("Secret Key missing!");
    });

    test("throws when redirect_uri is missing in credential mode", () => {
      const client = new WrapsplashLib();
      expect(() =>
        client.init({ access_key: "ak", secret_key: "sk", code: "c" } as any)
      ).toThrow("Redirect URI missing!");
    });

    test("throws when code is missing in credential mode", () => {
      const client = new WrapsplashLib();
      expect(() =>
        client.init({ access_key: "ak", secret_key: "sk", redirect_uri: "r" } as any)
      ).toThrow("Authorization Code missing!");
    });

    test("applies custom timeout, retries, and retryDelayMs", async () => {
      const client = new WrapsplashLib();
      client.init({
        bearer_token: "tok",
        timeout: 5000,
        retries: 5,
        retryDelayMs: 500,
      });

      await client.getCurrentUserProfile();

      expect(capturedAxiosOptions).toEqual(
        expect.objectContaining({
          timeout: 5000,
          retries: 5,
          retryDelayMs: 500,
        })
      );
    });

    test("falls back to defaults for invalid timeout", async () => {
      const client = new WrapsplashLib();
      client.init({ bearer_token: "tok", timeout: -1 });
      await client.getCurrentUserProfile();

      expect(capturedAxiosOptions).toEqual(expect.objectContaining({ timeout: 10000 }));
    });

    test("falls back to defaults for non-number timeout", async () => {
      const client = new WrapsplashLib();
      client.init({ bearer_token: "tok", timeout: "bad" as any });
      await client.getCurrentUserProfile();

      expect(capturedAxiosOptions).toEqual(expect.objectContaining({ timeout: 10000 }));
    });

    test("falls back to defaults for invalid retries", async () => {
      const client = new WrapsplashLib();
      client.init({ bearer_token: "tok", retries: -1 });
      await client.getCurrentUserProfile();

      expect(capturedAxiosOptions).toEqual(expect.objectContaining({ retries: 2 }));
    });

    test("allows retries of 0", async () => {
      const client = new WrapsplashLib();
      client.init({ bearer_token: "tok", retries: 0 });
      await client.getCurrentUserProfile();

      expect(capturedAxiosOptions).toEqual(expect.objectContaining({ retries: 0 }));
    });

    test("falls back to defaults for invalid retryDelayMs", async () => {
      const client = new WrapsplashLib();
      client.init({ bearer_token: "tok", retryDelayMs: -5 });
      await client.getCurrentUserProfile();

      expect(capturedAxiosOptions).toEqual(expect.objectContaining({ retryDelayMs: 100 }));
    });
  });

  describe("response handling", () => {
    test("handles 204 No Content response", async () => {
      makeRequestMock.mockResolvedValueOnce({
        status: 204,
        statusText: "No Content",
        data: {},
      });

      const response = await wrapsplash.getCurrentUserProfile();
      expect(response).toEqual({
        status: 204,
        statusText: "No Content",
        message: "Content Deleted",
      });
    });

    test("handles 403 rate limit response", async () => {
      makeRequestMock.mockResolvedValueOnce({
        status: 403,
        statusText: "Forbidden",
        data: {},
      });

      const response = await wrapsplash.getCurrentUserProfile();
      expect(response).toEqual({
        status: 403,
        statusText: "Forbidden",
        message: "Rate Limit Exceeded",
      });
    });
  });

  describe("error wrapping", () => {
    test("wraps Axios-style error with response status", async () => {
      makeRequestMock.mockRejectedValueOnce({
        response: { status: 404, statusText: "Not Found" },
        message: "Request failed with status code 404",
      });

      await expect(wrapsplash.getCurrentUserProfile()).rejects.toMatchObject({
        name: "WrapSplashError",
        statusCode: 404,
        statusText: "Not Found",
      });
    });

    test("wraps plain string error", async () => {
      makeRequestMock.mockRejectedValueOnce("raw string error");

      await expect(wrapsplash.getCurrentUserProfile()).rejects.toMatchObject({
        name: "WrapSplashError",
        message: "raw string error",
      });
    });

    test("wraps unknown error type with fallback message", async () => {
      makeRequestMock.mockRejectedValueOnce(42);

      await expect(wrapsplash.getCurrentUserProfile()).rejects.toMatchObject({
        name: "WrapSplashError",
        message: "Request failed",
      });
    });

    test("wraps error without response object", async () => {
      makeRequestMock.mockRejectedValueOnce(new Error("network down"));

      const error = await wrapsplash.getCurrentUserProfile().catch((e) => e);
      expect(error).toBeInstanceOf(WrapSplashError);
      expect(error.message).toBe("network down");
      expect(error.statusCode).toBeUndefined();
    });

    test("preserves existing WrapSplashError", async () => {
      const original = new WrapSplashError("already wrapped", { statusCode: 503 });
      makeRequestMock.mockRejectedValueOnce(original);

      await expect(wrapsplash.getCurrentUserProfile()).rejects.toBe(original);
    });
  });

  describe("parameter validation", () => {
    test("listPhotos throws for invalid order_by", () => {
      expect(() => wrapsplash.listPhotos(1, 10, "bad")).toThrow(
        "Parameter : order_by has an unsupported value!"
      );
    });

    test("listCuratedPhotos throws for invalid order_by", () => {
      expect(() => wrapsplash.listCuratedPhotos(1, 10, "bad")).toThrow(
        "Parameter : order_by has an unsupported value!"
      );
    });

    test("getUserPhotos throws when username is empty", () => {
      expect(() => wrapsplash.getUserPhotos("")).toThrow("Parameter : username is required and cannot be empty!");
    });

    test("getUserLikedPhotos throws when username is empty", () => {
      expect(() => wrapsplash.getUserLikedPhotos("")).toThrow("Parameter : username is required and cannot be empty!");
    });

    test("getUserCollections throws when username is empty", () => {
      expect(() => wrapsplash.getUserCollections("")).toThrow("Parameter : username is required and cannot be empty!");
    });

    test("getUserStatistics throws when username is empty", () => {
      expect(() => wrapsplash.getUserStatistics("")).toThrow("Parameter : username is required and cannot be empty!");
    });

    test("getPhotoStatistics throws when id is empty", () => {
      expect(() => wrapsplash.getPhotoStatistics("")).toThrow("Parameter : id is required!");
    });

    test("getPhotoLink throws when id is empty", () => {
      expect(() => wrapsplash.getPhotoLink("")).toThrow("Parameter : id is required!");
    });

    test("updatePhoto throws when id is empty", () => {
      expect(() => wrapsplash.updatePhoto("")).toThrow("Parameter : id is required!");
    });

    test("likePhoto throws when id is empty", () => {
      expect(() => wrapsplash.likePhoto("")).toThrow("Parameter : id is required!");
    });

    test("unlikePhoto throws when id is empty", () => {
      expect(() => wrapsplash.unlikePhoto("")).toThrow("Parameter : id is required!");
    });

    test("searchCollections throws when query is empty", () => {
      expect(() => wrapsplash.searchCollections("")).toThrow("Parameter : query is missing!");
    });

    test("searchUsers throws when query is empty", () => {
      expect(() => wrapsplash.searchUsers("")).toThrow("Parameter : query is missing!");
    });

    test("getCollection throws when id is empty", () => {
      expect(() => wrapsplash.getCollection("")).toThrow("Parameter : id is required!");
    });

    test("getCuratedCollection throws when id is empty", () => {
      expect(() => wrapsplash.getCuratedCollection("")).toThrow("Parameter : id is required!");
    });

    test("getCollectionPhotos throws when id is empty", () => {
      expect(() => wrapsplash.getCollectionPhotos("")).toThrow("Parameter : id is required!");
    });

    test("getCuratedCollectionPhotos throws when id is empty", () => {
      expect(() => wrapsplash.getCuratedCollectionPhotos("")).toThrow("Parameter : id is required!");
    });

    test("listRelatedCollections throws when id is empty", () => {
      expect(() => wrapsplash.listRelatedCollections("")).toThrow("Parameter : id is required!");
    });

    test("deleteCollection throws when id is empty", () => {
      expect(() => wrapsplash.deleteCollection("")).toThrow("Parameter : id is required!");
    });

    test("addPhotoToCollection throws when collection_id is empty", () => {
      expect(() => wrapsplash.addPhotoToCollection("", "pid")).toThrow("Parameter : collection_id is required");
    });

    test("addPhotoToCollection throws when photo_id is empty", () => {
      expect(() => wrapsplash.addPhotoToCollection("cid", "")).toThrow("Parameter : photo_id is required");
    });

    test("removePhotoFromCollection throws when collection_id is empty", () => {
      expect(() => wrapsplash.removePhotoFromCollection("", "pid")).toThrow("Parameter : collection_id is required");
    });

    test("removePhotoFromCollection throws when photo_id is empty", () => {
      expect(() => wrapsplash.removePhotoFromCollection("cid", "")).toThrow("Parameter : photo_id is required");
    });

    test("createNewCollection throws when title is empty", () => {
      expect(() => wrapsplash.createNewCollection("")).toThrow("Parameter : title is required");
    });

    test("updateExistingCollection throws when id is empty", () => {
      expect(() => wrapsplash.updateExistingCollection("", "title")).toThrow("Parameter : id is required!");
    });

    test("updateExistingCollection throws when title is empty", () => {
      expect(() => wrapsplash.updateExistingCollection("id", "")).toThrow("Parameter : title is required");
    });

    test("getUserPhotos throws for invalid stats type", () => {
      expect(() => wrapsplash.getUserPhotos("user", 1, 10, "yes" as any)).toThrow(
        "Parameter : stats is a boolean or optional!"
      );
    });

    test("getARandomPhoto throws for invalid orientation", () => {
      expect(() => wrapsplash.getARandomPhoto(undefined, false, undefined, undefined, undefined, undefined, "diagonal")).toThrow(
        "Parameter : orientation has an unsupported value!"
      );
    });

    test("search throws for invalid orientation", () => {
      expect(() => wrapsplash.search("q", 1, 10, undefined, "diagonal")).toThrow(
        "Parameter : orientation has an unsupported value!"
      );
    });
  });

  describe("query parameter filtering", () => {
    test("omits undefined parameters from query string", async () => {
      const response = await wrapsplash.getUserPhotos("sandeepv", undefined, undefined, undefined, undefined, undefined, "oldest");

      expect(makeRequestMock).toHaveBeenCalledWith(
        expect.any(String),
        "get",
        expect.objectContaining({ order_by: "oldest" }),
        undefined
      );
    });

    test("getPhoto omits undefined rect parameter", async () => {
      await wrapsplash.getPhoto("id", 100, 200);
      expect(makeRequestMock).toHaveBeenCalledWith(
        expect.any(String),
        "get",
        { w: 100, h: 200, rect: undefined },
        undefined
      );
    });
  });

  describe("deprecated alias", () => {
    test("createNewColection delegates to createNewCollection", async () => {
      const response = await wrapsplash.createNewColection("Legacy Collection", "desc", false);

      expect(makeRequestMock).toHaveBeenCalledWith(
        "https://api.unsplash.com/collections",
        "post",
        { title: "Legacy Collection", description: "desc", private: false },
        undefined
      );
    });
  });

  describe("updateCurrentUserProfile with partial params", () => {
    test("sends only provided fields", async () => {
      await wrapsplash.updateCurrentUserProfile("newuser");

      expect(makeRequestMock).toHaveBeenCalledWith(
        "https://api.unsplash.com/me",
        "put",
        {
          username: "newuser",
          first_name: undefined,
          last_name: undefined,
          email: undefined,
          url: undefined,
          location: undefined,
          bio: undefined,
          instagram_username: undefined,
        },
        undefined
      );
    });
  });
});
