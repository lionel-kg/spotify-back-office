import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import axios from 'axios';
import { getArtists } from '@/services/artist.service';
import { useRouter } from 'next/router';

import audioService from '@/services/audio.service';
//Components
import PageTitle from '../../../components/PageTitle';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import ButtonAddAudio from '@/components/ButtonAddAudio';
import AudioList from '@/components/AudioList';
import Loading from '@/components/Loading';


const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const Index = () => {

  const router = useRouter();

  const [listItems, setListItems] = useState([]);
  const [audioForm, setAudioForm] = useState({ title: '', audioFile: null });
  const [album, setAlbum] = useState({});
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getArtists();
        setArtists(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleInput = (e) => {
    setAlbum({
      ...album,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = async (e) => {
    e.preventDefault();
    setSelectedArtist(e.target.value);
    await setAlbum({
      ...album,
      artistId: parseInt(e.target.value, 10)
    });
  };

  const handleAddAudio = async (audioFile) => {
    setAudioForm({ audioFile });
  };

  useEffect(() => {
    if (audioForm.audioFile) {
      submitAudio();
    }

    return
  }, [audioForm.audioFile]);


  const submitAudio = async e => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', audioForm.audioFile);

      const audioResponse = await audioService.uploadAudio(formData);
      // Use the callback function to ensure that you're working with the latest state
      setListItems(prevList => [...prevList, audioResponse.audio]);
      console.log(audioResponse.audio);
      setLoading(false);
    } catch (error) {
      console.error('Error uploading audio file:', error);
      setLoading(false);
    }
  };

  const submitAlbum = async (e) => {
    e.preventDefault();
    try {
      // Step 1: Create the album
      const updatedAlbum = {
        title: album.title,
        artistId: album.artistId,
        thumbnail: 'https://i.pinimg.com/originals/71/28/3b/71283bb49db55cfee5bb6acd1389c465.jpg',
        audios: listItems,
      };

      console.log(updatedAlbum);
      const albumResponse = await axios.post(
        'http://localhost:4001/album',
        updatedAlbum,
      );

      const albumId = albumResponse.data.id;

      // Step 2: Associate each audio with the album
      const updateAudioPromises = listItems.map(async (audio) => {
        const updatedAudio = { ...audio, albumId: albumId };
        return axios.put(
          `http://localhost:4001/audio/${audio.id}`,
          updatedAudio,
        );
      });

      await Promise.all(updateAudioPromises);
      router.push(`/album/update/${albumId}`);
      console.log("Album and associated audio submitted successfully!", updateAudioPromises);
    } catch (error) {
      console.error('Error uploading audio file:', error);
    }
  };

  const onDragEnd = async result => {
    setLoading(true);
    if (!result.destination) {
      return;
    }

    const updatedItems = reorder(
      listItems,
      result.source.index,
      result.destination.index,
    );
    try {
      setListItems(updatedItems);
      setLoading(false);
    } catch (error) {
      console.error('Error updating album:', error);
    }
  };

  return (
    <div>
      <PageTitle title="Ajouter un album" />
      <form className={styles.form} onSubmit={(e) => submitAlbum(e)}>
        <div className={styles.form_container}>
          <div className={styles.form_fields}>
            <Input
              required={true}
              label="Title"
              type="text"
              name="title"
              value={album.title || ''}
              onChange={(e) => handleInput(e)}
            />
            <div className={styles.artist_select}>
              <label>Artiste</label>
              <select
                required={true}
                value={selectedArtist}
                onChange={(e) => handleSelectChange(e)}
              >
                <option value="" disabled>Select an artist</option>
                {artists.map((artist) => (
                  <option key={artist.id} value={artist.id}>
                    {artist.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <ButtonAddAudio onAddAudio={handleAddAudio} />
        <AudioList listItems={listItems} onDragEnd={onDragEnd} />
        <Button title="Ajouter l'album" onClick={(e) => submitAlbum(e)} />
      </form>
      {loading && <Loading />}
    </div>
  );
};

export default Index;
