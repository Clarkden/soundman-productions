/* eslint-disable */

import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"

// function MyApp({ Component, pageProps }) {

//   return <Component {...pageProps} />
// }

// export default MyApp

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <div className='bg-white dark:bg-neutral-900 min-h-screen'>
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  )
}
