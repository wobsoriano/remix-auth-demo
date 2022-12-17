import type { Session } from "@auth/core"
import { NavLink, useFetcher } from "@remix-run/react";
import { useEffect } from "react"

export default function Header() {
  const fetcher = useFetcher<Session>();

  useEffect(() => {
    if (fetcher.type === 'init') {
      fetcher.load('/api/auth/session');
    }
  }, [fetcher])

  return (
    <>
      <header>
        <div className="signedInStatus">
          <p className="nojs-show loaded">
            {
              fetcher.data?.user ? <>
                <span className="avatar" style={{ backgroundImage: `url('${fetcher.data.user?.image}')` }}></span>
                <span className="signedInText">
                  <small>Signed in as</small><br />
                  <strong>{ fetcher.data?.user?.email ?? fetcher.data?.user?.name }</strong>
                </span>
                <a href="/api/auth/signout" className="button">Sign out</a>
              </> : <>
              <span className="notSignedInText">You are not signed in</span>
              <a href="/api/auth/signin" className="buttonPrimary">Sign in</a>
              </>
            }
            
          </p>
        </div>
        <nav>
          <ul className="navItems">
            <li className="navItem"><NavLink to="/">Home</NavLink></li>
            <li className="navItem"><NavLink to="/protected">Protected</NavLink></li>
          </ul>
        </nav>
      </header>
    </>
  )
}
