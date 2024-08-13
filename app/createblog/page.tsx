import CreateBlogForm from "@/components/forms/CreateBlogForm"
import React from "react"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import CreateBlogServer from "@/components/forms/CreateBlogServer"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Create Blog",
  description: "Create a new blog post.",
}

const CreateBlog = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    return redirect("/signin")
  }
  return <CreateBlogForm />
}

export default CreateBlog
