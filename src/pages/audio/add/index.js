import React, {useEffect, useState} from 'react';
import Input from '../../../components/Input';
import PageTitle from '../../../components/PageTitle';
import Button from '../../../components/Button';
import styles from './index.module.scss';
import audioService from '../../../services/audio.service';

const Index = () => {
  const [audioForm, setAudioForm] = useState({title: '', audioFile: null});
  const [data, setData] = useState({});

  const handleFileChange = e => {
    setAudioForm({...audioForm, audioFile: e.target.files[0]});
  };

  const submitAudio = async e => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('file', audioForm.audioFile);

      const response = await audioService.uploadAudio(formData);

      setData(response);
    } catch (error) {
      console.error('Error uploading audio file:', error);
    }
  };

  return (
    <div>
      <PageTitle title="Ajouter une musique" />
      <form className={styles.form} onSubmit={submitAudio}>
        <div className={styles.form_container}>
          <div className={styles.form_fields}>
            <Input
              required={true}
              label="Audio File"
              type="file"
              name="audioFile"
              accept="audio/*"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <Button title="Ajouter une musique" type="submit" />
      </form>
    </div>
  );
};

export default Index;
