"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const SignInBtn = () => {
  const router = useRouter();
  return (
    <div className="font-bold text-lg hidden md:block">
      <Button
        className="text-xs"
        size={"sm"}
        onClick={() => {
          router.push("/signin");
        }}
      >
        Sign In
      </Button>
    </div>
  );
};

export default SignInBtn;
