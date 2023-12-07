// components/LoadingComponent.js
import React from 'react';
import styles from './index.module.scss'
const LoadingComponent = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default LoadingComponent;
