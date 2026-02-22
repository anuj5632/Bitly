import { createContext, useContext, useState } from "react";

const ContextApi = createContext();

export const ContextProvider = ({ children }) => {
    const getToken = (() => {
        try {
            const storedToken = localStorage.getItem("JWT_TOKEN");
            return storedToken ? JSON.parse(storedToken) : null;
        } catch {
            return null;
        }
    })();

    const [token, setToken] = useState(getToken);

    const sendData = {
        token,
        setToken,
    };

    return <ContextApi.Provider value={sendData}>{children}</ContextApi.Provider>
};


export const useStoreContext = () => {
    const context = useContext(ContextApi);
    return context;
}