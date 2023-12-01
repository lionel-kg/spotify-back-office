import React from "react";
import styles from "./index.module.scss";
import { useRouter } from 'next/router';

const Index = (props) => {


    const router = useRouter();

    const handleCard = (e) => {
        e.preventDefault();
        router.push(props.href);
    };


    return (
        <div className={styles.card} onClick={(e) => handleCard(e)}>
            <img src={props.img} alt={props.name} />
            <p className={styles.name}>{props.name}</p>
            <p>{props.subtitle}</p>
        </div>
    );
}

export default Index;