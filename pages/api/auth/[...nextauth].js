import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import TwitterProvider from "next-auth/providers/twitter"
import EmailProvider from "next-auth/providers/email"

import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"

export default NextAuth({
    // pages: {
    //     signIn: '/signin'
    // },

    adapter: MongoDBAdapter(clientPromise),
    // Configure one or more authentication providers
    providers: [
        EmailProvider({
            server: process.env.EMAIL_SERVER,
            from: process.env.EMAIL_FROM,
            // sendVerificationRequest({
            //   identifier: email,
            //   url,
            //   provider: { server, from },
            // }) {
            //   /* your function */
            // },
          }),
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        TwitterProvider({
            clientId: process.env.TWITTER_CLIENT_ID,
            clientSecret: process.env.TWITTER_CLIENT_SECRET,
            version: "2.0"
        })
        // ...add more providers here
    ]
})