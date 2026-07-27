import { describe, expect, test, vi, beforeEach, afterEach } from "vitest";
import axios from "axios";
import AxiosAjax from "../lib/axiosAjaxLib";

vi.mock("axios");

const mockedAxios = vi.mocked(axios);

function createMockInstance() {
  const fn = vi.fn();
  return fn;
}

beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("AxiosAjax", () => {
  test("throws when url is empty", async () => {
    const ajax = new AxiosAjax();
    await expect(ajax.makeRequest("", "get")).rejects.toThrow("URL required");
  });

  test("passes method, params, and data to axios", async () => {
    const instance = createMockInstance();
    instance.mockResolvedValue({ status: 200, data: "ok" });
    mockedAxios.create.mockReturnValue(instance as any);

    const ajax = new AxiosAjax({ timeout: 5000 });
    await ajax.makeRequest("https://example.com/api", "post", { q: 1 }, { body: true });

    expect(instance).toHaveBeenCalledWith({
      method: "post",
      url: "https://example.com/api",
      params: { q: 1 },
      data: { body: true },
    });
  });

  test("defaults method to get when empty string", async () => {
    const instance = createMockInstance();
    instance.mockResolvedValue({ status: 200 });
    mockedAxios.create.mockReturnValue(instance as any);

    const ajax = new AxiosAjax();
    await ajax.makeRequest("https://example.com", "");

    expect(instance).toHaveBeenCalledWith(
      expect.objectContaining({ method: "get" })
    );
  });

  test("does not retry on 4xx errors (non-429)", async () => {
    vi.useFakeTimers();
    const instance = createMockInstance();
    const error400 = {
      response: { status: 400, statusText: "Bad Request", headers: {} },
      isAxiosError: true,
      message: "Request failed with status code 400",
    };
    instance.mockRejectedValueOnce(error400);
    mockedAxios.create.mockReturnValue(instance as any);

    const ajax = new AxiosAjax({ retries: 3, retryDelayMs: 100 });
    await expect(ajax.makeRequest("https://example.com", "get")).rejects.toThrow();
    expect(instance).toHaveBeenCalledTimes(1);
  });

  test("does not retry on 401 Unauthorized", async () => {
    vi.useFakeTimers();
    const instance = createMockInstance();
    instance.mockRejectedValueOnce({
      response: { status: 401, statusText: "Unauthorized", headers: {} },
      isAxiosError: true,
    });
    mockedAxios.create.mockReturnValue(instance as any);

    const ajax = new AxiosAjax({ retries: 3, retryDelayMs: 100 });
    await expect(ajax.makeRequest("https://example.com", "get")).rejects.toThrow();
    expect(instance).toHaveBeenCalledTimes(1);
  });

  test("does not retry on 403 Forbidden", async () => {
    vi.useFakeTimers();
    const instance = createMockInstance();
    instance.mockRejectedValueOnce({
      response: { status: 403, statusText: "Forbidden", headers: {} },
      isAxiosError: true,
    });
    mockedAxios.create.mockReturnValue(instance as any);

    const ajax = new AxiosAjax({ retries: 2, retryDelayMs: 100 });
    await expect(ajax.makeRequest("https://example.com", "get")).rejects.toThrow();
    expect(instance).toHaveBeenCalledTimes(1);
  });

  test("does not retry on 404 Not Found", async () => {
    vi.useFakeTimers();
    const instance = createMockInstance();
    instance.mockRejectedValueOnce({
      response: { status: 404, statusText: "Not Found", headers: {} },
      isAxiosError: true,
    });
    mockedAxios.create.mockReturnValue(instance as any);

    const ajax = new AxiosAjax({ retries: 2, retryDelayMs: 100 });
    await expect(ajax.makeRequest("https://example.com", "get")).rejects.toThrow();
    expect(instance).toHaveBeenCalledTimes(1);
  });

  test("retries on 429 Too Many Requests", async () => {
    vi.useFakeTimers();
    const instance = createMockInstance();
    const error429 = {
      response: { status: 429, statusText: "Too Many Requests", headers: {} },
      isAxiosError: true,
    };
    instance.mockRejectedValueOnce(error429).mockResolvedValueOnce({ status: 200, data: "ok" });
    mockedAxios.create.mockReturnValue(instance as any);

    const ajax = new AxiosAjax({ retries: 2, retryDelayMs: 100 });
    const promise = ajax.makeRequest("https://example.com", "get");

    await vi.advanceTimersByTimeAsync(200);
    const result = await promise;

    expect(instance).toHaveBeenCalledTimes(2);
    expect(result).toEqual({ status: 200, data: "ok" });
  });

  test("retries on 500 Internal Server Error", async () => {
    vi.useFakeTimers();
    const instance = createMockInstance();
    instance
      .mockRejectedValueOnce({
        response: { status: 500, statusText: "Internal Server Error", headers: {} },
        isAxiosError: true,
      })
      .mockResolvedValueOnce({ status: 200, data: "recovered" });
    mockedAxios.create.mockReturnValue(instance as any);

    const ajax = new AxiosAjax({ retries: 2, retryDelayMs: 100 });
    const promise = ajax.makeRequest("https://example.com", "get");

    await vi.advanceTimersByTimeAsync(200);
    const result = await promise;

    expect(instance).toHaveBeenCalledTimes(2);
    expect(result.data).toBe("recovered");
  });

  test("retries on 502 Bad Gateway", async () => {
    vi.useFakeTimers();
    const instance = createMockInstance();
    instance
      .mockRejectedValueOnce({
        response: { status: 502, statusText: "Bad Gateway", headers: {} },
        isAxiosError: true,
      })
      .mockResolvedValueOnce({ status: 200 });
    mockedAxios.create.mockReturnValue(instance as any);

    const ajax = new AxiosAjax({ retries: 1, retryDelayMs: 100 });
    const promise = ajax.makeRequest("https://example.com", "get");

    await vi.advanceTimersByTimeAsync(200);
    await promise;

    expect(instance).toHaveBeenCalledTimes(2);
  });

  test("retries on network error (no response)", async () => {
    vi.useFakeTimers();
    const instance = createMockInstance();
    instance
      .mockRejectedValueOnce(new Error("Network Error"))
      .mockResolvedValueOnce({ status: 200 });
    mockedAxios.create.mockReturnValue(instance as any);

    const ajax = new AxiosAjax({ retries: 2, retryDelayMs: 100 });
    const promise = ajax.makeRequest("https://example.com", "get");

    await vi.advanceTimersByTimeAsync(200);
    const result = await promise;

    expect(instance).toHaveBeenCalledTimes(2);
    expect(result.status).toBe(200);
  });

  test("retries on timeout error", async () => {
    vi.useFakeTimers();
    const instance = createMockInstance();
    instance
      .mockRejectedValueOnce({ code: "ECONNABORTED", message: "timeout" })
      .mockResolvedValueOnce({ status: 200 });
    mockedAxios.create.mockReturnValue(instance as any);

    const ajax = new AxiosAjax({ retries: 2, retryDelayMs: 100 });
    const promise = ajax.makeRequest("https://example.com", "get");

    await vi.advanceTimersByTimeAsync(200);
    await promise;

    expect(instance).toHaveBeenCalledTimes(2);
  });

  test("exhausts all retries and throws last error", async () => {
    const instance = createMockInstance();
    const failError = new Error("persistent failure");
    instance.mockRejectedValueOnce(failError).mockRejectedValueOnce(failError).mockRejectedValueOnce(failError);
    mockedAxios.create.mockReturnValue(instance as any);

    const ajax = new AxiosAjax({ retries: 2, retryDelayMs: 0 });

    await expect(ajax.makeRequest("https://example.com", "get")).rejects.toThrow("persistent failure");
    expect(instance).toHaveBeenCalledTimes(3);
  });

  test("uses exponential backoff delays", async () => {
    vi.useFakeTimers();
    const instance = createMockInstance();
    instance
      .mockRejectedValueOnce(new Error("fail 1"))
      .mockRejectedValueOnce(new Error("fail 2"))
      .mockResolvedValueOnce({ status: 200 });
    mockedAxios.create.mockReturnValue(instance as any);

    const ajax = new AxiosAjax({ retries: 3, retryDelayMs: 100 });
    const promise = ajax.makeRequest("https://example.com", "get");

    await vi.advanceTimersByTimeAsync(200);
    await vi.advanceTimersByTimeAsync(400);
    await promise;

    expect(instance).toHaveBeenCalledTimes(3);
  });

  test("respects Retry-After header in seconds", async () => {
    vi.useFakeTimers();
    const instance = createMockInstance();
    instance
      .mockRejectedValueOnce({
        response: {
          status: 429,
          statusText: "Too Many Requests",
          headers: { "retry-after": "2" },
        },
        isAxiosError: true,
      })
      .mockResolvedValueOnce({ status: 200 });
    mockedAxios.create.mockReturnValue(instance as any);

    const ajax = new AxiosAjax({ retries: 2, retryDelayMs: 100 });
    const promise = ajax.makeRequest("https://example.com", "get");

    await vi.advanceTimersByTimeAsync(3000);
    const result = await promise;

    expect(instance).toHaveBeenCalledTimes(2);
    expect(result.status).toBe(200);
  });

  test("falls back to exponential backoff for invalid Retry-After header", async () => {
    vi.useFakeTimers();
    const instance = createMockInstance();
    instance
      .mockRejectedValueOnce({
        response: {
          status: 429,
          statusText: "Too Many Requests",
          headers: { "retry-after": "abc" },
        },
        isAxiosError: true,
      })
      .mockResolvedValueOnce({ status: 200 });
    mockedAxios.create.mockReturnValue(instance as any);

    const ajax = new AxiosAjax({ retries: 2, retryDelayMs: 100 });
    const promise = ajax.makeRequest("https://example.com", "get");

    await vi.advanceTimersByTimeAsync(200);
    await promise;

    expect(instance).toHaveBeenCalledTimes(2);
  });

  test("falls back to exponential backoff when Retry-After is 0", async () => {
    vi.useFakeTimers();
    const instance = createMockInstance();
    instance
      .mockRejectedValueOnce({
        response: {
          status: 429,
          statusText: "Too Many Requests",
          headers: { "retry-after": "0" },
        },
        isAxiosError: true,
      })
      .mockResolvedValueOnce({ status: 200 });
    mockedAxios.create.mockReturnValue(instance as any);

    const ajax = new AxiosAjax({ retries: 2, retryDelayMs: 100 });
    const promise = ajax.makeRequest("https://example.com", "get");

    await vi.advanceTimersByTimeAsync(200);
    await promise;

    expect(instance).toHaveBeenCalledTimes(2);
  });

  test("does not retry when delay is 0 and retries left", async () => {
    vi.useFakeTimers();
    const instance = createMockInstance();
    instance
      .mockRejectedValueOnce(new Error("fail"))
      .mockResolvedValueOnce({ status: 200 });
    mockedAxios.create.mockReturnValue(instance as any);

    const ajax = new AxiosAjax({ retries: 2, retryDelayMs: 0 });
    const result = await ajax.makeRequest("https://example.com", "get");

    expect(instance).toHaveBeenCalledTimes(2);
    expect(result.status).toBe(200);
  });

  test("uses default options when none provided", async () => {
    const instance = createMockInstance();
    instance.mockResolvedValue({ status: 200 });
    mockedAxios.create.mockReturnValue(instance as any);

    const ajax = new AxiosAjax();
    await ajax.makeRequest("https://example.com", "get");

    expect(instance).toHaveBeenCalledTimes(1);
  });

  test("passes default axios config when no options given", async () => {
    const instance = createMockInstance();
    instance.mockResolvedValue({ status: 200 });
    mockedAxios.create.mockReturnValue(instance as any);

    const ajax = new AxiosAjax();
    await ajax.makeRequest("https://example.com", "get");

    expect(mockedAxios.create).toHaveBeenCalledWith(
      expect.objectContaining({ timeout: 1000 })
    );
  });
});
