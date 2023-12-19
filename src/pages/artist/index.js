import React, {useEffect, useState, useCallback, useMemo} from 'react';
import PageTitle from '../../components/PageTitle';
import List from '../../components/List';
import axios from '../../config/axios';
import Modal from '../../components/Modal/index';
import EditArtist from '../../components/Form/artist/edit/index';
import {deleteArtist} from '@/services/artist.service';
import Header from '@/components/Header';

const Index = () => {
  const [search, setSearch] = useState('');
  const [artists, setArtists] = useState({});
  const [filteredArtists, setFilteredArtists] = useState({});
  const [show, setShow] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState({});
  const [title, setTitle] = useState('');

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get('/artist');
      setArtists(response.data);
      setFilteredArtists(response.data);
    } catch (error) {
      console.error('Error fetching artists:', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const deleteById = useCallback(id => {
    deleteArtist(id).then(response => {
      console.log(response);
      setArtists(response);
      setFilteredArtists(response);
    });
  }, []);

  const handleSearch = useCallback(
    e => {
      const searchTerm = e.target.value.toLowerCase();
      setSearch(searchTerm);

      const filtered = artists.filter(artist =>
        artist.name.toLowerCase().includes(searchTerm),
      );

      setFilteredArtists(filtered);
    },
    [artists],
  );

  const renderList = useMemo(() => {
    return (
      <List
        items={filteredArtists}
        setShow={setShow}
        setTitle={setTitle}
        setArtists={setArtists}
        deleteFunction={deleteById}
        setSelectedItem={setSelectedArtist}
      />
    );
  }, [filteredArtists, setShow, setTitle, setArtists, deleteById]);

  return (
    <div>
      <Header
        pageTitle="Artistes"
        buttonTitle="Ajouter un artist"
        href="artist/add"
        onChange={handleSearch}
        value={search}
      />
      {renderList}
      {show ? (
        <Modal title={selectedArtist.name} show={show} setShow={setShow}>
          <EditArtist
            artist={selectedArtist}
            setArtists={setArtists}
            setFilteredArtists={setFilteredArtists}
            setShow={setShow}
          />
        </Modal>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Index;
