import React, { useState, useEffect, useRef } from 'react';
import fakeData from '../../fakeData';
import Input from '../../../components/Input'
import PageTitle from "../../../components/PageTitle";
import Button from "../../../components/Button";
import styles from "./index.module.scss";

const Index = () => {
    const [songForm, setSongForm] = useState({})

    const handleInput = (e) => {
        console.log(e.target.value);
        setSongForm({ ...songForm, [e.target.name]: e.target.value });
    }
  
  
    const submitSong = (e) => {
        e.preventDefault();

        console.log(songForm );
    };
  
    return (
      <div>
        <PageTitle title="Ajouter une musique" />
        <form className={styles.form} onSubmit={(e) => submitSong(e)}>
            <div className={styles.form_container}>
                <div className={styles.form_fields}>
                    <Input required={true} label="Title" type="text" name="name" value={songForm.name || ""} onChange={(e) => {handleInput(e);}} /> 
                    <Input required={true} label="Album" type="text" name="album" value={songForm.album || ""} onChange={(e) => {handleInput(e);}} /> 
                    <Input required={true} label="Artiste" type="text" name="artiste" value={songForm.artiste || ""} onChange={(e) => {handleInput(e);}} /> 
                </div>
                <div className={styles.form_image}>
                    <Input required={true} label="Image" type="file" name="image" value={songForm.image || ""} onChange={(e) => {handleInput(e);}} />
                </div>
            </div>
            <Button title="Ajouter une musique" type="submit" />
        </form>
      </div>
    );
}
 
export default Index;