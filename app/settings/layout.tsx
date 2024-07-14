"use client";
import { useEffect, ReactNode } from "react";
import Link from "next/link";
import { usePathname, redirect } from "next/navigation";
// SESSION
import { useAuthProvider } from "@/context/AuthContext ";
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
    <div className="flex flex-col pt-6 h-full">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Avatar
          size={60}
          letterSize={30}
          image={session?.img}
          session={session}
          styles={{ borderWidth: 2, borderColor: "#2c3e50" }}
        />
        <span className="text-3xl text-[#2c3e50] font-bold">
          {session?.name}
        </span>
      </div>

      <div className="flex navigation-container items-center w-full gap-4 p-2">
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
      <div className="pt-2 px-2 flex-grow">{children}</div>
    </div>
  );
}
