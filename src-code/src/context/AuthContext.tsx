import { createContext, useContext, useState} from 'react';
import type { ReactNode } from 'react';

interface AuthContextType {
    user:string | null;
    login: (username:string ) => void;
    logout:() => void;
    isAuthenticated:boolean;

}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }){

    const [user,setUser] = useState<string | null>(() =>{
        return localStorage.getItem('mihoyo-user');
    });

    const login = (username:string) => {
        setUser (username);
        localStorage.setItem('mihoyo-user',username);
    };

    const logout = () =>{
        setUser(null);
        localStorage.removeItem('mihoyo-user');
    }

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            isAuthenticated: !!user,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}