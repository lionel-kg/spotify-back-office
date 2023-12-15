import React from 'react';
import Image from 'next/image';
import styles from './index.module.scss';

const AlbumBanner = ({ title, artist, image }) => (
  <div className={styles.banner}>
    {image ? (
      <Image src={image} alt="logo" width={250} height={250} />
    ) : (
      // You can provide a default image or a placeholder here
      <div className={styles.placeholderImage}>No Image Available</div>
    )}
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
