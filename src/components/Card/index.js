import React, {useEffect} from 'react';
import styles from './index.module.scss';
import {useRouter} from 'next/router';

const Index = props => {
  const {thumbnail, name, subtitle} = props;
  const router = useRouter();

  const handleCard = e => {
    e.preventDefault();
    router.push(props.href);
  };

  return (
    <div className={styles.card} onClick={e => handleCard(e)}>
      <img src={thumbnail} alt={name} />
      <p className={styles.name}>{name}</p>
      <p>{subtitle}</p>
    </div>
  );
};

export default Index;
