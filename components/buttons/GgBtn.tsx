"use client"
import React from "react"
import { Button } from "../ui/button"
import { signIn } from "next-auth/react"
import { FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
const GgBtn = ({ text }: { text: string }) => {
  return (
    <div className="flex flex-col gap-4">
      <Button
        className="flex w-full gap-6"
        variant={"outline"}
        onClick={() => {
          signIn("google")
        }}
      >
        <div className="font-bold">{text} with Google</div>
        <FcGoogle className="h-6 w-6" />
      </Button>
      <Button
        className="flex w-full gap-6"
        variant={"outline"}
        onClick={() => {
          signIn("github")
        }}
      >
        <div className="font-bold">{text} with Github</div>
        <FaGithub className="h-6 w-6" />
      </Button>
    </div>
  )
}

export default GgBtn
