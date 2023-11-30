import React, {useEffect, useState} from 'react';
import Input from '../../../components/Input';
import PageTitle from '../../../components/PageTitle';
import Button from '../../../components/Button';
import styles from './index.module.scss';
import axios from '../../config/axios';

const Index = () => {
  const [songForm, setSongForm] = useState({title: '', audioFile: null});
  const [data, setData] = useState({});
  const [artist, setArtist] = useState({});
  const [loadingData, setLoadingData] = useState(true);
  const [loadingArtist, setLoadingArtist] = useState(true);
  const [loadingAlbum, setLoadingAlbum] = useState(true);
  const [loadingAudio, setLoadingAudio] = useState(true);
  const [album, setAlbum] = useState({});
  const [audio, setAudio] = useState({});

  const handleInput = e => {
    setSongForm({...songForm, [e.target.name]: e.target.value});
  };

  const handleFileChange = e => {
    setSongForm({...songForm, audioFile: e.target.files[0]});
  };

  const submitSong = async e => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('file', songForm.audioFile);
      const response = await axios.post(
        'http://localhost:4001/audio/upload',
        formData,
      );
      setData(response.data);
      setLoadingData(false);
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading audio file:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (loadingData !== true && Object.keys(data).length > 0) {
        const metaData = data.metaData;
        const bodyArtist = {
          name: metaData.artist,
        };
        try {
          const newArtist = await axios.post(
            'http://localhost:4001/artist',
            bodyArtist,
          );
          console.log(newArtist.data);
          setArtist(newArtist.data);
          setLoadingArtist(false);
        } catch (error) {
          console.error('Error creating artist:', error);
        }
      }
    };
    fetchData();
  }, [data, loadingData]);

  useEffect(() => {
    const fetchData = async () => {
      console.log(loadingArtist, artist, Object.keys(artist).length > 0);

      if (loadingArtist !== true && Object.keys(artist).length > 0) {
        const metaData = data.metaData;
        console.log(metaData);
        const bodyAlbum = {
          title: metaData.album,
          artistId: artist.id,
        };

        try {
          const newAlbum = await axios.post(
            'http://localhost:4001/album',
            bodyAlbum,
          );
          console.log(newAlbum.data);
          setAlbum(newAlbum.data);
          setLoadingAlbum(false);
        } catch (error) {
          console.error('Error creating album:', error);
        }
      }
    };

    fetchData();
  }, [artist, loadingArtist]);

  useEffect(() => {
    const fetchData = async () => {
      console.log(
        loadingAlbum,
        loadingArtist,
        album,
        artist,
        Object.keys(album).length > 0 && Object.keys(artist).length > 0,
      );

      if (
        loadingAlbum !== true &&
        loadingArtist !== true &&
        Object.keys(album).length > 0 &&
        Object.keys(artist).length > 0
      ) {
        const metaData = data.metaData;
        const audio = data.audio;
        console.log(audio);
        console.log(metaData);
        const bodyAudio = {
          title: metaData.title,
          artistId: artist.id,
          albumId: album.id,
          url: audio.url,
        };
        console.log(bodyAudio);
        try {
          const newAudio = await axios.post(
            'http://localhost:4001/audio',
            bodyAudio,
          );
          console.log(newAudio.data);
          setAudio(newAudio.data);
          setLoadingAudio(false);
        } catch (error) {
          console.error('Error creating audio:', error);
        }
      }
    };

    fetchData();
  }, [album, loadingAlbum, loadingArtist]);

  return (
    <div>
      <PageTitle title="Ajouter une musique" />
      <form className={styles.form} onSubmit={submitSong}>
        <div className={styles.form_container}>
          <div className={styles.form_fields}>
            <Input
              required={true}
              label="Audio File"
              type="file"
              name="audioFile"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <Button title="Ajouter une musique" type="submit" />
      </form>
    </div>
  );
};

export default Index;
