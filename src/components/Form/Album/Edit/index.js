import React, {useState} from 'react';
import Input from '../../../Input/index';
import Button from '../../../Button/index';
import axios from '../../../../config/axios';
import {updateAlbum} from '@/services/album.service';
import styles from './index.module.scss';

const Index = props => {
  const {album, setAlbum, setShow} = props;
  const [form, setForm] = useState({
    title: album?.title,
    artistId: album?.artistId,
    thumbnail: album?.thumbnail,
  });

  const handleInput = e => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const update = e => {
    updateAlbum(album.id, form).then(res => {
      setAlbum(res);
      setShow(false);
    });
  };

  // File uploader
  const handleUploadInput = e => {
    const files = [...e.target.files];
    const formData = new FormData();
    for (let file of files) {
      formData.append('file', file);
    }

    formData.append('folder', 'image');
    formData.append('upload_preset', 'ml_default');

    const res = fetch(
      'https://api.cloudinary.com/v1_1/dud2dnggu/image/upload',
      {
        method: 'POST',
        body: formData,
      },
    ).then(res => {
      res.json().then(data => {
        const uploadedThumbnailUrl = data.secure_url;

        setForm({
          ...form,
          thumbnail: uploadedThumbnailUrl,
        });
      });
    });
  };

  return (
    <div>
      <Input
        name="title"
        type="text"
        label="title"
        defaultValue={form.title}
        onChange={handleInput}
      />
      <Input
        label="Image"
        type="file"
        name="thumbnail"
        multiple
        inputValue={form.thumbnail}
        onChange={e => {
          handleUploadInput(e);
        }}
      />

      <div className={styles.img_wrapper}>
        <div className={styles.img_card}>
          <img
            width="200px"
            height="200px"
            src={form.thumbnail}
            loading="lazy"
          />
        </div>
      </div>
      <div className={styles.box_btn}>
        <Button
          title="modifier"
          onClick={() => {
            update();
          }}
        />
      </div>
    </div>
  );
};

export default Index;
