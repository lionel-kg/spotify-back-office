import React, {useRef} from 'react';
import Input from '@/components/Input';
import Button from '@/components/Button';
import styles from './index.module.scss';
const Index = ({onAddAudio}) => {
  const inputRef = useRef(null);

  const addAudio = e => {
    e.preventDefault();
    inputRef.current.click();
  };

  const handleFileChange = e => {
    e.preventDefault();
    console.log(e.target.files[0]);
    onAddAudio(e.target.files[0]);
  };

  return (
    <>
      <div className={styles.form_input}>
        <Input
          required={true}
          label="Audio File"
          type="file"
          name="audioFile"
          onChange={handleFileChange}
          inputRef={inputRef}
        />
      </div>
      <Button title="Ajouter une musique" onClick={addAudio} />
    </>
  );
};

export default Index;
