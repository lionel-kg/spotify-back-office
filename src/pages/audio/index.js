import React, {useEffect, useState} from 'react';
import PageTitle from '../../components/PageTitle';
import Pagination from '../../components/Pagination/index';
import {getAudiosPagination} from '../../services/audio.service';
import styles from './index.module.scss';

const Index = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [audios, setAudios] = useState({});
  useEffect(() => {
    getAudiosPagination(currentPage).then(audios => {
      const totalPages = Math.ceil(audios.nbResults / 10);
      setTotalPages(totalPages);
      setAudios(audios.audios);
    });
  }, [currentPage]);

  const handlePageChange = page => {
    // Mettez à jour l'état de la page ici
    setCurrentPage(page);
  };
  return (
    <div>
      <PageTitle title="Audio" />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <div className={styles.container_song}>
        {audios.length > 0 ? (
          audios.map(audio => {
            return <div className={styles.padding}>{audio.title}</div>;
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Index;
