import React from 'react';
import styles from '../styles/styles.scss';
import { useRouter } from "next/router";
import Navbar from "../components/NavBar"

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <div class="main">
      <Navbar />
      <main>
        <Component {...pageProps} />
      </main>
    </div>
  )
}

export default MyApp
