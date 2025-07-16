'use client';

import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {getToken, logout} from '@/app/api/auth';

export function useAuth() {
    const [token, setToken] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const storedToken = getToken();
        setToken(storedToken);
        setIsAuthenticated(!!storedToken);
    }, []);

    const disconnect = () => {
        logout();
        setToken(null);
        setIsAuthenticated(false);
        router.push("/login");
    };

    return {token, isAuthenticated, disconnect};
}