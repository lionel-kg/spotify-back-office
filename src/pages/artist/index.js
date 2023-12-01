import React from 'react';
import PageTitle from '../../components/PageTitle';
import fakeData from '../fakeData';
import List from '../../components/List';
import {useEffect} from 'react';
import axios from '../../config/axios';
import {useState} from 'react';

const Index = () => {
  const [artists, setArtists] = useState({});
  const items = fakeData.artists.map((item, index) => ({
    id: `item-${index}`,
    content: item.name,
  }));

  useEffect(() => {
    axios.get('http://localhost:4001/artist').then(response => {
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
