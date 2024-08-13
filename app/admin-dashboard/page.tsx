import { getServerSession } from "next-auth"
import { columns } from "../../components/admin/columns"
import { DataTable } from "../../components/admin/data-table"
import prisma from "@/lib/db"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { BlogT } from "../page"
import BlogLineCharts from "@/components/admin/BlogLineCharts"
import BlogBarChartsMonth from "@/components/admin/BlogBarChartsMonth"
import BlogBarChartsDay from "@/components/admin/BlogBarChartsDay"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard for Bloggy.",
}

export async function getData() {
  // Fetch data from backend
  try {
    const res = await prisma.blog.findMany({
      select: {
        id: true,
        title: true,
        createdAt: true,
        author: {
          select: {
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })
    return res
  } catch (error) {
    console.log(error)
  }
}

const getBlogs = async () => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/blog`, {
      cache: "no-store",
    })
    if (res.ok) {
      const data = await res.json()

      return data
    }
    return null
  } catch (error) {
    console.log(error)
  }
}

//all blogs per day
const getBlogCountsByDays = (blogs: BlogT[]) => {
  const blogCounts = Array(7).fill(0)

  blogs.forEach((blog) => {
    const createdAt = new Date(blog.createdAt)
    const dayOfWeek = createdAt.getDay()

    blogCounts[dayOfWeek]++
  })

  return blogCounts
}

//blogs created in the last 7 days
const getBlogCountsByDayOfWeek = (blogs: BlogT[]) => {
  const blogCounts = Array(7).fill(0)
  const currentDate = new Date()
  const startOfWeek = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() - currentDate.getDay()
  )

  blogs.forEach((blog) => {
    const createdAt = new Date(blog.createdAt)

    if (createdAt >= startOfWeek) {
      const dayOfWeek = createdAt.getDay()
      blogCounts[dayOfWeek]++
    }
  })

  return blogCounts
}

const getBlogCountsByMonths = (blogs: BlogT[]) => {
  const blogCounts = Array(12).fill(0)

  blogs.forEach((blog) => {
    const createdAt = new Date(blog.createdAt)
    const month = createdAt.getMonth()

    blogCounts[month]++
  })

  return blogCounts
}

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/signin")
  if (!session.user.isAdmin) redirect("/")
  const data = await getData()
  const dataTable = data?.map((d) => ({
    ...d,
    email: d.author.email,
    createdAt: new Date(d.createdAt),
  }))
  const blogs: BlogT[] = await getBlogs()
  const BlogsPerDays: Number[] = getBlogCountsByDays(blogs)
  const blogPerDaysOfWeek: Number[] = getBlogCountsByDayOfWeek(blogs)
  const blogPerMonth: Number[] = getBlogCountsByMonths(blogs)
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4">
      <div className="mt-8 text-xl font-bold md:text-3xl">Admin Dashboard</div>
      <DataTable columns={columns} data={dataTable as any} />
      <BlogLineCharts data={blogPerDaysOfWeek} />
      <BlogBarChartsDay data={BlogsPerDays} />
      <BlogBarChartsMonth data={blogPerMonth} />
    </div>
  )
}
