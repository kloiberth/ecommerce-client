import { Token, User } from "@/api";
import { createContext, useEffect, useState } from "react";

const tokenCtrl = new Token();
const userCtrl = new User();

export const AuthContext = createContext();

export function AuthProvided({ children }) {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = async (token) => {

        try {

            tokenCtrl.setToken(token);
            const response = await userCtrl.getMe();
            setUser(response);
            setToken(token);
            setLoading(false);

        } catch (error) {
            setLoading(false);
        }
    }

    const logout = () => {
        tokenCtrl.removeToken();
        setToken(null);
        setUser(null);
    }

    const updateUser = (key, value) => {
        setUser({
            ...user, //... tres puntos --> operator
            [key]: value,
        });
    }

    useEffect(() => {

        (async () => {
            const token = tokenCtrl.getToken();

            if (!token) {
                logout();
                setLoading(false);
                return;
            }

            if (tokenCtrl.hasExpired(token)) {
                logout();
            } else {
                await login(token);
            }
        })()
    }, []);


    const data = {
        accesToken: token,
        user,
        login,
        logout,
        updateUser,
    };

    if (loading) return null;

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}