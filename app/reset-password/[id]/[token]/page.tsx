import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import ResetPasswordForm from "@/components/forms/ResetPasswordForm"

import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Reset password page for Bloggy.",
}

const ResetPasswordPage = async ({
  params: { id, token },
}: {
  params: { id: string; token: string }
}) => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Card className="h-fit w-[350px] shadow-lg md:w-[550px]">
        <CardHeader className="flex gap-2">
          <CardTitle className="text-center">Reset your password</CardTitle>
          <CardDescription className="text-center">
            Please enter your new password below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResetPasswordForm id={id} token={token} />
        </CardContent>
      </Card>
    </div>
  )
}

export default ResetPasswordPage
