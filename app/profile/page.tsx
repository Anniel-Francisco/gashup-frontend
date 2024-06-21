"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// SESSION
import { useAuthProvider } from "@/context/AuthContext ";
// COMPONENTS
import { Avatar } from "@/components/Avatar/Avatar";
// STYLES
import "@/styles/pages/profile.css";

export default function Profile() {
  const router = useRouter();
  const { session } = useAuthProvider();
  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [session]);
  return (
    <div>
      <div className="header relative flex flex-row items-center pl-2 gap-2">
        <div
          style={{
            position: "absolute",
            left: "40%",
            top: "50%",
          }}
        >
          <Avatar
            size={100}
            image={session?.img}
            session={session}
            styles={{
              borderWidth: 4,
              borderColor: "#fff",
            }}
          />
          <span className="text-4xl font-semibold">{session?.name}</span>
        </div>
      </div>
    </div>
  );
}
