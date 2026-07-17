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
});
