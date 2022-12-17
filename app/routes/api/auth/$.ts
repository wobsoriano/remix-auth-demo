import { RemixAuthHandler } from 'lib/auth/server'
import { authOptions } from 'lib/auth/config'

export const {
  loader,
  action
} = RemixAuthHandler(authOptions)
