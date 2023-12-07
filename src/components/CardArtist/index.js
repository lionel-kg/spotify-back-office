import React, {useEffect} from 'react';
import styles from './index.module.scss';
import {MdDelete} from 'react-icons/md';
import {FaPen} from 'react-icons/fa';

export const Index = props => {
  const {artist, setSelectedItem, setShow, deleteFunction} = props;
  useEffect(() => {
    console.log(artist);
  }, []);
  return (
    <div className={styles.card_container}>
      <div className={'flex flex_row'}>
        <div className={styles.padding}>
          <img src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"></img>
        </div>
        <div className={styles.content}>
          <div>
            <h2>{artist.name}</h2>
          </div>
        </div>
        <div className={'flex flex_row' + ' ' + styles.alignEnd}>
          <div className={'customPadding'}>
            <FaPen
              onClick={() => {
                setSelectedItem(artist);
                setShow(true);
              }}
            />
          </div>
          <div className={'customPadding'}>
            <MdDelete
              onClick={() => {
                deleteFunction(artist.id);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
