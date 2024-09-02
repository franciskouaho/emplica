import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/config/api';
import Loading from "@/app/loading";

interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    checkAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const checkAuth = async () => {
        setIsLoading(true);
        try {
            await api.get('auth', { withCredentials: true });
            setIsAuthenticated(true);
        } catch (error) {
            setIsAuthenticated(false);
            router.push('/auth/login');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);


    console.log("isAuthenticated", isAuthenticated);
    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, checkAuth }}>
            {isLoading ? <Loading /> : children}
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
