import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const initialAuthState = { user: null, roles: [], accessToken: null }; // Domyślny stan autoryzacji

    const [auth, setAuth] = useState(initialAuthState);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;