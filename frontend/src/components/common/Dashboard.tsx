import { useAuth } from '@/hooks/useAuth'
import { LoginPage } from '@/pages';

function Dashboard() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <div>
      <h1>Welcome, {user?.name}!</h1>
    </div>
  )
}

export default Dashboard