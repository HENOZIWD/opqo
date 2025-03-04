import { AuthContext, AuthDispatchContext } from '@/contexts/auth';
import { useContext } from 'react';

export function useAuth() {
  const auth = useContext(AuthContext);
  const dispatch = useContext(AuthDispatchContext);

  if (!auth || !dispatch) {
    throw Error('Auth Context is null');
  }

  return {
    auth,
    authDispatch: dispatch,
  };
}
