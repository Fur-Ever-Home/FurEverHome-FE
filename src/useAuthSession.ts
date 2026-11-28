import { createContext, useContext } from 'react';

export const CSRF_HEADER = 'X-CSRF-Token';

export type UserRole = 'adopter' | 'shelter';

export interface SessionUser {
  email: string;
  role: UserRole;
}

type AuthSession = {
  user: SessionUser | null;
  csrfToken: string | null;
  refreshSession: () => Promise<SessionUser | null>;
};

export const AuthSessionContext = createContext<AuthSession | null>(null);

export function useAuthSession() {
  const session = useContext(AuthSessionContext);
  if (!session) throw new Error('AuthSessionProvider is missing');
  return session;
}
