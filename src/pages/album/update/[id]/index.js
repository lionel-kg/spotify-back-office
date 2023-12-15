import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import styles from './index.module.scss';
import { getAlbumById, updateAlbum, deleteAlbum } from '@/services/album.service';
import Image from 'next/image';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import { useRouter } from 'next/router';
import { resetServerContext } from 'react-beautiful-dnd';
import { uploadAudio } from '@/services/audio.service';

// Components
import Button from '@/components/Button';
import Input from '@/components/Input';
import AlbumBanner from '@/components/AlbumBanner';
import AudioList from '@/components/AudioList';
import LottieLoading from '@/components/LottieLoading/index';
import ButtonAddAudio from '@/components/ButtonAddAudio';
import Modal from '@/components/Modal';
import AlbumEdit from '@/components/Form/Album/Edit';

// export async function getServerSideProps(context) {
//   resetServerContext();
//   const {id} = await context.query;
//   const data = await getAlbumById(id).then(res => {
//     return {data: res};
//   });
//   return {
//     props: data,
//   };
// }


const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const Index = ({ }) => {
  const router = useRouter();
  const inputRef = useRef(null);
  const { id } = router.query;

  const [album, setAlbum] = useState({});
  const [listItems, setListItems] = useState(album.audios);
  const [audioForm, setAudioForm] = useState({ title: '', audioFile: null });
  const [show, setShow] = useState(false)
  const [artist, setArtist] = useState({});
  const [audio, setAudio] = useState({});
  const [loading, setLoading] = useState(false);

  const handleDelete = useCallback(
    async e => {
      e.preventDefault();
      await deleteAlbum(album.id);
      router.push('/album');
    },
    [album.id, router],
  );

  const handleAddAudio = useCallback(async audioFile => {
    setAudioForm({ audioFile });
  }, []);

  useEffect(() => {
    if (id) {
      getAlbumById(id).then(album => {
        setAlbum(album);
      });
    }
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
        title: album.title,
        artistId: album.artist.id,
        audios: updatedItems,
      };

      try {
        await axios.put(`http://localhost:4001/album/${album.id}`, updatedAlbum);
        setListItems(updatedItems);
        setLoading(false);
      } catch (error) {
        console.error('Error updating album:', error);
      }
    },
    [album.id, listItems],
  );

  const submitAudio = useCallback(async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', audioForm.audioFile);
      formData.append('albumId', album.id);
      const audioResponse = await uploadAudio(formData);
      setListItems(prevList => [...prevList, audioResponse.audio]);
      setLoading(false);
    } catch (error) {
      console.error('Error uploading audio file:', error);
      setLoading(false);
    }
  }, [audioForm.audioFile, album.id]);

  useEffect(() => {
    setListItems(album.audios);
  }, [album]);

  const renderedAlbumBanner = useMemo(() => {
    return (
      <AlbumBanner
        title={album.title}
        artist={album.artist?.name}
        image={album.thumbnail}
      />
    );
  }, [album.title, album.artist?.name, album.thumbnail]);

  return (
    <div className={styles.album}>
      {renderedAlbumBanner}

      <div className={styles.actions}>
        <ButtonAddAudio onAddAudio={handleAddAudio} />
        <Button title="Supprimer l'album" onClick={handleDelete} />
        <Button title="Modifier l'album" onClick={() => setShow(true)} />
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

      {show ? (
        <>
          <Modal title={album.title} show={show} setShow={setShow}>
            <AlbumEdit
              album={album}
              setAlbum={setAlbum}
              setShow={setShow}
            />
          </Modal>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Index;
