import type { Session } from "@auth/core"
import { NavLink, useFetcher } from "@remix-run/react";
import { useEffect } from "react"
import AuthButton from "./AuthButton";

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
          <div className="nojs-show loaded">
            {
              fetcher.data?.user ? <>
                <span className="avatar" style={{ backgroundImage: `url('${fetcher.data.user?.image}')` }}></span>
                <span className="signedInText">
                  <small>Signed in as</small><br />
                  <strong>{ fetcher.data?.user?.email ?? fetcher.data?.user?.name }</strong>
                </span>
                <AuthButton type="signout" />
              </> : <>
              <span className="notSignedInText">You are not signed in</span>
              <AuthButton type="signin" />
              </>
            }
            
          </div>
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
