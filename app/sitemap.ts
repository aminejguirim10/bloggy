import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${process.env.NEXTAUTH_URL}`,
      priority: 1,
    },
    {
      url: `${process.env.NEXTAUTH_URL}/contact`,
      changeFrequency: "monthly",
      // lastModified: new Date() means the last time the page was updated is the current date wich is today
      priority: 0.6,
    },
    {
      url: `${process.env.NEXTAUTH_URL}/createblog`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${process.env.NEXTAUTH_URL}/edit-blog`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${process.env.NEXTAUTH_URL}/my-blogs`,
      priority: 0.7,
    },
    {
      url: `${process.env.NEXTAUTH_URL}/profile`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${process.env.NEXTAUTH_URL}/reset-password`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${process.env.NEXTAUTH_URL}/signin`,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${process.env.NEXTAUTH_URL}/signup`,
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ]
}
