import { useContext, useDebugValue } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
    const contextValue = useContext(AuthContext);

    if (!contextValue) {
        console.error("AuthProvider not found in the component tree.");
    }

    const { auth, setAuth } = contextValue || {};
    useDebugValue(auth, auth => auth?.user ? "Logged In" : "Logged Out");
    
    if (!setAuth) {
        console.error("setAuth function not found in AuthContext.");
    }

    return { auth, setAuth };
}

export default useAuth;