import {useAuth} from '@/hooks/useAuth'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoute() {
    const {loading, isAuthenticated} = useAuth()
// Check if the authentication state is still loading
    if (loading) {
        return <div>Loading...</div>
    }

    // If the user is not authenticated, redirect them to the login page
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }
    
// If the user is authenticated, render the child routes
  return <Outlet />
}

export default ProtectedRoute