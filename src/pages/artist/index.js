import React from 'react';
import PageTitle from '../../components/PageTitle';
import List from '../../components/List';
import {useEffect} from 'react';
import axios from '../../config/axios';
import {useState} from 'react';

const Index = () => {
  const [artists, setArtists] = useState({});

  useEffect(() => {
    axios.get('/artist').then(response => {
      setArtists(response.data);
    });
  }, []);
  return (
    <div>
      <PageTitle title="Artistes" />
      <List items={artists} />
    </div>
  );
};

export default Index;
