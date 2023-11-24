import React, { useState } from "react";
import PageTitle from "../../components/PageTitle";
import List from "../../components/List";
import fakeData from '../fakeData';
const Index = () => {
  const items = fakeData.artists.map((item, index) => ({
    id: `item-${index}`,
    content: item.name
  }));
  return (
    <div>
      <PageTitle title="Musiques"/>
      <List items={items} />
    </div>
  );
}

export default Index;