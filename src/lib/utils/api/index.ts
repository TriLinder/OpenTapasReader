import { CapacitorHttp } from '@capacitor/core';
import type { HttpOptions } from '@capacitor/core';

export const API_BASE_URL = "http://127.0.0.1:8000/v3"

export async function getRequest(path: string, expectedResponseStatus = 200) {
    const options: HttpOptions = {
        url: API_BASE_URL + path,
        headers: {
            "accept": "application/panda+json",
            "x-device-type": "ANDROID",
            "x-device-uuid": ""
        },
        connectTimeout: 3000,
        readTimeout: 3000
    }
    

    const response = await CapacitorHttp.get(options);

    if (response.status != expectedResponseStatus) {
        throw new Error(`Unexpected response status: ${response.status}`);
    }

    if (typeof response.data === "string") {
        return JSON.parse(response.data);
    } else {
        return response.data;
    }
}