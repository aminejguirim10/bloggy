"use server"
import { revalidatePath } from "next/cache"
import prisma from "./db"
import { redirect } from "next/navigation"
export const createBlog = async ({
  authorId,
  content,
  image,
  title,
}: {
  title: string
  content: string
  image: string
  authorId: string
}) => {
  /*
  we can also opt the way of having formData as formData type and we get each field with his name in the input.
  authorId is a field that can not be shown to the user so it is hidden with the type hidden in the input


  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const image = formData.get("photo") as string;
  const authorId = formData.get("authorId") as string; */

  try {
    const blog = await prisma.blog.create({
      data: {
        content,
        title,
        image,
        authorId,
      },
    })
  } catch (error: any) {
    console.log(error.message)
  }
  revalidatePath("/")
  redirect("/")
}
