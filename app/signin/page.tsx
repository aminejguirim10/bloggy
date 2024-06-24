import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Link from "next/link";
import SignInForm from "@/components/forms/SignInForm";
import GgBtn from "@/components/buttons/GgBtn";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Separator } from "@/components/ui/separator";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in page for Bloggy.",
};

const SignIn = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }
  return (
    <div className="flex justify-center items-center flex-col h-full ">
      <Card className="w-[350px]  md:w-[550px] shadow-lg h-fit">
        <CardHeader className="flex gap-2">
          <CardTitle className="text-center">Sign In</CardTitle>
          <CardDescription>
            Choose how to sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <SignInForm />
            <div className="flex justify-between items-center gap-5">
              <Separator className="flex-1" />
              <div className="flex font-bold">OR</div>
              <Separator className="flex-1" />
            </div>
            <GgBtn text="Sign In" />
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Link
            href={"/signup"}
            className="text-sm hover:underline text-blue-400 hover:opacity-50"
          >
            You don't have account? register now
          </Link>
          <Link
            href={"/forgot-password"}
            className="text-sm hover:underline text-blue-400 hover:opacity-50"
          >
            Forgot password? reset it
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignIn;
