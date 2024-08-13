import NextAuth from "next-auth"

import { authOptions } from "@/lib/auth"

//configuring the session to be able to store my  modified token

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST, authOptions }
