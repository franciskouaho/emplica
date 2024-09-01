import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import api from '@/config/api';
import Loading from "@/app/loading";

interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    checkAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const checkAuth = async () => {
        setIsLoading(true);
        try {
            console.log("Sending auth request...");
            await api.get('auth', {withCredentials: true});
            console.log("Auth successful");
            setIsAuthenticated(true);
        } catch (error) {
            console.error("Auth failed", error);
            setIsAuthenticated(false);
            setTimeout(() => {
                router.push('/auth/login');
            }, 1000);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            checkAuth();
        }, 1000);
    }, []);

    return (
        <AuthContext.Provider value={{isAuthenticated, isLoading, checkAuth}}>
            {isLoading ? <Loading/> : children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
