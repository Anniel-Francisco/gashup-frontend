import { IUser } from "@/types/user";

interface SessionState {
  session: IUser | null;
  getSession: () => IUser | null;
  setSession: (session: IUser | null) => void;
  removeSession: () => void;
  clearStorage: () => void;
}

const useSession = (): SessionState => {
  let session: IUser | null = null;

  return {
    session,
    getSession: () => {
      if (!session) {
        let storedSession = localStorage.getItem("session");
        if (storedSession) {
          session = JSON.parse(storedSession);
        }
      }
      return session;
    },
    setSession: (userSession: IUser | null) => {
      if (userSession) {
        session = userSession;
        localStorage.setItem("session", JSON.stringify(userSession));
      }
    },
    removeSession: () => {
      session = null;
      localStorage.removeItem("session");
    },
    clearStorage: () => {
      session = null;
      localStorage.clear();
    },
  };
};

export default useSession;
