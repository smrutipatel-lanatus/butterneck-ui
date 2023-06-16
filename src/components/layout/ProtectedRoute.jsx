import { useAuthContext } from '../../context/AuthContextProvider';

export function ProtectedRoute({ Component }) {
  const { user } = useAuthContext();

  if (user) {
    return <Component />;
  }
}
