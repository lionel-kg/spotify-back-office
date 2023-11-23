import React from 'react';
import { useRouter } from "next/router";
import Navbar from "../components/NavBar"

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>
      <Navbar />
      <main>
        <Component {...pageProps} />
      </main>
    </>
  )
}

export default MyApp
