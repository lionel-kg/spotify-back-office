import React from 'react';
import PageTitle from "../../components/PageTitle";
import fakeData from '../fakeData';
import ListDnD from "../../components/ListDnD";

const Index = () => {
  const items = fakeData.artists.map((item, index) => ({
    id: `item-${index}`,
    content: item.name
  }));
  return (
    <div>
      <PageTitle title="Sons" />
      <ListDnD items={items} />
    </div>
  );
}

export default Index;