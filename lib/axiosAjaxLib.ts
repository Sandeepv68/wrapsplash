import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import axiosConfig from "../config/axiosConfig";

class AxiosAjax {
  private http: AxiosInstance;

  constructor(options?: AxiosRequestConfig) {
    this.http = axios.create(options || (axiosConfig as AxiosRequestConfig));
  }

  makeRequest(
    url: string,
    method: string,
    queryParameters?: Record<string, unknown>,
    body?: unknown
  ) {
    if (!url) {
      throw new Error("URL required");
    }

    return this.http({
      method: method || "get",
      url,
      params: queryParameters,
      data: body,
    });
  }
}

export default AxiosAjax;
