import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import type { IUser } from "@/types/user";

interface Props {
  children: ReactNode;
}

interface SessionState {
  session: IUser | null;
  setSessionState: (session: IUser | null) => void;
  removeSession: () => void;
}

const defaultState: SessionState = {
  session: null,
  setSessionState: (userSession: IUser | null) => {}, // Placeholder, should match actual implementation
  removeSession: () => {},
};

export const AuthContext = createContext<SessionState>(defaultState);

export function AuthProvider({ children }: Props) {
  const [session, setSession] = useState<IUser | null>(() => {
    const storedSession = localStorage.getItem("session");
    return storedSession ? JSON.parse(storedSession) : null;
  });

  const setSessionState = (userSession: IUser | null) => {
    if (userSession) {
      localStorage.setItem("session", JSON.stringify(userSession));
      setSession(userSession);
    } else {
      localStorage.removeItem("session");
      setSession(null);
    }
  };

  const removeSession = () => {
    localStorage.removeItem("session");
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        setSessionState,
        removeSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthProvider = () => useContext(AuthContext);
