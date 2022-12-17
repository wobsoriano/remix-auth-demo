import type { AuthOptions } from '@auth/core'
import { RemixAuthHandler } from 'lib/auth/server'
import GithubProvider from '@auth/core/providers/github'

const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    })
  ]
}

export const {
  loader,
  action
} = RemixAuthHandler(authOptions)
