import styles from "./index.module.scss";

const Index = (props) => {

    return (  
        <button className={styles.btn} onClick={props.onClick} type={props.type}>
            {props.title}
        </button>
    );
}
 
export default Index;