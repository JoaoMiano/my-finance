"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";
import { UserType } from "@/type/UserType";

type AuthContextProps = {
    isAuthenticated: boolean;
    loading: boolean;
    login: (userData: UserType) => void;
    logout: () => void;
    user: UserType | null;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<UserType | null>(null);

    useEffect(() => {
        // Verifica se existe token no cookie quando o app inicia
        const token = Cookies.get("token");
        const storedUser = Cookies.get("user");

        if (token && storedUser) {
            setIsAuthenticated(true);
            setUser(JSON.parse(storedUser));
        }

        setLoading(false); // terminou de checar
    }, []);

    function login(userData: UserType) {
        Cookies.set("token", userData.token, { expires: 12 });
        Cookies.set("user", JSON.stringify(userData), { expires: 12 });
        setUser(userData);
        setIsAuthenticated(true);
        
    }

    function logout() {
        Cookies.remove("token");
        Cookies.remove("user");
        setUser(null);
        setIsAuthenticated(false);
    }




    return (
        <AuthContext.Provider
            value={{ isAuthenticated, loading, user, login, logout }}
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
