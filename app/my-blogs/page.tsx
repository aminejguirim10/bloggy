import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import PostCard from "@/components/layout/PostCard";
import { Suspense } from "react";
import CardSkeleton from "@/components/layout/CardSkeleton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Blogs",
  description: "My Blogs Page.",
};

type BlogT = {
  id: string;
  title: string;
  content: string;
  image: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
};

const getBlogs = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/user/${id}`, {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};

const MyBlogsPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/signin");
  }
  const blogs: BlogT[] = await getBlogs(session.user.id);

  return (
    <div className="max-w-7xl mx-auto py-4 px-6 flex flex-col gap-4">
      {blogs && blogs.length > 0 ? (
        <div className="flex justify-center items-center mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {blogs.map((blog) => (
              <Suspense fallback={<CardSkeleton />} key={blog.id}>
                <PostCard
                  key={blog.id}
                  id={blog.id}
                  authorId={blog.authorId}
                  content={blog.content}
                  image={blog.image}
                  title={blog.title}
                />
              </Suspense>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="text-xl font-bold">No Blogs Available</div>
          <div className="text-gray-600">
            If you want to create a blog ,{" "}
            <span>
              <Link
                href={"/createblog"}
                className="text-blue-300 underline underline-offset-2"
              >
                Go now
              </Link>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBlogsPage;
