import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import Image from "next/image"
import EditBlogBtn from "../buttons/EditBlogBtn"
import DeleteBlogBtn from "../buttons/DeleteBlogBtn"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getFallback } from "@/lib/utils"
import Link from "next/link"

const getAvatar = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/avatar/${id}`)
    if (res.ok) {
      const avatar = await res.json()
      return avatar
    }
    return null
  } catch (error) {
    console.log(error)
  }
}

interface PostCardProps {
  id: string
  title: string
  content: string
  image: string
  authorId: string
}

const PostCard = async ({
  id,
  title,
  content,
  image,
  authorId,
}: PostCardProps) => {
  const session = await getServerSession(authOptions)
  const avatar = await getAvatar(authorId)
  return (
    <div className="flex h-[465px] w-[300px] flex-col gap-4 rounded-xl shadow-2xl transition-all duration-500 hover:scale-105">
      <Link href={`/blog/${id}`}>
        <Image
          src={image || "https://placehold.co/300x200?text=Bloggy"}
          alt="image"
          width={300}
          height={200}
          className="h-[200px] rounded-t-xl object-center"
        />
      </Link>
      <div className="flex items-center gap-3 px-5">
        <Avatar className="h-[30px] w-[30px]">
          <AvatarImage src={avatar.image ? avatar.image : ""} alt="Avatar" />
          <AvatarFallback className="text-xs">
            {getFallback(avatar.name!)}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="text-xs text-violet-900">{avatar.name}</div>
          <div className="text-xs text-gray-500">{avatar.email}</div>
        </div>
      </div>
      <div className="mb-4 flex flex-col gap-1 px-5">
        <div className="flex items-center justify-between">
          <h2 className="flex-1 overflow-hidden font-mono font-bold text-red-700">
            {title}
          </h2>

          {session?.user.id === authorId && (
            <div className="flex gap-2 self-start">
              <EditBlogBtn BlogId={id} />
              <DeleteBlogBtn BlogId={id} />
            </div>
          )}
        </div>
        <p className="line-clamp-[8] text-sm font-light text-gray-500">
          {content}
        </p>
      </div>
    </div>
  )
}

export default PostCard
