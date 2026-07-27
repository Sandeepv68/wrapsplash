import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import axiosConfig from "../config/axiosConfig";

interface AxiosAjaxOptions extends AxiosRequestConfig {
  retries?: number;
  retryDelayMs?: number;
}

class AxiosAjax {
  private http: AxiosInstance;
  private retries: number;
  private retryDelayMs: number;

  constructor(options?: AxiosAjaxOptions) {
    this.http = axios.create(options || (axiosConfig as AxiosRequestConfig));
    this.retries = options?.retries ?? 2;
    this.retryDelayMs = options?.retryDelayMs ?? 100;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private isRetryableError(error: unknown): boolean {
    if (axios.isCancel(error)) {
      return false;
    }

    const axiosError = error as AxiosError;

    if (!axiosError.response) {
      return true;
    }

    const status = axiosError.response.status;
    return status === 429 || status >= 500;
  }

  private getRetryDelay(error: unknown, attempt: number): number {
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      const retryAfterHeader = axiosError.response.headers?.["retry-after"];
      if (retryAfterHeader) {
        const seconds = Number(retryAfterHeader);
        if (!Number.isNaN(seconds) && seconds > 0) {
          return seconds * 1000;
        }
      }
    }

    return this.retryDelayMs * Math.pow(2, attempt);
  }

  async makeRequest(
    url: string,
    method: string,
    queryParameters?: Record<string, unknown>,
    body?: unknown
  ) {
    if (!url) {
      throw new Error("URL required");
    }

    let lastError: unknown;

    for (let attempt = 0; attempt <= this.retries; attempt += 1) {
      try {
        return await this.http({
          method: method || "get",
          url,
          params: queryParameters,
          data: body,
        });
      } catch (error) {
        lastError = error;

        if (attempt >= this.retries || !this.isRetryableError(error)) {
          throw error;
        }

        const delay = this.getRetryDelay(error, attempt);
        if (delay > 0) {
          await this.sleep(delay);
        }
      }
    }

    throw lastError;
  }
}

export default AxiosAjax;
