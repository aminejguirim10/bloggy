"use client";
import React from "react";
import { GoSignIn } from "react-icons/go";
import { signOut } from "next-auth/react";
const SignOutMobileBtn = () => {
  return (
    <div
      className="flex gap-4 items-center ml-1 px-2 py-1  hover:cursor-pointer hover:bg-zinc-100  hover:rounded-md"
      onClick={() => signOut()}
    >
      <GoSignIn />
      <div className="ml-1">Sign Out</div>
    </div>
  );
};

export default SignOutMobileBtn;
