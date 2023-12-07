import React from 'react';
import PageTitle from '../../components/PageTitle';
import List from '../../components/List';
import {useEffect} from 'react';
import axios from '../../config/axios';
import {useState} from 'react';
import Modal from '../../components/Modal/index';
import EditArtist from '../../components/Form/artist/edit/index';
import {deleteArtist} from '@/services/artist.service';

const Index = () => {
  const [artists, setArtists] = useState({});
  const [show, setShow] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState({});
  const [title, setTitle] = useState('');
  useEffect(() => {
    axios.get('/artist').then(response => {
      setArtists(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <div>
      <PageTitle title="Artistes" />
      <List
        items={artists}
        setShow={setShow}
        setTitle={setTitle}
        setArtists={setArtists}
        deleteFunction={deleteArtist}
        setSelectedItem={setSelectedArtist}
      />
      {show ? (
        <Modal title={selectedArtist.name} show={show} setShow={setShow}>
          <EditArtist artist={selectedArtist} setArtists={setArtists} />
        </Modal>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Index;
