import React from "react";
import styles from "./index.module.scss";
import Image from "next/image";
const Index = () => {
    return ( 
        <div class={styles.header}>
            <nav>
                <div class="img_logo">
                    <Image src="/img/logo.png" alt="logo"  width={200} height={60}/>
                </div>
                <ul>
                    <li>Dashboardsssssssssssssss</li>
                    <li>Playlists</li>
                    <li>Customer</li>
                </ul>
            </nav>
        </div>
    );
}
 
export default Index;