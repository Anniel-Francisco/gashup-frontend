"use client";
import "@/styles/home.css";
import { useAuth } from "../hooks/useAuth";
export default function Home() {
  const [user, userState, setLogin, setLogout, setUserData, removeUserData] =
    useAuth();

  return (
    <>
      <h1>Home</h1>
    </>
  );
}
