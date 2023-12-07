import React, {useEffect, useState} from 'react';
import styles from './index.module.scss';

import {FaPen} from 'react-icons/fa';
import {MdDelete} from 'react-icons/md';
import CardArtist from '../CardArtist/index.js';

const Index = props => {
  const {items, setShow, deleteFunction, setSelectedItem} = props;
  const [listItems, setListItems] = useState(items);

  useEffect(() => {
    setListItems(items);
  }, [items]);

  return (
    <div className={styles.list_container}>
      <div className={styles.list_item}>
        {listItems.length > 0 &&
          listItems.map(item => (
            <CardArtist
              artist={item}
              setSelectedItem={setSelectedItem}
              setShow={setShow}
              deleteFunction={deleteFunction}></CardArtist>
          ))}
      </div>
    </div>
  );
};

export default Index;
