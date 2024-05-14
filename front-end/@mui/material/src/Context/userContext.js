import { createContext, useState } from "react";

export const UserContext = createContext();


export const UserProvider = ({ children }) => {
    const [isLoading,setLoading] = useState(false);
    return(<UserContext.Provider value={
{        isLoading,
        setLoading,}
    }>
        {children}
    </UserContext.Provider>)
}