import React from "react";
import { IconType } from "react-icons/lib";
import Link from "next/link";
import { MdNavigateNext } from "react-icons/md";

interface RouteAvailabeProps {
  name: string;
  link: string;
  icon: IconType;
  description: string;
}

const RouteAvailabe = ({
  name,
  link,
  icon: Icon,
  description,
}: RouteAvailabeProps) => {
  return (
    <a
      className="flex gap-6 justify-between items-center hover:cursor-pointer"
      href={link}
    >
      <div className="flex justify-between items-center px-2 py-2 border rounded-lg hover:bg-slate-100">
        <Icon className="h-6 w-6 text-[#075ce4]" />
      </div>
      <div className="flex flex-col flex-1 gap-2 mt-4">
        <div className="font-semibold text-sm">{name}</div>
        <div className=" text-sm text-gray-400">{description}</div>
      </div>

      <MdNavigateNext className="h-6 w-6 text-gray-400" />
    </a>
  );
};

export default RouteAvailabe;
