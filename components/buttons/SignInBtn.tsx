"use client"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"

const SignInBtn = () => {
  const router = useRouter()
  return (
    <div className="hidden text-lg font-bold md:block">
      <Button
        className="text-xs"
        size={"sm"}
        onClick={() => {
          router.push("/signin")
        }}
      >
        Sign In
      </Button>
    </div>
  )
}

export default SignInBtn
