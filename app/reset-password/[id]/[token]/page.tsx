import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import ResetPasswordForm from "@/components/forms/ResetPasswordForm";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Reset password page for Bloggy.",
};

const ResetPasswordPage = async ({
  params: { id, token },
}: {
  params: { id: string; token: string };
}) => {
  return (
    <div className="flex justify-center items-center flex-col h-full ">
      <Card className="w-[350px]  md:w-[550px] shadow-lg h-fit">
        <CardHeader className="flex gap-2">
          <CardTitle className="text-center">Reset your password</CardTitle>
          <CardDescription className="text-center ">
            Please enter your new password below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResetPasswordForm id={id} token={token} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;
