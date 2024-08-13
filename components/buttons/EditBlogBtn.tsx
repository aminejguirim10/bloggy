"use client"
import { useRouter } from "next/navigation"
import React from "react"
import { MdEditSquare } from "react-icons/md"

const EditBlogBtn = ({ BlogId }: { BlogId: string }) => {
  const router = useRouter()
  return (
    <div className="rounded-full px-1 py-1 hover:bg-blue-200">
      <MdEditSquare
        className="h-5 w-5 text-blue-900 hover:cursor-pointer"
        onClick={() => {
          router.push(`/edit-blog/${BlogId}`)
        }}
      />
    </div>
  )
}

export default EditBlogBtn
