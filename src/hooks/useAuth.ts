import { AuthContext, AuthDispatchContext } from '@/contexts/auth';
import { useContext } from 'react';

export function useAuth() {
  const auth = useContext(AuthContext);
  const dispatch = useContext(AuthDispatchContext);

  return {
    auth,
    authDispatch: dispatch,
  };
}
