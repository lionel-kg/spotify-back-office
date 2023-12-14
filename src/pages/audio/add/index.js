import React, {useEffect, useState} from 'react';
import Input from '../../../components/Input';
import PageTitle from '../../../components/PageTitle';
import Button from '../../../components/Button';
import styles from './index.module.scss';
import {uploadAudio} from '../../../services/audio.service';
import LottieLoading from '../../../components/LottieLoading/index';

const Index = () => {
  const [audioForm, setAudioForm] = useState({title: '', audioFile: null});
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleFileChange = e => {
    setAudioForm({...audioForm, audioFile: e.target.files[0]});
  };

  const submitAudio = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', audioForm.audioFile);
      const response = await uploadAudio(formData);
      setData(response);
      setLoading(false);
    } catch (error) {
      console.error('Error uploading audio file:', error);
    }
  };

  return (
    <div>
      <PageTitle title="Ajouter une musique" />
      <form className={styles.form} onSubmit={submitAudio}>
        <div className={styles.form_container}>
          {loading === false ? (
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
          ) : (
            <LottieLoading></LottieLoading>
          )}
        </div>
        <Button title="Ajouter une musique" type="submit" />
      </form>
    </div>
  );
};

export default Index;
