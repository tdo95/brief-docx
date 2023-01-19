import { createContext, useContext, useState, React } from "react";

//Store
const AuthContext = createContext(null)

//Auth Provider
export const AuthProvider = ({ children }) => {
    //TODO: this will retrieve user data from local storage if there is active session
    const [user, setUser] = useState(null);
    function login() {
        //TODO: make an api call to login user

    }
    function logout() {
        //TODO: make api call to log out user
    }
    function signup() {
        //TODO: make api call to signup user
    }

    return (<AuthContext.Provider value={{user, login, logout, signup}}>{ children }</AuthContext.Provider>)
}
//Auth Consumer Hook
export const useAuth = () => {
    return useContext(AuthContext)
}