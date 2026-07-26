import React, { createContext, useEffect, useState } from 'react'
import type { User, LoginData } from '../types/auth';
import authService from '../services/auth';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// Define the shape of the authentication context
interface AuthContextProps {
    user: User | null;
    loading: boolean;
    login: (data: LoginData) => Promise<void>;
    logout: () => Promise<void>;
    isAuthenticated: boolean;
}

// Define the props for the AuthProvider component
interface AuthProviderProps {
    children: React.ReactNode;
}

// Create the authentication context with an initial value of undefined
export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children } : AuthProviderProps) {

    const navigate = useNavigate();

    // Initialize the user and loading state
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Use useEffect to fetch the current user when the component mounts
    useEffect(() => {
    const fetchCurrentUser = async () => {
        try {
        const response = await authService.getCurrentUser();

        setUser(response.data);
        } catch {
        setUser(null);
        } finally {
        setLoading(false);
        }
    };

    fetchCurrentUser();
    }, []);

    // Define the login function that calls the authService to log in the user
    const login = async (data: LoginData) => {
        try {
            setLoading(true);
            const { user } = await authService.login(data);
            const me = await authService.getCurrentUser();
            setUser(user);
            if (!me.data.restaurant) {
                navigate('/restaurant');
            } else {
                navigate('/dashboard');
            }
        } finally {
            setLoading(false);
        }
    }

    // Define the logout function that calls the authService to log out the user
    const logout = async () => {
        try {
            setLoading(true);
            await authService.logout();
            setUser(null);
            toast.success("Logged out successfully.");
            navigate('/login');
        } catch (error) {
            toast.error("Logout failed. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    // Create the value object that will be provided to the context consumers
    const value = {
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
    }

    // Render the AuthContext.Provider with the value and children
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext