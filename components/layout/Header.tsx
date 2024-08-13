import React from "react"
import Link from "next/link"
import { getServerSession } from "next-auth"
import SignInBtn from "../buttons/SignInBtn"
import SignOutBtn from "../buttons/SignOutBtn"
import MobileNav from "./MobileNav"
import { cn } from "@/lib/utils"
import { badgeVariants } from "../ui/badge"
import { authOptions } from "@/lib/auth"

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
]

interface HeaderProps extends React.HtmlHTMLAttributes<HTMLDivElement> {}

const Header = async ({ className, ...props }: HeaderProps) => {
  const session = await getServerSession(authOptions)
  return (
    <div
      className={cn(
        "mx-auto mb-6 flex w-full max-w-7xl items-center justify-between gap-2 border-b px-6 py-4",
        className
      )}
      {...props}
    >
      <div className="inline-block bg-gradient-to-r from-blue-800 to-indigo-900 bg-clip-text text-xl font-bold text-transparent">
        <Link href={"/"}>Bloggy</Link>
      </div>
      <div className="hidden gap-6 text-sm font-semibold md:flex">
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
  )
}

export default Header
