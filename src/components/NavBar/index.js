import React from 'react';
import styles from './index.module.scss';
import Image from 'next/image';
import NavbarItem from '../NavbarItem';
import Button from '../Button';
import {useRouter} from 'next/router';

//Icons
import {BiAlbum, BiSearchAlt, BiSolidPlaylist} from 'react-icons/bi';
import {RiFileMusicLine} from 'react-icons/ri';
import {RxDashboard} from 'react-icons/rx';
import {BsFileEarmarkPerson} from 'react-icons/bs';

const Index = () => {
  const router = useRouter();

  const handleButton = () => {
    router.push('/audio/add');
  };

  const handleDragOver = e => {
    e.preventDefault();
  };

  const handleDrop = e => {
    e.preventDefault();

    const files = e.dataTransfer.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
    }
  };

  return (
    <nav
      className={styles.navbar}
      onDragOver={handleDragOver}
      onDrop={handleDrop}>
      <Image src="/logo.png" alt="logo" width={175} height={55} />

      <ul>
        <NavbarItem
          link="./"
          title="Tableau de bord"
          icon={<RxDashboard size={30} />}
        />
        <NavbarItem
          link="/audio"
          title="Musiques"
          icon={<RiFileMusicLine size={30} />}
        />
        <NavbarItem link="/album" title="Albums" icon={<BiAlbum size={30} />} />
        <NavbarItem
          link="/artist"
          title="Artistes"
          icon={<BsFileEarmarkPerson size={30} />}
        />
      </ul>

      <Button
        title="Ajouter une musique"
        onClick={handleButton}
        className="btn_primary"
        draggable="true"
      />
    </nav>
  );
};

export default Index;
