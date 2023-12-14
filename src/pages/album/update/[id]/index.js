import React, {useState, useEffect, useRef, useCallback, useMemo} from 'react';
import styles from './index.module.scss';
import {getAlbumById, updateAlbum, deleteAlbum} from '@/services/album.service';
import Image from 'next/image';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import axios from 'axios';
import {useRouter} from 'next/router';
import {resetServerContext} from 'react-beautiful-dnd';
import {uploadAudio} from '@/services/audio.service';

// Components
import Button from '@/components/Button';
import Input from '@/components/Input';
import AlbumBanner from '@/components/AlbumBanner';
import AudioList from '@/components/AudioList';
import LottieLoading from '@/components/LottieLoading/index';
import ButtonAddAudio from '@/components/ButtonAddAudio';

export async function getServerSideProps(context) {
  resetServerContext();
  const {id} = await context.query;
  const data = await getAlbumById(id).then(res => {
    return {data: res};
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

const Index = ({data}) => {
  const router = useRouter();
  const inputRef = useRef(null);
  const {id} = router.query;

  const [album, setAlbum] = useState({});
  const [listItems, setListItems] = useState(data.audios);
  const [audioForm, setAudioForm] = useState({title: '', audioFile: null});
  const [artist, setArtist] = useState({});
  const [audio, setAudio] = useState({});
  const [loading, setLoading] = useState(false);

  const handleDelete = useCallback(
    async e => {
      e.preventDefault();
      await deleteAlbum(data.id);
      router.push('/album');
    },
    [data.id, router],
  );

  const handleAddAudio = useCallback(async audioFile => {
    setAudioForm({audioFile});
  }, []);

  useEffect(() => {
    getAlbumById(id).then(album => {
      setAlbum(album);
    });
  }, [id]);

  useEffect(() => {
    if (audioForm.audioFile) {
      submitAudio();
    }
  }, [audioForm.audioFile]);

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

      const updatedAlbum = {
        title: data.title,
        artistId: data.artist.id,
        audios: updatedItems,
      };

      try {
        await axios.put(`http://localhost:4001/album/${data.id}`, updatedAlbum);
        setListItems(updatedItems);
        setLoading(false);
      } catch (error) {
        console.error('Error updating album:', error);
      }
    },
    [data.id, listItems],
  );

  const submitAudio = useCallback(async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', audioForm.audioFile);
      formData.append('albumId', data.id);
      const audioResponse = await uploadAudio(formData);
      setListItems(prevList => [...prevList, audioResponse.audio]);
      setLoading(false);
    } catch (error) {
      console.error('Error uploading audio file:', error);
      setLoading(false);
    }
  }, [audioForm.audioFile, data.id]);

  useEffect(() => {
    setListItems(data.audios);
  }, [data]);

  const renderedAlbumBanner = useMemo(() => {
    return (
      <AlbumBanner
        title={data.title}
        artist={data.artist.name}
        image={data.thumbnail}
      />
    );
  }, [data.title, data.artist.name, data.thumbnail]);

  return (
    <div className={styles.album}>
      {renderedAlbumBanner}

      <div className={styles.actions}>
        <ButtonAddAudio onAddAudio={handleAddAudio} />
        <Button title="Supprimer l'album" onClick={handleDelete} />
      </div>
      <div>
        {loading ? (
          <LottieLoading />
        ) : (
          <AudioList
            listItems={listItems}
            onDragEnd={onDragEnd}
            setListItems={setListItems}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
