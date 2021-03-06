import React, { createContext, useCallback, useState, useContext } from "react";
import api from "../services/api";

interface User {
    id: string;
    name: string;
}

interface AuthState {
    token: string;
    user: User;
}

interface SignInCredentials {
    email: string;
    password: string;
}

interface AuthContextData {
    user: User;
    signIn(credentials: SignInCredentials): Promise<void>;
    signOut(): void;
    token: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used whitin an AuthProvider");
    }

    return context;
}

export const AuthProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<AuthState>(() => {
        const token = localStorage.getItem("@LanchasVida:token");
        const user = localStorage.getItem("@LanchasVida:user");
        if (token && user) {
            return { token, user: JSON.parse(user) };
        }
        return {} as AuthState;
    });

    const signOut = useCallback(() => {
        localStorage.removeItem("@LanchasVida:token");
        localStorage.removeItem("@LanchasVida:user");
        setData({} as AuthState);
    }, []);

    const signIn = useCallback(async ({ email, password }) => {
        const response = await api.post("/sessions/admin", {
            email,
            password,
        });

        const { token, user } = response.data;

        localStorage.setItem("@LanchasVida:token", token);
        localStorage.setItem("@LanchasVida:user", JSON.stringify(user));

        setData({ token, user });
    }, []);
    return (
        <AuthContext.Provider value={{ user: data.user, token: data.token, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};
 