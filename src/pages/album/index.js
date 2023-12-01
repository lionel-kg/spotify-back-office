import React, {useState, useEffect} from 'react';
import styles from './index.module.scss';
import PageTitle from '../../components/PageTitle';
import Card from '../../components/Card';
import axios from 'axios'; // Import axios
import {getAlbums} from '@/services/album.service';

const Index = () => {
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4001/album/');
        setAlbums(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    getAlbums().then(res => {
      setAlbums(res);
    });
  }, []);

  useEffect(() => {
    if (search.length > 0) {
      setIsLoading(true);

      const albumResults = albums.filter(album =>
        album.title.toLowerCase().includes(search.toLowerCase()),
      );

      const delay = setTimeout(() => {
        setIsLoading(false);
        setFilteredAlbums(albumResults);
      }, 500);

      return () => clearTimeout(delay);
    } else {
      // If search is empty, reset the filtered albums and isLoading
      setIsLoading(false);
      setFilteredAlbums([]);
    }
  }, [search, albums]);

  const handleSearch = e => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <div className={styles.header}>
        <PageTitle title="Albums" />
        <input
          placeholder="Rechercher"
          onChange={e => {
            handleSearch(e);
          }}
          value={search}
        />
      </div>
      <div className={styles.albums_container}>
        {search ? (
          <>
            {isLoading ? (
              <div className={styles.spinner}></div>
            ) : (
              <>
                {filteredAlbums.length === 0 ? (
                  <p>Pas de résultats</p>
                ) : (
                  <>
                    {filteredAlbums.map(album => (
                      <Card
                        key={album.id}
                        name={album.title}
                        subtitle={album.artist?.name}
                        onClick={album.onClick}
                      />
                    ))}
                  </>
                )}
              </>
            )}
          </>
        ) : (
          <>
            {albums.map(album => (
              <Card
                key={album.id}
                name={album.title}
                subtitle={album.artist?.name}
                href={`album/update/${album.id}`}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
