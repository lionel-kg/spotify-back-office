import React, {useState, useEffect} from 'react';
import styles from "./index.module.scss";
import PageTitle from "../../components/PageTitle";
import fakeData from '../fakeData';
import Card from "../../components/Card";

const Index = () => {

  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [artistData, setArtistData] = useState([]);
  const items = fakeData.artists;

  useEffect(() => {
    if (search.length > 0) {
      setIsLoading(true);
      const artistResults = fakeData.artists.filter((artist) =>
        artist.name.toLowerCase().includes(search.toLowerCase())
      );

      const delay = setTimeout(() => {
        setIsLoading(false);
        setArtistData(artistResults);
      }, 500);

      return () => clearTimeout(delay);
    }
  }, [search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <div className={styles.header}>
        <PageTitle title="Albums"/>
        <input placeholder="Rechercher" onChange={(e) => {handleSearch(e);}} />
      </div>
      <div className={styles.albums_container}>
        {search ? (
          <>
          {isLoading ? (
            <div className={styles.spinner}></div>
          ) : (
            <>
              {artistData.length <= 0 ? (
                <p>Pas de résultats</p>
              ) : (
                <div>
                  <h2>Artistes</h2>
                  <div className={styles.search_results_grid}>
                    {artistData.map((item) => (
                      <Card
                        key={item.id} // Add a unique key for each mapped element
                        item={item}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </>
        ) : (
          <>
          {items.map((item) => (
            <Card item={item} />
          ))}
          </>
        )}
      </div>

    </div>
  );
}

export default Index;