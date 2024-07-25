"use client";
import { useEffect, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, redirect } from "next/navigation";
// SESSION
import { useAuthProvider } from "@/context/AuthContext";
// COMPONENTS
import { Avatar } from "@/components/Avatar/Avatar";
// STYLES
import "@/styles/pages/profile.css";
export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const pathName = usePathname();
  const { session } = useAuthProvider();
  //
  const navigation = [
    { name: "Account", route: "/settings/account" },
    { name: "Profile", route: "/settings/profile" },
  ];
  useEffect(() => {
    if (!session) {
      redirect("/");
    }
  }, [session]);

  return (
    <div className="flex flex-col pt-6 h-full w-full">
      {/* Header */}
      <div className="relative">
        {session?.banner && (
          <div className="w-full">
            <img
              src={session?.banner as string ?? ""}
              alt="banner"
              style={{
                width: "100%",
                height: 100,
                borderRadius: 10,
              }}
            />
          </div>
        )}
        <div
          className="flex items-center gap-2 mx-auto w-full"
          style={
            session?.banner
              ? {
                  position: "absolute",
                  top: 80,
                }
              : undefined
          }
        >
          <Avatar
            size={session?.banner ? 80 : 65}
            letterSize={30}
            image={session?.img}
            session={session}
            styles={{
              borderWidth: session?.banner ? 4 : 3,
              borderColor: session?.banner ? "#fff" : "#2c3e50",
            }}
          />
          <span className="text-3xl text-[#2c3e50] font-bold">
            {session?.name}
          </span>
        </div>
      </div>
      <div
        className="flex navigation-container items-center w-full gap-4 p-2"
        style={{ marginTop: session?.banner ? "55px" : 0 }}
      >
        {navigation.map((nav, index) => {
          return (
            <Link
              key={index}
              href={nav.route}
              className="text-md font-semibold navigation-text rounded-full"
            >
              <span className="text-[#2c3e50]">{nav.name}</span>
              {nav.route === pathName ? (
                <div className="w-full rounded-full h-1  bg-[#16a085]" />
              ) : (
                ""
              )}
            </Link>
          );
        })}
      </div>
      <div className="pt-2 flex-grow">{children}</div>
    </div>
  );
}
