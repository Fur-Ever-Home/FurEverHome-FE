import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { API_BASE_URL } from './config';
import { AuthSessionContext, CSRF_HEADER, type SessionUser } from './useAuthSession';

type VerifiedSession = { user: SessionUser; csrfToken: string };

export default function AuthSessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<VerifiedSession | null>(null);
  const pendingRequest = useRef<AbortController | null>(null);

  const refreshSession = useCallback(async () => {
    pendingRequest.current?.abort();
    const controller = new AbortController();
    pendingRequest.current = controller;

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/session`, {
        credentials: 'include',
        signal: controller.signal,
      });
      if (response.status === 401) {
        if (!controller.signal.aborted) setSession(null);
        return null;
      }
      if (!response.ok) throw new Error('Session lookup failed');

      const data = await response.json();
      const csrfToken = response.headers.get(CSRF_HEADER);
      if (!csrfToken || typeof data?.email !== 'string' || !data.email
          || (data.role !== 'adopter' && data.role !== 'shelter')) {
        throw new Error('Invalid session response');
      }
      const signedInUser: SessionUser = { email: data.email, role: data.role };
      if (controller.signal.aborted) return null;
      setSession({ user: signedInUser, csrfToken });
      return signedInUser;
    } finally {
      if (pendingRequest.current === controller) pendingRequest.current = null;
    }
  }, []);

  useEffect(() => {
    void refreshSession().catch(() => {});
    return () => pendingRequest.current?.abort();
  }, [refreshSession]);

  return (
    <AuthSessionContext.Provider value={{
      user: session?.user ?? null,
      csrfToken: session?.csrfToken ?? null,
      refreshSession,
    }}>
      {children}
    </AuthSessionContext.Provider>
  );
}
