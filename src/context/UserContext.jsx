import { getUserInfo } from "@/api/UserApi";
import { createContext, useContext, useEffect, useState } from "react";
import { LoginContext } from "./LoginContext";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {

    const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext)
    const [user, setUser] = useState(null)

    useEffect(() => {
        if (isLoggedIn) {
            getUserInfo()
            .then(resp => {
                console.log(resp);
                setUser(resp);
            })
            .catch((e) => {
                console.log(e);
                setIsLoggedIn(false);
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('refresh_token');
            });
        }
    }, [isLoggedIn])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )

}

export { UserContext, UserContextProvider };

