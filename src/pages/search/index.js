import React, {useState, useEffect, useRef} from 'react';
import Slider from '../../components/Slider';
import PageTitle from '../../components/PageTitle';
import Card from '../../components/Card';
import styles from './index.module.scss';

const Index = () => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [artistData, setArtistData] = useState([]);
  const [audioData, setAudioData] = useState([]);
  const [albumData, setAlbumData] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(8);
  const sliderRef = useRef(null);

  useEffect(() => {
    if (input.length > 0) {
      setIsLoading(true);
      // const artistResults = fakeData.artists.filter(artist =>
      //   artist.name.toLowerCase().includes(input.toLowerCase()),
      // );

      // const audioResults = fakeData.audios.filter(audio =>
      //   audio.name.toLowerCase().includes(input.toLowerCase()),
      // );

      // const albumResults = fakeData.albums.filter(album =>
      //   album.name.toLowerCase().includes(input.toLowerCase()),
      // );

      // Simulate a delay to mimic an API call
      const delay = setTimeout(() => {
        setIsLoading(false);
        // setArtistData(artistResults);
        // setAudioData(audioResults);
        // setAlbumData(albumResults);
      }, 300);

      return () => clearTimeout(delay);
    }
  }, [input]);

  const handleChange = e => {
    setInput(e.target.value);
  };

  return (
    <div className={styles.search}>
      <PageTitle title="Recherche" />
      <input
        type="text"
        placeholder="Search..."
        value={input}
        onChange={handleChange}
      />
      {isLoading ? (
        <div className={styles.spinner}> </div>
      ) : (
        <div className={styles.search_results}>
          {artistData.length > 0 && (
            <div>
              <h2>Artistes</h2>
              <div className={styles.search_results_grid}>
                {artistData.slice(0, itemsToShow).map(item => (
                  <Card item={item} />
                ))}
              </div>
            </div>
          )}
          {itemsToShow < artistData.length && (
            <button
              className={styles.showAllButton}
              onClick={() => setItemsToShow(artistData.length)}>
              Show All
            </button>
          )}

          {audioData.length > 0 && (
            <div className={styles.results_audio}>
              <Slider
                items={audioData}
                title="Musiques"
                initialItemsToShow={8}
              />
            </div>
          )}
          {albumData.length > 0 && (
            <div className={styles.results_artist}>
              <Slider items={albumData} title="Albums" initialItemsToShow={8} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Index;
