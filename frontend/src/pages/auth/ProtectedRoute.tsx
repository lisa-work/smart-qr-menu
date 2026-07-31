import {useAuth} from '@/hooks/useAuth'
import { Navigate, Outlet } from 'react-router-dom'
import { SideBarNav } from '@/components'

function ProtectedRoute() {
    const {loading, isAuthenticated} = useAuth()

    if (loading) {
                return <div className="flex min-h-screen items-center justify-center">Loading...</div>
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }
    
    return (
        <div className="flex min-h-screen w-full flex-col lg:flex-row">
            <aside className="w-full border-b border-border bg-background lg:w-72 lg:border-b-0 lg:border-r">
                <SideBarNav />
            </aside>
            <main className="min-w-0 flex-1">
                <Outlet />
            </main>
        </div>
    )
}

export default ProtectedRoute