import { AxiosRequestConfig } from "axios";
interface AxiosAjaxOptions extends AxiosRequestConfig {
    retries?: number;
    retryDelayMs?: number;
}
declare class AxiosAjax {
    private http;
    private retries;
    private retryDelayMs;
    constructor(options?: AxiosAjaxOptions);
    private sleep;
    private isRetryableError;
    private getRetryDelay;
    makeRequest(url: string, method: string, queryParameters?: Record<string, unknown>, body?: unknown): Promise<import("axios").AxiosResponse<any, any, {}>>;
}
export default AxiosAjax;
