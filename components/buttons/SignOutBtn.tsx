"use client";
import React from "react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

const SignOutBtn = () => {
  return (
    <div className="font-bold text-lg hidden md:block">
      <Button
        className="text-xs"
        size={"sm"}
        onClick={() => {
          signOut();
        }}
      >
        Sign out
      </Button>
    </div>
  );
};

export default SignOutBtn;
