import React from "react"
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";

export type TokenPayload = {
    sub: number;
    document: string;
    accountAddress: string;
    role: 'ROLE_USER' | 'ROLE_ADMIN';
    exp: number;
};

const isTokenExpired = (tokenDecoded: TokenPayload): boolean => {
    const currentTime = Date.now() / 1000;
    return tokenDecoded.exp < currentTime;
};

export const LOCAL_STORAGE_TOKEN_KEY = 'access_token';

const useAuth = () => {
    const [payload, setPayload] = React.useState<TokenPayload | null>(null);
    const navigate = useNavigate();

    const signOut = () => {
        window.localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
        navigate('/auth');
    };

    const persistToken = (token: string) => {
        try {
            window.localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
            const decoded = jwtDecode<TokenPayload>(token);
            setPayload(decoded);
        } catch (error) {
            console.error(`Failed to persist token: ${token}`, error);
        }
    };

    const getToken = React.useCallback(() => {
        return window.localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    }, []);

    React.useEffect(() => {
        const token = window.localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
        if (!token) return;
        try {
            const decoded = jwtDecode<TokenPayload>(token);
            if (isTokenExpired(decoded)) {
                throw new Error('Token expired');
            }
            setPayload(decoded);
        } catch (error) {
            console.error('Token error', error);
            window.localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
            setPayload(null);
        }
    }, []);

    return { payload, signOut, persistToken, getToken };
}

export default useAuth;