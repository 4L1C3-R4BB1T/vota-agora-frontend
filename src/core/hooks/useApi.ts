import React from "react";
import useAuth from "./useAuth";
import { apiConfig } from "@/configs/api.config";

export interface APIRequest {
    endpoint: string;
    method?: string;
    headers?: HeadersInit;
    body?: object;
}

const useApi = () => {
    const [loading, setLoading] = React.useState(false);
    const { token } = useAuth();
    
    const request = React.useCallback(async <T> ({  method = 'GET', endpoint, headers = {}, body }: APIRequest): Promise<T | null>  => {
        try {
            setLoading(true);
            const req = await fetch(`${apiConfig.baseUrl}${endpoint}`, {
                method: method || 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : '',
                    ...headers,
                },
                body: body ? JSON.stringify(body) : undefined,
            });
            return await req.json();
        } catch (err) {
            console.log(err);
            return null;
        } finally {
            setLoading(false);
        }
    }, [token]);

    return { request, loading };
};

export default useApi;