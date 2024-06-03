import { useState } from "react";
import { IUser } from "@/types/user";

type UseAuthType = [
  IUser | null,
  boolean,
  () => void,
  () => void,
  (user: IUser) => void,
  () => void
];

export const useAuth = (): UseAuthType => {
  const [user, setUser] = useState<IUser | null>(null);
  const [userState, setUserState] = useState<boolean>(false);

  const setLogin = () => {
    setUserState(true);
    localStorage.setItem("userState", JSON.stringify({ logged: true }));
  };

  const setLogout = () => {
    setUserState(false);
    localStorage.setItem("userState", JSON.stringify({ logged: false }));
  };

  const setUserData = (user: IUser) => {
    setUser({ ...user });
    localStorage.setItem("userData", JSON.stringify({ userData: { ...user } }));
  };
  const removeUserData = () => {
    setUser(null);
    localStorage.removeItem("userData");
  };

  return [
    //states
    user,
    userState,
    //methods
    setLogin,
    setLogout,
    setUserData,
    removeUserData,
  ];
};
