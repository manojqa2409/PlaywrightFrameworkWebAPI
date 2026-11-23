import { APIRequestContext } from "@playwright/test";
import { stat } from "fs";
import { get } from "http";


export class ApiHelper {

    private readonly request: APIRequestContext;
    private readonly baseURL: string;


    constructor(request: APIRequestContext, baseURL: string) {
        this.request = request;
        this.baseURL = baseURL;
    }
    //helper methods:

    //GET

    async get(endPoint: string, headers?: Record<string, string>) {
        let response = await this.request.get(`${this.baseURL}${endPoint}`, {
            headers: headers
        });
        console.log("URL:", response.url());
        console.log("Status:", response.status(), "Response:", await response.json());
        console.log("Content-Type:", response.headers()["content-type"]);

        const responseText = await response.text();
        console.log("Response Body:", responseText.substring(0, 500));
        return {
            status: response.status(),
            body: await response.json()
        }
    }

    //POST Test

    async post(endPoint: string, data: object, headers?: Record<string, string>) {
        let response = await this.request.post(`${this.baseURL}${endPoint}`, {
            headers: headers,
            data: data
        });
        return {
            status: response.status(),
            body: await response.json()
        }
    }

    //PUT Test

    async put(endPoint: string, data: object, headers?: Record<string, string>) {
        let response = await this.request.put(`${this.baseURL}${endPoint}`, {
            headers: headers,
            data: data
        });
        return {
            status: response.status(),
            body: await response.json()
        }
    }

    //DELETE

    async delete(endPoint: string, headers?: Record<string, string>) {
        let response = await this.request.delete(`${this.baseURL}${endPoint}`, {
            headers: headers,

        });
        return {
            status: response.status(),
            //body: await response.json()
        }
    }




}