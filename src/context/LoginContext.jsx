import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';

const LoginContext = createContext();

const LoginContextProvider = ({ children }) => {
    const loginStatus = localStorage.getItem("isLoggedIn");
    const [isLoggedIn, setIsLoggedIn] = useState(loginStatus);

    return (
        <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </LoginContext.Provider>
    );
};

export { LoginContext, LoginContextProvider };
