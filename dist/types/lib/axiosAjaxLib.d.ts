import { AxiosRequestConfig } from "axios";
declare class AxiosAjax {
    private http;
    constructor(options?: AxiosRequestConfig);
    makeRequest(url: string, method: string, queryParameters?: Record<string, unknown>, body?: unknown): Promise<import("axios").AxiosResponse<any, any, {}>>;
}
export default AxiosAjax;
