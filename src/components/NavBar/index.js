import React from "react";
import styles from "./index.module.scss";
import Image from "next/image";
import NavbarItem from "../NavbarItem";
import Button from "../Button";
import Logo from '../../../public/img/logo.png'
//Icons
import { BiAlbum,BiSearchAlt, BiSolidPlaylist } from "react-icons/bi";
import { RiFileMusicLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { BsFileEarmarkPerson } from "react-icons/bs";

const Index = () => {
    return ( 
        <div className={styles.navbar}>
            <nav>
                <div class="img_logo">
                    <Image src={Logo} alt="logo"  width={175} height={55}/>
                </div>
                <ul>
                    <NavbarItem link="./" title="Tableau de bord" icon={<RxDashboard size={30}/>}/>
                    <NavbarItem link="/search" title="Recherche" icon={<BiSearchAlt size={30}/>}/>
                    <NavbarItem link="/song" title="Musiques" icon={<RiFileMusicLine size={30}/>}/>
                    <NavbarItem link="/album" title="Albums" icon={<BiAlbum size={30}/>}/>
                    <NavbarItem link="/playlist" title="Playlists" icon={<BiSolidPlaylist size={30}/>}/>
                    <NavbarItem link="/artist" title="Artistes" icon={<BsFileEarmarkPerson size={30}/>}/>
                </ul>
                <Button
                    title="Ajouter une musique"
                    classNameName="btn_primary"
                />
            </nav>
        </div>
    );
}
 
export default Index;