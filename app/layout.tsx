import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import NextAuthProvider from "@/components/providers/NextAuthProvider"
import { Toaster } from "@/components/ui/toaster"
import VercelAnalytics from "@/components/providers/VercelAnalytics"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    absolute: "Bloggy",
    template: "%s | Bloggy",
  },
  description: "A blog platform for everyone",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${process.env.NEXTAUTH_URL}`,
    siteName: "Bloggy",
    images: [
      {
        url: `${process.env.NEXTAUTH_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Bloggy",
      },
    ],
  },
  metadataBase: new URL(`${process.env.NEXTAUTH_URL}`),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <div className="flex h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
          <VercelAnalytics />
        </NextAuthProvider>
      </body>
    </html>
  )
}
