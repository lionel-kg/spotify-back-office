import React from 'react';
import Image from 'next/image';
import styles from './index.module.scss';

const AlbumBanner = ({ title, artist }) => (
  <div className={styles.banner}>
    <Image src="/album.jpg" alt="logo" width={250} height={250} />
    <div className={styles.banner_content}>
      <p>Album</p>
      <h1>{title}</h1>
      <div className={styles.banner_description}>
        <p>{artist}</p>
      </div>
    </div>
  </div>
);

export default AlbumBanner;
