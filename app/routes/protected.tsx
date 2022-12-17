import type { LoaderArgs} from '@remix-run/node'
import { json} from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { authOptions } from 'lib/auth/config'
import { getSession } from 'lib/auth/server'

export const loader = async ({ request }: LoaderArgs) => {
  const session = await getSession(request, authOptions)
  if (!session) {
    return redirect('/')
  }
  return json(session)
}

export default function Protected() {
  return (
    <>
      <h1>Protected Page</h1>
      <p>
        This is a protected content. You can access this content because you are
        signed in.
      </p>
    </>
  );
}
