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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [error, setError] = React.useState<{ [key: string]: any } | null>(null);
    const { token } = useAuth();
    
    const request = React.useCallback(async <T> ({  method = 'GET', endpoint, headers = {}, body }: APIRequest): Promise<T | null>  => {
        try {
            setLoading(true);
            setError(null);

            const req = await fetch(`${apiConfig.baseUrl}${endpoint}`, {
                method: method || 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : '',
                    ...headers,
                },
                body: body ? JSON.stringify(body) : undefined,
            });
            const json = await req.json();

            if (req.status >= 300) {
                throw json;
            }
            
            return json;
        } catch (error) {
            console.error('An error occurred while making the request: ', error);
            setError(error as object);
            return null;
        } finally {
            setTimeout(() => setLoading(false), 1000);
        }
    }, [token]);

    return { request, loading, error };
};

export default useApi;