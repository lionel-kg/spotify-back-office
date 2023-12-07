import React from 'react';
import styles from './index.module.scss';
import PageTitle from '../PageTitle/index';

const Index = props => {
  const {show, title, children, setShow, classes} = props;

  const closeModal = () => {
    if (show === true) {
      setShow(false);
    }
  };

  return (
    <div className={styles.page_wrapper}>
      <div className={`${styles.page_overlay}`}>
        <div className={`${classes ? classes : styles.page_modal}`}>
          <div className={styles.container}>
            {title ? (
              <div className={styles.container_title}>
                <PageTitle title={title} />
              </div>
            ) : null}
            <div className={styles.container_close}>
              <div
                onClick={() => {
                  closeModal();
                }}>
                X
              </div>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Index;
