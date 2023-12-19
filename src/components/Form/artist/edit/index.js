import React, {useState} from 'react';
import Input from '../../../Input/index';
import Button from '../../../Button/index';
import axios from '../../../../config/axios';
import {updateArtist} from '../../../../services/artist.service';
import styles from './index.module.scss';

const Index = props => {
  const {artist, setArtists, setShow, setFilteredArtists} = props;
  const [value, setValue] = useState({
    name: '',
  });
  const handleInput = e => {
    setValue({...value, [e.target.name]: e.target.value});
  };
  const update = () => {
    updateArtist(artist.id, value).then(res => {
      console.log(res);
      setArtists(res);
      setFilteredArtists(res);
      setShow(false);
    });
  };
  return (
    <div>
      <Input
        name={'name'}
        type={'text'}
        defaultValue={artist.name}
        onChange={handleInput}
      />
      <div className={styles.box_btn}>
        <Button
          title={'modifier'}
          onClick={() => {
            update();
          }}
        />
      </div>
    </div>
  );
};

export default Index;
