import styles from "./index.module.scss";

const Index = (props) => {
    return ( 
        <h1 className={styles.title}>{props.title}</h1>
     );
}
 
export default Index;