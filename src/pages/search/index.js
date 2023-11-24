import React, { useState, useEffect } from 'react';
import fakeData from '../fakeData';
import Slider from '../../components/Slider';
import PageTitle from "../../components/PageTitle";
import styles from "./index.module.scss";

const Index = () => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [artistData, setArtistData] = useState([]);
  const [songData, setSongData] = useState([]);
  const [albumData, setAlbumData] = useState([]);

  useEffect(() => {
    if (input.length > 0) {
      console.log('Fetching data...');
      setIsLoading(true);
      const artistResults = fakeData.artists.filter((artist) =>
        artist.name.toLowerCase().includes(input.toLowerCase())
      );

      const songResults = fakeData.songs.filter((song) =>
        song.name.toLowerCase().includes(input.toLowerCase())
      );


      const albumResults = fakeData.albums.filter((album) =>
        album.name.toLowerCase().includes(input.toLowerCase())
      );


      // Simulate a delay to mimic an API call
      const delay = setTimeout(() => {
        setIsLoading(false);
        setArtistData(artistResults);
        setSongData(songResults);
        setAlbumData(albumResults);
      }, 300);

      return () => clearTimeout(delay);
    }
  }, [input]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div class={styles.search}>
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
            <div className={styles.results_artist}>
              <Slider title="Artistes" items={artistData}/>
            </div>
          )}
          {songData.length > 0 && (
            <div className={styles.results_song}>
              <Slider items={songData} title="Musiques" />
            </div>
          )}
          {albumData.length > 0 && (
            <div className={styles.results_artist}>
              <Slider items={albumData} title="Albums" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Index;
