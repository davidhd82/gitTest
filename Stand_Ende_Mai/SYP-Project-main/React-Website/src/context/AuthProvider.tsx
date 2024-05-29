import React, {createContext, useState} from 'react';
import PropTypes from "prop-types";

export interface IAuth {
    user: string
    accessToken: string,
    roles: number[]
}

export interface IAuthContext {
    auth: IAuth
    setAuth: React.Dispatch<
        React.SetStateAction<IAuthContext['auth']>
    >
    persist: boolean
    setPersist: React.Dispatch<React.SetStateAction<IAuthContext['persist']>>
}

const AuthContext = createContext<IAuthContext>({
    auth: {user: "", accessToken: "", roles: []}, setAuth: () => {
    },
    persist: false,
    setPersist: () => {
    }
});

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
}

interface IAuthProvider {
    children: React.ReactElement | React.ReactElement[]
}

export function AuthProvider({children}: IAuthProvider) {
    const [auth, setAuth] = useState<IAuthContext['auth']>({
        user: "", accessToken: "", roles: []
    });
    const [persist, setPersist] = useState(() => {
        const persistedValue = localStorage.getItem("persist");
        return persistedValue ? JSON.parse(persistedValue) : false;
    });
    return (
        <AuthContext.Provider value={{auth, setAuth, persist, setPersist}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;