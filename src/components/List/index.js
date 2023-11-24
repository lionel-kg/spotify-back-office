import React, { useState } from "react";
import styles from "./index.module.scss";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Index = ({items}) => {
    const [listItems, setListItems] = useState(items);
    return ( 
        <div className={styles.list_container}>
        
            {listItems.map((item, index) => (
                <div key={item.id} className={styles.list_item}>
                    <p>{index}</p>
                    <p>{item.content}</p>
                    <div className={styles.list_item_actions}>
                        <FaPen />
                        <MdDelete />
                    </div>
                </div>
            ))}
        </div>
     );
}
 
export default Index;