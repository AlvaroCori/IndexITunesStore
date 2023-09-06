import React from "react";
import { IonCard,  IonCardSubtitle, IonCardTitle } from '@ionic/react';
const CardAlbum = (albumCard:any)=>{
    //const {name, price} = albumInfo;
    const album = albumCard.albumCard;
    return (
        <IonCard>
            <img src={album.image?album.image:'../../dist/defaultImage.png'} alt="default"></img>
            <IonCardTitle>{album.name?album.name:"Sin Titulo"}</IonCardTitle>
            <IonCardSubtitle>Artista:{album.artistName?album.artistName:"Anonimo"}</IonCardSubtitle>
            <IonCardSubtitle>Precio: {album.price>0?(String(album.price)+"$"):"No aplica"}</IonCardSubtitle>
        </IonCard>
    );
};
export default CardAlbum;
