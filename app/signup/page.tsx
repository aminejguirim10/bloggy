import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import GgBtn from "@/components/buttons/GgBtn"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import SignUpForm from "@/components/forms/SingUpForm"
import { Separator } from "@/components/ui/separator"

import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Sign up page for Bloggy.",
}

const SignUp = async () => {
  const session = await getServerSession(authOptions)
  if (session) {
    return redirect("/")
  }
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Card className="h-fit w-[350px] shadow-lg md:w-[550px]">
        <CardHeader className="flex gap-2">
          <CardTitle className="text-center">Sign Up</CardTitle>
          <CardDescription>
            Choose how to sign up to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <SignUpForm />
            <div className="flex items-center justify-between">
              <Separator className="w-[130px] md:w-[220px]" />
              <div className="flex font-bold">OR</div>
              <Separator className="w-[130px] md:w-[220px]" />
            </div>
            <GgBtn text="Sign Up" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link
            href={"/signin"}
            className="text-sm text-blue-400 hover:underline hover:opacity-50"
          >
            You already have an account? Go and sign in
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

export default SignUp
