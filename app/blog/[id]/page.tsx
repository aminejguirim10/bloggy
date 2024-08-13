import { BlogT } from "@/app/page"
import CopyTextBtn from "@/components/buttons/CopyTextBtn"
import AddCommentForm from "@/components/forms/AddCommentForm"
import Comment from "@/components/layout/Comment"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { authOptions } from "@/lib/auth"
import { Metadata } from "next"
import { getServerSession } from "next-auth"
import Image from "next/image"
import { notFound } from "next/navigation"
import React from "react"

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string }
}): Promise<Metadata> {
  const currentBlog: BlogT = await getBlog(id)
  return {
    title: currentBlog.title,
    description: currentBlog.content,
  }
}

export type CommentT = {
  id: string
  content: string
  createdAt: string
  author: {
    id: string
    name: string
    email: string
    image: string
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
const getComents = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/blog/${id}/comment`,
      {
        cache: "no-store",
      }
    )
    if (res.ok) {
      const blog: CommentT[] = await res.json()
      return blog
    }
    return null
  } catch (error) {
    console.log(error)
  }
}
const BlogPage = async ({ params: { id } }: { params: { id: string } }) => {
  const currentBlog: BlogT = await getBlog(id)
  if (!currentBlog) return notFound()
  const comments = await getComents(id)
  const session = await getServerSession(authOptions)

  return (
    <div className="mx-auto max-w-7xl px-6 py-4">
      <div className="gap-3s flex flex-col md:flex-row">
        <div className="flex w-full items-center justify-center md:w-1/2">
          <Image
            src={
              currentBlog.image || "https://placehold.co/300x250?text=Bloggy"
            }
            width={300}
            height={300}
            alt={currentBlog.title}
            className="rounded-lg"
          />
        </div>
        <div className="w-full md:w-1/2">
          <div className="mt-4 inline-block bg-gradient-to-r from-blue-800 to-indigo-900 bg-clip-text font-bold text-transparent">
            {currentBlog.title}
          </div>
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 tracking-tighter text-gray-500">
              {currentBlog.content}
            </div>
            <div className="pt-[4px]">
              <CopyTextBtn content={currentBlog.content} />
            </div>
          </div>
        </div>
      </div>
      {session && <AddCommentForm blogId={id} userId={session.user.id} />}
      <div className="mt-10">
        <div className="text-xl font-bold text-gray-900">Comments section</div>
        <div className="mt-2 flex flex-col gap-3">
          {comments?.length === 0 ? (
            <div className="font-mono text-gray-400">No comments</div>
          ) : (
            comments?.map((comment) => (
              <Comment comment={comment} key={comment.id} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default BlogPage
