import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
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

  private async sleep(ms: number): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, ms));
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

        if (attempt >= this.retries) {
          throw error;
        }

        if (this.retryDelayMs > 0) {
          await this.sleep(this.retryDelayMs);
        }
      }
    }

    throw lastError;
  }
}

export default AxiosAjax;
