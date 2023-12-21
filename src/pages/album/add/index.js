import React, {useState, useEffect, useCallback, useMemo} from 'react';
import styles from './index.module.scss';
import axios from 'axios';
import {getArtists} from '@/services/artist.service';
import {useRouter} from 'next/router';

import {uploadAudio} from '@/services/audio.service';
// Components
import PageTitle from '../../../components/PageTitle';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import ButtonAddAudio from '@/components/ButtonAddAudio';
import AudioList from '@/components/AudioList';
import Loading from '@/components/Loading';
import {Akatab, Alumni_Sans} from 'next/font/google';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const Index = () => {
  const router = useRouter();

  const [listItems, setListItems] = useState([]);
  const [audioForm, setAudioForm] = useState({title: '', audioFile: null});
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

  const handleInput = useCallback(
    e => {
      setAlbum({
        ...album,
        [e.target.name]: e.target.value,
      });
    },
    [album],
  );

  const handleSelectChange = useCallback(
    async e => {
      e.preventDefault();
      setSelectedArtist(e.target.value);
      await setAlbum({
        ...album,
        artistId: parseInt(e.target.value, 10),
      });
    },
    [album],
  );

  const handleAddAudio = useCallback(async audioFile => {
    setAudioForm({audioFile});
  }, []);

  useEffect(() => {
    if (audioForm.audioFile) {
      submitAudio();
    }

    return;
  }, [audioForm.audioFile]);

  const submitAudio = useCallback(async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', audioForm.audioFile);

      const audioResponse = await uploadAudio(formData);
      setListItems(prevList => [...prevList, audioResponse.audio]);
      setLoading(false);
    } catch (error) {
      console.error('Error uploading audio file:', error);
      setLoading(false);
    }
  }, [audioForm.audioFile]);

  // File uploader
  const handleUploadInput = e => {
    const files = [...e.target.files];
    const formData = new FormData();
    for (let file of files) {
      formData.append('file', file);
    }

    formData.append('folder', 'image');
    formData.append('upload_preset', 'ml_default');

    const res = fetch(
      'https://api.cloudinary.com/v1_1/dud2dnggu/image/upload',
      {
        method: 'POST',
        body: formData,
      },
    ).then(res => {
      res.json().then(data => {
        // Assuming data.secure_url is the URL of the uploaded image
        const uploadedThumbnailUrl = data.secure_url;
        // Update the form state with the new thumbnail URL
        setAlbum({
          thumbnail: uploadedThumbnailUrl,
        });
      });
    });
  };

  const submitAlbum = useCallback(
    async e => {
      e.preventDefault();
      try {
        // Step 1: Create the album
        const updatedAlbum = {
          title: album.title,
          artistId: album.artistId,
          thumbnail: album.thumbnail,
          audio: listItems,
        };

        const albumResponse = await axios.post(
          'http://localhost:4001/album',
          updatedAlbum,
        );

        const albumId = albumResponse.data.id;

        const updateAudioPromises = listItems.map(async audio => {
          const updatedAudio = {...audio, albumId: albumId};
          return axios.put(
            `http://localhost:4001/audio/${audio.id}`,
            updatedAudio,
          );
        });

        await Promise.all(updateAudioPromises);
        router.push(`/album/update/${albumId}`);
      } catch (error) {
        console.error('Error uploading audio file:', error);
      }
    },
    [album, listItems, router],
  );

  const onDragEnd = useCallback(
    async result => {
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
    },
    [listItems],
  );

  const renderedArtistsOptions = useMemo(() => {
    return (
      <select
        required={true}
        value={selectedArtist}
        onChange={e => handleSelectChange(e)}>
        <option value="" disabled>
          Select an artist
        </option>
        {artists.map(artist => (
          <option key={artist.id} value={artist.id}>
            {artist.name}
          </option>
        ))}
      </select>
    );
  }, [artists, selectedArtist, handleSelectChange]);

  return (
    <div>
      <PageTitle title="Ajouter un album" />
      <form className={styles.form} onSubmit={e => submitAlbum(e)}>
        <div className={styles.form_container}>
          <div className={styles.form_fields}>
            <Input
              required={true}
              label="Title"
              type="text"
              name="title"
              value={album.title || ''}
              onChange={e => handleInput(e)}
            />
            <Input
              label="Image"
              type="file"
              name="thumbnail"
              multiple
              inputValue={album.thumbnail}
              onChange={e => {
                handleUploadInput(e);
              }}
            />
            {album.thumbnail ? (
              <div className={styles.img_wrapper}>
                <div className={styles.img_card}>
                  <img
                    width="200px"
                    height="200px"
                    src={album.thumbnail}
                    loading="lazy"
                  />
                </div>
              </div>
            ) : (
              ''
            )}
            <div className={styles.artist_select}>
              <label>Artiste</label>
              {renderedArtistsOptions}
            </div>
          </div>
        </div>
        <ButtonAddAudio onAddAudio={handleAddAudio} />
        <AudioList listItems={listItems} onDragEnd={onDragEnd} />
        <Button title="Ajouter l'album" onClick={e => submitAlbum(e)} />
      </form>
      {loading && <Loading />}
    </div>
  );
};

export default Index;
