import { BlogT } from "@/app/page";
import CopyTextBtn from "@/components/buttons/CopyTextBtn";
import AddCommentForm from "@/components/forms/AddCommentForm";
import Comment from "@/components/layout/Comment";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { authOptions } from "@/lib/auth";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string };
}): Promise<Metadata> {
  const currentBlog: BlogT = await getBlog(id);
  return {
    title: currentBlog.title,
    description: currentBlog.content,
  };
}

export type CommentT = {
  id: string;
  content: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
    email: string;
    image: string;
  };
};

const getBlog = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/blog/${id}`, {
      cache: "no-store",
    });
    if (res.ok) {
      const blog = await res.json();
      return blog;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};
const getComents = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/blog/${id}/comment`,
      {
        cache: "no-store",
      }
    );
    if (res.ok) {
      const blog: CommentT[] = await res.json();
      return blog;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};
const BlogPage = async ({ params: { id } }: { params: { id: string } }) => {
  const currentBlog: BlogT = await getBlog(id);
  if (!currentBlog) return notFound();
  const comments = await getComents(id);
  const session = await getServerSession(authOptions);

  return (
    <div className="max-w-7xl mx-auto py-4 px-6 ">
      <div className="flex flex-col md:flex-row gap-3s">
        <div className=" flex items-center justify-center w-full md:w-1/2 ">
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
        <div className="w-full md:w-1/2 ">
          <div className="font-bold mt-4 bg-gradient-to-r from-blue-800 to-indigo-900 inline-block text-transparent bg-clip-text">
            {currentBlog.title}
          </div>
          <div className="flex justify-between items-start gap-2">
            <div className="tracking-tighter text-gray-500 flex-1">
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
        <div className="font-bold text-gray-900 text-xl">Comments section</div>
        <div className="mt-2 flex flex-col gap-3">
          {comments?.length === 0 ? (
            <div className="text-gray-400 font-mono">No comments</div>
          ) : (
            comments?.map((comment) => (
              <Comment comment={comment} key={comment.id} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
