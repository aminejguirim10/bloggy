import { CommentT } from "@/app/blog/[id]/page"
import Image from "next/image"
import React from "react"
import { format, differenceInSeconds } from "date-fns"

const Comment = ({ comment }: { comment: CommentT }) => {
  const TimeDifference = () => {
    const commentDate = new Date(comment.createdAt)
    const diff = differenceInSeconds(Date.now(), commentDate)
    if (diff < 60) return `${diff} seconds ago`
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`
    if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`
    if (diff < 2419200) return `${Math.floor(diff / 604800)} weeks ago`
    if (diff < 29030400) return `${Math.floor(diff / 2419200)} months ago`
    return `${Math.floor(diff / 29030400)} years ago`
  }

  return (
    <div className="hover:duration-30000 flex max-w-md flex-col gap-1 rounded-xl border px-4 py-2 hover:border-blue-500 hover:transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div>
            <Image
              src={comment.author.image ?? ""}
              width={25}
              height={25}
              className="rounded-full"
              alt={comment.author.name}
            />
          </div>
          <div>
            <div className="text-xs font-bold">{comment.author.name}</div>
            <div className="text-xs text-gray-500">{comment.author.email}</div>
          </div>
        </div>
        <div className="text-xs font-light text-zinc-600">
          {TimeDifference()}
        </div>
      </div>
      <div className="px-2 font-serif">{comment.content}</div>
    </div>
  )
}

export default Comment
