// import React from 'react'

import { BsBellFill, BsHouseFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import SidebarLogo from "./SidebarLogo";
import { SidebarItem } from "./SidebarItem";
import { BiLogOut } from "react-icons/bi";
import { SidebarTweetButton } from "./SidebarTweetButton";
// import userCurrentUser from "@/hooks/useCurrentUser";
import { signOut, useSession } from "next-auth/react";
// import { useRouter } from "next/router";
// import { MdOutlinePostAdd } from "react-icons/md";

export const Sidebar = () => {
  // const { data: currentUser } = userCurrentUser();
  const session = useSession();
  // console.log(session);

  const is_logged = session?.status === "authenticated";
  const items = [
    // { label: "Home", href: "/", icon: BsHouseFill },
    {
      label: "Home",
      href: "/",
      icon: BsHouseFill,
      // is_logged: true,
    },
    {
      label: "Profile",
      href: "/profile",
      icon: FaUser,
      // is_logged: true,
    },
  ];
  // const router = useRouter();
  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          <SidebarLogo />
          {is_logged &&
            items.map((item) => (
              <SidebarItem
                key={item.href}
                href={item.href}
                label={item.label}
                icon={item.icon}
                // auth={item.is_logged}
              />
            ))}
          {is_logged && (
            <SidebarItem
              onClick={() => {
                signOut();
                // router.push("login-page");
              }}
              icon={BiLogOut}
              label="Logout"
            />
          )}
          <SidebarTweetButton />
        </div>
      </div>
    </div>
  );
};
