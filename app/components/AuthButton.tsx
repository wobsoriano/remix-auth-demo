import { Form } from "@remix-run/react";
import { useFetcher } from "@remix-run/react";
import { useEffect } from "react"

type Props = {
  type: 'signin' | 'signout'
  provider: 'github'
}

export default function SignOut({ type, provider }: Props) {
  const fetcher = useFetcher<{ csrfToken: string }>();

  useEffect(() => {
    if (fetcher.type === 'init') {
      fetcher.load('/api/auth/csrf');
    }
  }, [fetcher])

  return (
    <Form reloadDocument action={`/api/auth/${type}/${provider}`} method="post">
      <input type="hidden" value="http://localhost:3000/" name="callbackUrl" />
      <input type="hidden" value={fetcher.data?.csrfToken ?? ''} name="csrfToken" />
      <button className={type === 'signin' ? 'buttonPrimary' : 'button'}>
        Sign { type === 'signin' ? 'in' : 'out' }
      </button>
    </Form>
  )
}
