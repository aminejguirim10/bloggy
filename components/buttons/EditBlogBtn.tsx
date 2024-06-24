"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { MdEditSquare } from "react-icons/md";

const EditBlogBtn = ({ BlogId }: { BlogId: string }) => {
  const router = useRouter();
  return (
    <div className="px-1 py-1 rounded-full hover:bg-blue-200">
      <MdEditSquare
        className="text-blue-900 hover:cursor-pointer h-5 w-5"
        onClick={() => {
          router.push(`/edit-blog/${BlogId}`);
        }}
      />
    </div>
  );
};

export default EditBlogBtn;
