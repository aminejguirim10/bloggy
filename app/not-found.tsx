import RouteAvailabe from "@/components/layout/RouteAvailabe";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { CgProfile } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
import { GiFiles } from "react-icons/gi";
import { MdCreateNewFolder } from "react-icons/md";
import { IoMailOutline } from "react-icons/io5";
const mobileNavLinks = [
  {
    name: "Home",
    link: "/",
    icon: FaHome,
    description: "Go to home page",
  },
  {
    name: "Myblogs",
    link: "/my-blogs",
    icon: GiFiles,
    description: "View all your blogs",
  },
  {
    name: "Create Blog",
    link: "/createblog",
    icon: MdCreateNewFolder,
    description: "Create a new blog",
  },
  {
    name: "Profile",
    link: "/profile",
    icon: CgProfile,
    description: "View your profile",
  },
  {
    name: "Contact",
    link: "/contact",
    icon: IoMailOutline,
    description: "Contact us",
  },
];
const NotFound = () => {
  return (
    <div className="flex h-full  justify-center items-center">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-4 text-center">
          <div className="font-bold  bg-gradient-to-r from-blue-800 to-indigo-900 inline-block text-transparent bg-clip-text">
            404
          </div>
          <div className="font-bold text-2xl md:text-5xl">
            This page does not exist
          </div>
          <div className="text-gray-500 md:text-lg">
            Sorry, we couldn’t find the page you’re looking for.
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {mobileNavLinks.map((link, i) => (
            <div className="flex flex-col gap-6" key={i}>
              <RouteAvailabe
                description={link.description}
                name={link.name}
                icon={link.icon}
                link={link.link}
              />
              <Separator />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotFound;
