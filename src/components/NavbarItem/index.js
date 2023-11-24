import Link from "next/link";
import styles from "./index.module.scss";

const Index = (props) => {
    return (  
        <Link className={styles.navbar_item} href={props.link}>
            {props.icon}
            <span>{props.title}</span>
        </Link>
    );
}
 
export default Index;