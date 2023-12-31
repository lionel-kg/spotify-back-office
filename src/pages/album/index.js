import React, {
  useState,
  useEffect,
  Suspense,
  lazy,
  useCallback,
  useMemo,
} from 'react';
import styles from './index.module.scss';
import PageTitle from '../../components/PageTitle';
import Header from '@/components/Header';
import axios from 'axios';
import {getAlbums} from '@/services/album.service';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Album = lazy(() => import('@/components/Card'));

const Index = () => {
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const [albums, setAlbums] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const data = await getAlbums();
      setAlbums(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (search.length > 0) {
      setIsLoading(true);

      const albumResults = albums.filter(album =>
        album.title.toLowerCase().includes(search.toLowerCase()),
      );

      const delay = setTimeout(() => {
        setFilteredAlbums(albumResults);
        setIsLoading(false);
      }, 500);

      return () => clearTimeout(delay);
    } else {
      setIsLoading(false);
      setFilteredAlbums([]);
    }
  }, [search, albums]);

  const handleSearch = useCallback(e => {
    setSearch(e.target.value);
  }, []);

  const renderAlbums = useMemo(() => {
    if (search) {
      return filteredAlbums.length > 0
        ? filteredAlbums.map(album => (
            <Album
              key={album.id}
              name={album.title}
              subtitle={album.artist?.name}
              href={`album/update/${album.id}`}
              thumbnail={album.thumbnail}
            />
          ))
        : !isLoading
        ? 'Pas de résultats'
        : null;
    } else {
      return albums.map(album => (
        <Suspense key={album.id} fallback={'loading...'}>
          <Album
            name={album.title}
            subtitle={album.artist?.name}
            href={`album/update/${album.id}`}
            thumbnail={album.thumbnail}
          />
        </Suspense>
      ));
    }
  }, [search, filteredAlbums, isLoading, albums]);

  return (
    <div>
      <Header
        pageTitle="Albums"
        buttonTitle="Ajouter un album"
        href="album/add"
        onChange={handleSearch}
        value={search}
      />
      <div className={styles.albums_container}>{renderAlbums}</div>
    </div>
  );
};

export default Index;
