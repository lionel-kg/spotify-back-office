import styles from './index.module.scss'
import PageTitle from '@/components/PageTitle'
import Button from '@/components/Button'
import { useRouter } from 'next/router'

const Index = (props) => {

  const router = useRouter();

  const handleButton = () => {
    router.push(props.href);
  };

  return (
    <div className={styles.header}>
      <div className={styles.header_left}>
        <PageTitle title={props.pageTitle} />
        <Button title={props.buttonTitle} onClick={handleButton} />
      </div>
      <input
        placeholder="Rechercher"
        onChange={props.onChange}
        value={props.value}
      />
    </div >
  );
}

export default Index;