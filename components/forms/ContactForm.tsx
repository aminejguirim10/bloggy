"use client"
import React from "react"

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
import { set } from "date-fns"
import { toast } from "../ui/use-toast"
const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must contain at least 2 characters" })
    .max(50, { message: "First name must contain at most 50 characters" }),
  lastName: z
    .string()
    .min(2, { message: "Last name must contain at least 2 characters" })
    .max(50, { message: "Last name must contain at most 50 characters" }),
  email: z.string().email({ message: "Invalid email" }),
  message: z
    .string()
    .min(10, { message: "Message must contain at least 10 characters" })
    .max(500, { message: "Message must contain at most 500 characters" }),
  subject: z
    .string()
    .min(5, { message: "Subject must contain at least 5 characters" })
    .max(100, { message: "Subject must contain at most 50 characters" }),
})

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
      subject: "",
    },
  })
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      const res = await fetch("/api/sendEmail", {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          message: values.message,
          subject: values.subject,
        }),
      })
      if (res.ok) {
        toast({
          title: "Email sent",
          description: "Your email has been sent successfully",
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitting(false)
      form.reset()
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4"
      >
        <div className="my-10 inline-block bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-center text-2xl font-bold text-transparent sm:text-3xl">
          Contact Us
        </div>
        <div className="flex flex-col justify-between gap-4 sm:flex-row">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription>
                  This is your first name display.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription>
                  This is your last name display.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>This is your email display.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>This is your subject display.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder="" {...field} rows={3} />
              </FormControl>
              <FormDescription>This is your message display.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="my-5 flex w-full gap-3"
          disabled={isSubmitting}
        >
          {isSubmitting && (
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
          {isSubmitting ? "Loading" : "Submit"}
        </Button>
      </form>
    </Form>
  )
}

export default ContactForm
