// AudioList.js
import React, {useEffect} from 'react';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import styles from './index.module.scss';
import {MdDelete} from 'react-icons/md';
import {deleteAudio} from '@/services/audio.service';
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

const AudioList = ({listItems, setListItems, onDragEnd}) => {
  useEffect(() => {
    console.log(listItems);
  }, []); // Ajout du crochet manquant
  const removeAudio = id => {
    deleteAudio(id).then(album => {
      console.log(album);
      setListItems(album.album.audios);
      console.log(listItems);
    });
  };
  return (
    <div className={styles.audio}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}>
              {listItems.map((item, index) => (
                <Draggable
                  key={item.id}
                  draggableId={item.id.toString()}
                  index={index}>
                  {(provided, snapshot) => (
                    <>
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
                        <MdDelete
                          onClick={() => {
                            removeAudio(item.id);
                          }}
                        />
                      </div>
                    </>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default AudioList;
