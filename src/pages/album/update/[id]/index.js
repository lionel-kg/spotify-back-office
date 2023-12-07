import React, { useState, useEffect, useRef } from 'react';
import styles from './index.module.scss';
import { getAlbumById, updateAlbum, deleteAlbum } from '@/services/album.service';
import Image from 'next/image';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios'; // Import axios
import { useRouter } from 'next/router';
import { resetServerContext } from 'react-beautiful-dnd';
import audioService from '@/services/audio.service';

//Components
import Button from '@/components/Button';
import Input from '@/components/Input';
import AlbumBanner from '@/components/AlbumBanner';
import AudioList from '@/components/AudioList';
import LottieLoading from '@/components/LottieLoading/index';
import ButtonAddAudio from '@/components/ButtonAddAudio';

export async function getServerSideProps(context) {
  resetServerContext()
  const { id } = await context.query;
  const data = await getAlbumById(id).then(res => {
    return { data: res }; // Envelopper les données dans la clé "data"
  });
  return {
    props: data,
  };
}

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const Index = ({ data }) => {
  const router = useRouter();
  const inputRef = useRef(null);

  const [listItems, setListItems] = useState(data.audios);
  const [audioForm, setAudioForm] = useState({ title: '', audioFile: null });
  const [artist, setArtist] = useState({});
  const [audio, setAudio] = useState({});
  const [loading, setLoading] = useState(false);

  const handleDelete = async (e) => {
    e.preventDefault();
    await deleteAlbum(data.id);
    router.push('/album');
  }

  const handleAddAudio = async (audioFile) => {
    setAudioForm({ audioFile });
  };

  useEffect(() => {
    if (audioForm.audioFile) {
      submitAudio();
    }

    return
  }, [audioForm.audioFile]);


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

    const updatedAlbum = {
      title: data.title,
      artistId: data.artist.id,
      audios: updatedItems,
    };

    try {
      const response = await axios.put(
        `http://localhost:4001/album/${data.id}`,
        updatedAlbum,
      );
      setListItems(updatedItems);
      setLoading(false);
    } catch (error) {
      console.error('Error updating album:', error);
    }
  };


  const submitAudio = async e => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', audioForm.audioFile);
      formData.append('albumId', data.id);
      const audioResponse = await audioService.uploadAudio(formData);
      // Use the callback function to ensure that you're working with the latest state
      setListItems(prevList => [...prevList, audioResponse.audio]);
      
      setLoading(false);
    } catch (error) {
      console.error('Error uploading audio file:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(data);
    setListItems(data.audios);
  }, [data]);

  return (
    <div className={styles.album}>
      <AlbumBanner title={data.title} artist={data.artist.name} image={data.thumbnail} />

      <div className={styles.actions}>

        <ButtonAddAudio onAddAudio={handleAddAudio} />
        <Button title="Supprimer l'album" onClick={handleDelete} />

      </div>
      <div>
        {loading ? (
          <LottieLoading />
        ) : (
          <AudioList listItems={listItems} onDragEnd={onDragEnd} />
        )}
      </div>
    </div>
  );
};

export default Index;
