import React from "react"
import { IconType } from "react-icons/lib"
import Link from "next/link"
import { MdNavigateNext } from "react-icons/md"

interface RouteAvailabeProps {
  name: string
  link: string
  icon: IconType
  description: string
}

const RouteAvailabe = ({
  name,
  link,
  icon: Icon,
  description,
}: RouteAvailabeProps) => {
  return (
    <a
      className="flex items-center justify-between gap-6 hover:cursor-pointer"
      href={link}
    >
      <div className="flex items-center justify-between rounded-lg border px-2 py-2 hover:bg-slate-100">
        <Icon className="h-6 w-6 text-[#075ce4]" />
      </div>
      <div className="mt-4 flex flex-1 flex-col gap-2">
        <div className="text-sm font-semibold">{name}</div>
        <div className="text-sm text-gray-400">{description}</div>
      </div>

      <MdNavigateNext className="h-6 w-6 text-gray-400" />
    </a>
  )
}

export default RouteAvailabe
