"use client"
import React from "react"
import { GoSignIn } from "react-icons/go"
import { signOut } from "next-auth/react"
const SignOutMobileBtn = () => {
  return (
    <div
      className="ml-1 flex items-center gap-4 px-2 py-1 hover:cursor-pointer hover:rounded-md hover:bg-zinc-100"
      onClick={() => signOut()}
    >
      <GoSignIn />
      <div className="ml-1">Sign Out</div>
    </div>
  )
}

export default SignOutMobileBtn
