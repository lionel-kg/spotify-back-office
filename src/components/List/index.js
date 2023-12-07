import React, {useEffect, useState} from 'react';
import styles from './index.module.scss';

import {FaPen} from 'react-icons/fa';
import {MdDelete} from 'react-icons/md';

const Index = props => {
  const {items, setShow, deleteFunction, setSelectedItem} = props;
  const [listItems, setListItems] = useState(items);

  useEffect(() => {
    setListItems(items);
  }, [items]);

  return (
    <div className={styles.list_container}>
      {listItems.length > 0 &&
        listItems.map(item => (
          <div key={item.id} className={styles.list_item}>
            <p>{item.name}</p>
            <div className={styles.list_item_actions + ' ' + styles.flex_row}>
              <div className={'customPadding'}>
                <FaPen
                  onClick={() => {
                    setSelectedItem(item);
                    setShow(true);
                  }}
                />
              </div>
              <div className={'customPadding'}>
                <MdDelete
                  onClick={() => {
                    deleteFunction(item.id);
                  }}
                />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Index;
