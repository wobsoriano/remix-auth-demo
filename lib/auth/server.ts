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

export async function getSession(
  req: Request,
  options: AuthOptions
) {
  options.secret ??= process.env.AUTH_SECRET
  options.trustHost ??= Boolean(process.env.AUTH_TRUST_HOST)

  const url = new URL('/api/auth/session', req.url)
  const response = await AuthHandler(
    new Request(url, { headers: req.headers }),
    options
  )

  const { status = 200 } = response

  const data = await response.json()

  if (!data || !Object.keys(data).length) return null
  if (status === 200) return data
  throw new Error(data.message)
}
