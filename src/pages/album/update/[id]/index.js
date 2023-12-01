import React, {useState, useEffect, useRef} from 'react';
import styles from './index.module.scss';
import {getAlbumById, updateAlbum} from '@/services/album.service';
import Image from 'next/image';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import Button from '@/components/Button';
import Input from '@/components/Input';
import axios from 'axios'; // Import axios
import {useRouter} from 'next/router';
import {resetServerContext} from 'react-beautiful-dnd';

export async function getServerSideProps(context) {
  const {id} = await context.query;
  const data = await getAlbumById(id).then(res => {
    return {data: res}; // Envelopper les données dans la clé "data"
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

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  padding: '10px 0',
  margin: '5px 0',
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? '' : '',
  padding: grid,
  width: 250,
});

const Index = ({data}) => {
  resetServerContext();

  const inputRef = useRef(null); // Create a ref to the file input

  // ... (other code)

  const handleButtonClick = () => {
    // Trigger the file input click when the button is clicked
    inputRef.current.click();
  };

  const [listItems, setListItems] = useState(data.audios);
  const [audioForm, setAudioForm] = useState({title: '', audioFile: null});
  const [file, setFile] = useState({});
  const [loadingData, setLoadingData] = useState(true);
  const [artist, setArtist] = useState({});
  const [audio, setAudio] = useState({});
  const [loadingAudio, setLoadingAudio] = useState(true);

  const onDragEnd = async result => {
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
      console.log(updatedAlbum);
      const response = await axios.put(
        `http://localhost:4001/album/${data.id}`,
        updatedAlbum,
      );

      console.log(response.data);
      setListItems(updatedItems);
    } catch (error) {
      console.error('Error updating album:', error);
    }
  };

  const handleFileChange = e => {
    setAudioForm({...audioForm, audioFile: e.target.files[0]});
  };

  const submitAudio = async e => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('file', audioForm.audioFile);
      console.log(formData);
      const uploadResponse = await axios.post(
        `http://localhost:4001/audio/upload/`,
        formData,
      );
      setLoadingData(false);

      const metaData = uploadResponse.data.metaData;
      const bodyAudio = {
        title: metaData.title,
        artistId: data.artist.id,
        albumId: data.id,
        url: uploadResponse.data.audio.url,
      };

      const audioResponse = await axios.post(
        'http://localhost:4001/audio',
        bodyAudio,
      );

      console.log(audioResponse.data);

      // Use the callback function to ensure that you're working with the latest state
      setListItems(prevList => [...prevList, audioResponse.data]);

      setAudio(audioResponse.data);
      setLoadingAudio(false);
    } catch (error) {
      console.error('Error uploading audio file:', error);
    }
  };

  useEffect(() => {
    setListItems(data.audios);
  }, [data]);

  return (
    <div className={styles.album}>
      <div className={styles.banner}>
        <Image src="/album.jpg" alt="logo" width={250} height={250} />
        <div className={styles.banner_content}>
          <p>Album</p>
          <h1>{data.title}</h1>
          <div className={styles.banner_description}>
            <p>{data.artist.name}</p>
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <form className={styles.form} onSubmit={submitAudio}>
          <div>
            <Input
              required={true}
              label="Audio File"
              type="file"
              name="audioFile"
              onChange={handleFileChange}
              inputRef={inputRef}
            />
          </div>
          <Button title="Ajouter une musique" onClick={handleButtonClick} />
        </form>
      </div>

      <div className={styles.audio}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                styles={getListStyle(snapshot.isDraggingOver)}>
                {listItems.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.id.toString()}
                    index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style,
                        )}>
                        {index + 1}
                        {item.title}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default Index;
