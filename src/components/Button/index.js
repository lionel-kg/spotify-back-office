import styles from "./index.module.scss";

const Index = (props) => {

    return (  
        <button className={styles.btn}>
            {props.title}
        </button>
    );
}
 
export default Index;