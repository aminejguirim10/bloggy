import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { GiHamburgerMenu } from "react-icons/gi"
import Link from "next/link"
import { FaHome } from "react-icons/fa"
import { MdCreateNewFolder } from "react-icons/md"
import { GiFiles } from "react-icons/gi"
import { CgProfile } from "react-icons/cg"
import { IoMailOutline } from "react-icons/io5"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { GoSignIn } from "react-icons/go"
import SignOutMobileBtn from "../buttons/SignOutMobileBtn"
const mobileNavLinks = [
  {
    name: "Home",
    link: "/",
    icon: <FaHome className="h-[20px] w-[25px] text-red-500" />,
    color: "red",
  },
  {
    name: "Myblogs",
    link: "/my-blogs",
    icon: <GiFiles className="h-[20px] w-[25px] text-green-500" />,
    color: "green",
  },
  {
    name: "Create Blog",
    link: "/createblog",
    icon: <MdCreateNewFolder className="h-[20px] w-[25px] text-blue-500" />,
    color: "blue",
  },
  {
    name: "Profile",
    link: "/profile",
    icon: <CgProfile className="h-[20px] w-[25px] text-indigo-500" />,
    color: "indigo",
  },
  {
    name: "Contact",
    link: "/contact",
    icon: <IoMailOutline className="h-[20px] w-[25px] text-orange-500" />,
    color: "orange",
  },
]
const MobileNav = async () => {
  const session = await getServerSession(authOptions)
  return (
    <Sheet>
      <SheetTrigger>
        <GiHamburgerMenu className="h-[20px] w-[25px]" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="inline-block bg-gradient-to-r from-blue-800 to-indigo-900 bg-clip-text text-transparent">
            Bloggy
          </SheetTitle>
        </SheetHeader>
        <div className="mt-14 flex flex-col gap-4">
          {mobileNavLinks.map((link, i) => (
            <SheetClose asChild key={i}>
              <Link
                href={link.link}
                className="px-2 py-1 hover:cursor-pointer hover:rounded-md hover:bg-zinc-100"
              >
                <div className="flex items-center gap-4">
                  {link.icon}
                  <div className={`text-${link.color}-500`}>{link.name}</div>
                </div>
              </Link>
            </SheetClose>
          ))}
          {session ? (
            <SheetClose asChild>
              <SignOutMobileBtn />
            </SheetClose>
          ) : (
            <SheetClose asChild>
              <Link href={"/signin"}>
                <div className="ml-1 flex items-center gap-4 px-2 py-1 hover:cursor-pointer hover:rounded-md hover:bg-zinc-100">
                  <GoSignIn />
                  <div className="ml-1">Sign in</div>
                </div>
              </Link>
            </SheetClose>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav
