"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import { UploadDropzone } from "@/lib/uploadthing"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

const formSchema = z.object({
  title: z.string().min(5).max(100),
  content: z.string().min(20).max(1000),
})

const CreateBlogForm = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const [image, setImage] = useState<string | null>("")
  const [loading, setLoading] = useState(false)
  const [openSuccess, setOpenSuccess] = useState(false)
  const [openError, setOpenError] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  })
  function onSubmit(values: z.infer<typeof formSchema>) {
    const handleSubmit = async () => {
      setLoading(true)
      const response = await fetch(`/api/blog/${session?.user.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: values.title,
          content: values.content,
          image,
        }),
      })
      if (response.ok) {
        router.push("/")
        router.refresh()
      }
    }

    handleSubmit()
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto flex h-full max-w-7xl flex-col justify-center space-y-8 px-6 py-4"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-bold">Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormDescription>
                  This is the title of the blog.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-bold">Content</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Type your content here."
                    {...field}
                    rows={10}
                  />
                </FormControl>
                <FormDescription>
                  This is the content of the blog.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <FormLabel className="text-xl font-bold">Image</FormLabel>
            <UploadDropzone
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                setImage(res[0].url)
                setOpenSuccess(true)
              }}
              onUploadError={(error: Error) => {
                setOpenError(true)
              }}
            />
          </div>
          <Button type="submit" disabled={loading} className="flex gap-3">
            {loading && (
              <svg
                aria-hidden="true"
                className="inline h-6 w-6 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            )}
            {loading ? "Loading" : "Submit"}
          </Button>
        </form>
      </Form>
      {openSuccess && (
        <AlertDialog open={openSuccess} onOpenChange={setOpenSuccess}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Image uploaded successfully</AlertDialogTitle>
              <AlertDialogDescription>
                Your image has been uploaded successfully.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Close</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      {openError && (
        <AlertDialog open={openError} onOpenChange={setOpenError}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Image upload failed</AlertDialogTitle>
              <AlertDialogDescription>
                Your image failed to upload. Please try again.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction className="bg-red-700 hover:bg-red-500">
                Close
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  )
}

export default CreateBlogForm
