import React from 'react';
import PageTitle from '../../components/PageTitle';
import List from '../../components/List';
import {useEffect} from 'react';
import axios from '../../config/axios';
import {useState} from 'react';
import Modal from '../../components/Modal/index';
import EditArtist from '../../components/Form/artist/edit/index';
import {deleteArtist} from '@/services/artist.service';
import Header from '@/components/Header';

const Index = () => {
  const [search, setSearch] = useState('');
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

  const deleteById = id => {
    deleteArtist(id).then(response => {
      console.log(response);
      setArtists(response);
    });
  };

  return (
    <div>
      <Header
        pageTitle="Artistes"
        buttonTitle="Ajouter un artist"
        href="artist/add"
        onChange={e => {
          handleSearch(e);
        }}
        value={search}
      />
      <List
        items={artists}
        setShow={setShow}
        setTitle={setTitle}
        setArtists={setArtists}
        deleteFunction={deleteById}
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