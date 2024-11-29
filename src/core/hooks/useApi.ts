import React from "react";
import useAuth from "./useAuth";
import { apiConfig } from "@/configs/api.config";

export interface APIRequest {
    endpoint?: string;
    method?: string;
    headers?: HeadersInit;
    body?: object;
}

const useApi = (path: string = '') => {
    const [loading, setLoading] = React.useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [error, setError] = React.useState<{ [key: string]: any } | null>(null);
    const { getToken } = useAuth();
    
    const request = React.useCallback(async <T> ({  method = 'GET', endpoint = '', headers = {}, body }: APIRequest): Promise<T | null>  => {
        try {
            setLoading(true);
            setError(null);
            const token = getToken();

            const req = await fetch(`${apiConfig.baseUrl}${path}${endpoint}`, {
                method: method || 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : '',
                    ...headers,
                },
                body: body ? JSON.stringify(body) : undefined,
            });
            const json = await req.json();
            return json;
        } catch (error) {
            console.error('An error occurred while making the request: ', error);
            return null;
        } finally {
            setTimeout(() => setLoading(false), 200);
        }
    }, [path, getToken]);

    return { request, loading, error };
};

export default useApi;