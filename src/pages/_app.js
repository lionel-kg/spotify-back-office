import React from 'react';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../styles/styles.scss';
import {useRouter} from 'next/router';
import Navbar from '../components/Navbar';
import localFont from 'next/font/local';

const myFont = localFont({src: '../../public/fonts/GothamMedium.ttf'});

function MyApp({Component, pageProps}) {
  const router = useRouter();
  return (
    <div className={`main ${myFont.className}`}>
      <Navbar />
      <main>
        <Component {...pageProps} />
      </main>
      <ToastContainer />
    </div>
  );
}

export default MyApp;
