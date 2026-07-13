import { useAuth } from '../../hooks/useAuth';
import { Button } from '../ui';

function NavBar() {
const { user, logout } = useAuth();

  return (
    <>
        <p>
            {user?.name}
        </p>

        <Button onClick={logout}>Logout</Button>
    </>
  )
}

export default NavBar