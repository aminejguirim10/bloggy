import { CommentT } from "@/app/blog/[id]/page";
import Image from "next/image";
import React from "react";
import { format, differenceInSeconds } from "date-fns";

const Comment = ({ comment }: { comment: CommentT }) => {
  const TimeDifference = () => {
    const commentDate = new Date(comment.createdAt);
    const diff = differenceInSeconds(Date.now(), commentDate);
    if (diff < 60) return `${diff} seconds ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`;
    if (diff < 2419200) return `${Math.floor(diff / 604800)} weeks ago`;
    if (diff < 29030400) return `${Math.floor(diff / 2419200)} months ago`;
    return `${Math.floor(diff / 29030400)} years ago`;
  };

  return (
    <div className="flex flex-col gap-1 px-4  py-2 border rounded-xl max-w-md hover:border-blue-500 hover:transition-colors hover:duration-30000">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
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
            <div className="font-bold text-xs ">{comment.author.name}</div>
            <div className="text-gray-500 text-xs ">{comment.author.email}</div>
          </div>
        </div>
        <div className="text-xs font-light text-zinc-600">
          {TimeDifference()}
        </div>
      </div>
      <div className="font-serif px-2">{comment.content}</div>
    </div>
  );
};

export default Comment;
