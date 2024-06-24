import PaginationControls from "@/components/buttons/PaginationControls";
import CardSkeleton from "@/components/layout/CardSkeleton";
import PostCard from "@/components/layout/PostCard";
import { Suspense } from "react";

export type BlogT = {
  id: string;
  title: string;
  content: string;
  image: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
};

const getBlogs = async () => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/blog`, {
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

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "6";

  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);

  const blogs: BlogT[] = await getBlogs();
  const entries = blogs.slice(start, end);

  return (
    <div className="max-w-7xl mx-auto py-4 px-6 flex flex-col gap-4  ">
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <h1 className="text-4xl font-bold mt-6 leading-[45px]">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-blue-800 to-indigo-900 inline-block text-transparent bg-clip-text">
            Bloggy
          </span>
        </h1>
        <p className="text-lg">The best place to share your knowledge</p>
      </div>
      <div className=" flex flex-col justify-center items-center gap-10 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-16">
          {blogs && blogs?.length > 0 ? (
            entries.map((blog) => (
              <Suspense fallback={<CardSkeleton />} key={blog.id}>
                <PostCard
                  authorId={blog.authorId}
                  title={blog.title}
                  content={blog.content}
                  image={blog.image}
                  id={blog.id}
                />
              </Suspense>
            ))
          ) : (
            <div className="text-2xl md:text-4xl font-bold ">
              No Blogs available
            </div>
          )}
        </div>
        {blogs && blogs?.length > 0 && (
          <PaginationControls
            hasNextPage={end < blogs.length}
            hasPrevPage={start > 0}
            length={blogs.length}
          />
        )}
      </div>
    </div>
  );
}
