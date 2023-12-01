import React, {useState} from 'react';
import styles from './index.module.scss';
import PageTitle from '../../../components/PageTitle';
import Button from '../../../components/Button';
import Input from '../../../components/Input';

const Index = () => {
  const [album, setAlbum] = useState({});

  const submitAudio = () => {};

  return (
    <div>
      <PageTitle title="Ajouter une musique" />
      <form className={styles.form} onSubmit={e => submitAudio(e)}>
        <div className={styles.form_container}>
          <div className={styles.form_fields}>
            <Input
              required={true}
              label="Title"
              type="text"
              name="name"
              value={album.name || ''}
              onChange={e => {
                handleInput(e);
              }}
            />
            <Input
              required={true}
              label="Artiste"
              type="text"
              name="artiste"
              value={album.artiste || ''}
              onChange={e => {
                handleInput(e);
              }}
            />
          </div>
          <div className={styles.form_image}>
            <Input
              required={true}
              label="Image"
              type="file"
              name="image"
              value={album.image || ''}
              onChange={e => {
                handleInput(e);
              }}
            />
          </div>
        </div>
        <Button title="Ajouter une musique" type="submit" />
      </form>
    </div>
  );
};

export default Index;
