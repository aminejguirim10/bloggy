import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import ProfileForm from "@/components/forms/ProfileForm"
import prisma from "@/lib/db"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Profile",
  description: "Profile Page.",
}

const getUser = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    })
    return user
  } catch (error) {
    console.log(error)
  }
}
const Profile = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect("/signin")
  }
  const user = await getUser(session.user.email!)
  return <ProfileForm user={user} />
}

export default Profile
