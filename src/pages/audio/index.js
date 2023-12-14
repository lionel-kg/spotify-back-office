import React, {useEffect, useState, useCallback, useMemo} from 'react';
import PageTitle from '../../components/PageTitle';
import Pagination from '../../components/Pagination/index';
import {getAudiosPagination} from '../../services/audio.service';
import styles from './index.module.scss';

const Index = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [audios, setAudios] = useState({});

  const fetchAudios = useCallback(async page => {
    const audiosData = await getAudiosPagination(page);
    const totalPages = Math.ceil(audiosData.nbResults / 10);
    setTotalPages(totalPages);
    setAudios(audiosData.audios);
  }, []);

  useEffect(() => {
    fetchAudios(currentPage);
  }, [fetchAudios, currentPage]);

  const handlePageChange = useCallback(page => {
    setCurrentPage(page);
  }, []);

  const renderedAudios = useMemo(() => {
    return audios.length > 0
      ? audios.map(audio => (
          <div className={styles.padding} key={audio.id}>
            {audio.title}
          </div>
        ))
      : null;
  }, [audios]);

  return (
    <div>
      <PageTitle title="Audio" />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <div className={styles.container_song}>{renderedAudios}</div>
    </div>
  );
};

export default Index;
