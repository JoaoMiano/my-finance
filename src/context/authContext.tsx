"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";

type AuthContextProps = {
    isAuthenticated: boolean;
    loading: boolean;
    login: (token: string) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Verifica se existe token no cookie quando o app inicia
        const token = Cookies.get("token");

        if (token) {
            setIsAuthenticated(true);
        }

        setLoading(false); // terminou de checar
    }, []);

    function login(token: string) {
        Cookies.set("token", token, { expires: 12 });
        setIsAuthenticated(true);
    }

    function logout() {
        Cookies.remove("token");
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, loading, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
}
