import EditBlogForm from "@/components/forms/EditBlogForm"
import React from "react"
import { getServerSession } from "next-auth"
import { notFound, redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { Metadata } from "next"
import { BlogT } from "@/app/page"

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string }
}): Promise<Metadata> {
  const currentBlog: BlogT = await getBlog(id)
  // if the method is not with the fetch api it must wrap it in cache function from react so that the function will
  // render only one time in the metadata and get in the page not being called twice one on the metadata and the other on the page
  return {
    title: currentBlog.title,
    description: currentBlog.content,
  }
}

const getBlog = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/blog/${id}`, {
      cache: "no-store",
    })
    if (res.ok) {
      const blog = await res.json()
      return blog
    }
    return null
  } catch (error) {
    console.log(error)
  }
}

const EditBlogPage = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect("/signin")
  }
  const currentBlog = await getBlog(id)
  if (!currentBlog) return notFound()

  if (currentBlog?.authorId !== session.user.id) {
    redirect("/")
  }

  return <EditBlogForm blog={currentBlog} />
}

export default EditBlogPage
