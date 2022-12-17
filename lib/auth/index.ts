import type { AuthOptions } from '@auth/core'
import { AuthHandler } from '@auth/core'
import type { ActionArgs, LoaderArgs } from '@remix-run/node'
import { installCrypto } from './crypto'

installCrypto()

export function RemixAuthHandler(options: AuthOptions) {
  options.secret ??= process.env.AUTH_SECRET
  options.trustHost ??= Boolean(process.env.AUTH_TRUST_HOST)

  const handler = ({ request }: LoaderArgs | ActionArgs) => {
    return AuthHandler(request, options)
  }

  return {
    loader: handler,
    action: handler
  }
}
