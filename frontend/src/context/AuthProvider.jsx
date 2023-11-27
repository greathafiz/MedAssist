import { createContext, useEffect, useState } from "react";

const AuthContext = createContext()

export const AuthProvider = ({children}) =>{
    const [auth,setAuth] = useState({})

    useEffect(()=>{
        const user = localStorage.getItem('user')
        setAuth(user)
    }, [])
    return(
        <AuthContext.Provider value={{auth,setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;