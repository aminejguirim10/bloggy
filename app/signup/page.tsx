import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import GgBtn from "@/components/buttons/GgBtn";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import SignUpForm from "@/components/forms/SingUpForm";
import { Separator } from "@/components/ui/separator";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Sign up page for Bloggy.",
};

const SignUp = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    return redirect("/");
  }
  return (
    <div className=" flex justify-center items-center flex-col h-full ">
      <Card className="w-[350px]  md:w-[550px] shadow-lg h-fit">
        <CardHeader className="flex gap-2">
          <CardTitle className="text-center">Sign Up</CardTitle>
          <CardDescription>
            Choose how to sign up to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <SignUpForm />
            <div className="flex justify-between items-center">
              <Separator className="md:w-[220px] w-[130px]" />
              <div className="flex font-bold">OR</div>
              <Separator className="md:w-[220px] w-[130px]" />
            </div>
            <GgBtn text="Sign Up" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-center ">
          <Link
            href={"/signin"}
            className="text-sm hover:underline text-blue-400 hover:opacity-50"
          >
            You already have an account? Go and sign in
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
