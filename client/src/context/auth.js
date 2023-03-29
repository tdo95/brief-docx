import { createContext, useContext, useState, React, useEffect } from "react";

//Store
const AuthContext = createContext(null)

//Auth Provider
export const AuthProvider = ({ children }) => {
    //this will retrieve user data from the server if there is active session
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    
    async function getUser() {
        
        const res = await fetch('/auth/login');
        const data = await res.json()
        if (data.user) {
            setUser(data.user)
            localStorage.setItem('user', JSON.stringify(data.user))
        }
        else if (!data.user) {
            setUser(null)
            localStorage.setItem('user', null)
        }
        
        
    }
    
    async function login(email, password) {
        
        //TODO: make an api call to login user
        const res = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        const data = await res.json()
        
        if (data.errors) return data;
        else if (data.success){ 
            //set user object in local storage
            localStorage.setItem('user', JSON.stringify(data.user));
            setUser(data.user);
            return data; 
        }
        
    }
    async function logout() {
        //make api call to log out user
        const res = await fetch('/auth/logout');
        const data = await res.json();

        //set state and local storage for user data to null
        setUser(null)
        localStorage.setItem('user', null)
    }
    async function signup({ _name: name, _email: email, _password: password, _passwordConfirm: passwordConfirm}) {
        //make api call to signup user
        const res = await fetch('/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password,
                passwordConfirm
            })
        })
        const data = await res.json()
        
        if (data.errors) return data;
        else if (data.success){ 
            //set user object in local storage
            localStorage.setItem('user', JSON.stringify(data.user));
            setUser(data.user);
            return data; 
        }
    }

    return (<AuthContext.Provider value={{user, login, logout, signup, getUser}}>{ children }</AuthContext.Provider>)
}
//Auth Consumer Hook
export const useAuth = () => {
    return useContext(AuthContext)
}