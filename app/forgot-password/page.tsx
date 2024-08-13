import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { IoArrowBackOutline } from "react-icons/io5"
import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm"
import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Forgot password page for Bloggy.",
}

const ForgotPasswordPage = async () => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Card className="h-fit w-[350px] shadow-lg md:w-[550px]">
        <CardHeader className="flex gap-2">
          <CardTitle className="text-center">Forgot Password</CardTitle>
          <CardDescription className="text-center">
            Enter the email address associated with your account and we will
            send you a link to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ForgotPasswordForm />
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link
            href={"/signin"}
            className="flex items-center gap-0.5 text-sm text-blue-400 hover:underline hover:opacity-50"
          >
            <IoArrowBackOutline />
            Go Back
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ForgotPasswordPage
