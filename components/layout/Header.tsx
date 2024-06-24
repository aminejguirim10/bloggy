import React from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import SignInBtn from "../buttons/SignInBtn";
import SignOutBtn from "../buttons/SignOutBtn";
import MobileNav from "./MobileNav";
import { cn } from "@/lib/utils";
import { badgeVariants } from "../ui/badge";
import { authOptions } from "@/lib/auth";

const navLinks = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Myblogs",
    link: "/my-blogs",
  },
  {
    name: "Create Blog",
    link: "/createblog",
  },
  {
    name: "Profile",
    link: "/profile",
  },
  {
    name: "Contact",
    link: "/contact",
  },
];

interface HeaderProps extends React.HtmlHTMLAttributes<HTMLDivElement> {}

const Header = async ({ className, ...props }: HeaderProps) => {
  const session = await getServerSession(authOptions);
  return (
    <div
      className={cn(
        "w-full border-b max-w-7xl mx-auto py-4 px-6 flex gap-2 items-center justify-between mb-6",
        className
      )}
      {...props}
    >
      <div className="text-xl font-bold  bg-gradient-to-r from-blue-800 to-indigo-900 inline-block text-transparent bg-clip-text">
        <Link href={"/"}>Bloggy</Link>
      </div>
      <div className="hidden md:flex gap-6 text-sm font-semibold ">
        {navLinks.map((link, i) => (
          <Link href={link.link} key={i}>
            {link.name}
          </Link>
        ))}
        {session && session.user.isAdmin && (
          <Link
            href={"/admin-dashboard"}
            className={cn(
              badgeVariants({
                variant: "secondary",
              }),
              "text-blue-900"
            )}
          >
            Admin
          </Link>
        )}
      </div>
      {session ? <SignOutBtn /> : <SignInBtn />}
      <div className="block md:hidden">
        <MobileNav />
      </div>
    </div>
  );
};

export default Header;
