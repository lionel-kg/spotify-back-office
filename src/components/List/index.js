import React, { useState } from "react";
import styles from "./index.module.scss";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useEffect } from "react";

const Index = (props) => {
  const { items } = props;
  const [listItems, setListItems] = useState(items);
  useEffect(() => {
    setListItems(items);
  }, [items]);
  return (
    <div className={styles.list_container}>
      {listItems.length > 0 ? (
        listItems.map((item, index) => (
          <div key={item.id} className={styles.list_item}>
            <p>{item.name}</p>
            <div className={styles.list_item_actions}>
              <FaPen />
              <MdDelete />
            </div>
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default Index;
