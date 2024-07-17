"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
// SESSION
import { useAuthProvider } from "@/context/AuthContext";
export default function Settings() {
  const pathName = usePathname();
  const router = useRouter();
  const { session } = useAuthProvider();
  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [session]);
  return <div>Settings</div>;
}
