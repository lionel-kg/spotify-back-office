import React from "react";
import styles from "./index.module.scss";

const Index = ({ item }) => {
    return ( 
        <div className={styles.card}>
            <a>
                <img src={item.img} alt={item.name}/>
                <p className={styles.name}>{item.name}</p>
                <p>{item.subtitle}</p>
            </a>
        </div>
     );
}
 
export default Index;