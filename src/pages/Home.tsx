import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import CardAlbum from '../components/CardAlbum';
import './Home.css';
import Album from './Album';
import { IonSearchbar, IonButton, IonItem, IonList, IonSelect, IonSelectOption } from '@ionic/react';

import React, { useEffect, useState } from "react";
import { type } from 'os';


const urlAPI = "https://itunes.apple.com/search";
const request = urlAPI + "?term=jack+johnson&enitity=all";
let propertyValues = Array();
//https://itunes.apple.com/search?term=jack+johnson&limit=25
const Home: React.FC = () => {
  const [isShown, setIsShown] = useState(false);
  
  const [data, setData] = useState(Object);
  
  const fetchData = () => {
    fetch(request,
    {
      mode: "cors"
    }).then((response) => response.json())
    .then((datas) => {
      setData(datas);
    }).catch((error) => 
    {
      console.log("error");
      console.log(error);
    });
  };
  useEffect(()=>{
    fetchData();
  }, []);
  function loadData() {
    fetchData();
    try{
      propertyValues = Object.values(data.results).map(values=>{
       let value = Object(values);
       let album = Object();
       album.id = value.trackId;
       album.name = value.trackName;
       album.kind = value.kind;
       album.artistName = value.artistName;
       album.price = value.trackPrice;
       album.image = value.artworkUrl100;
       return album;
      });
    }catch(error){
      console.log(error);
    }
    console.log(propertyValues);
  }
  const handleClick = () => {
    setIsShown(current => !current);
    loadData();
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
          <IonTitle>Ready</IonTitle>
          <IonSearchbar placeholder="Custom Placeholder"></IonSearchbar>
          <IonList>
            <IonItem>
              <IonSelect placeholder="all">
                <IonSelectOption value="all">all</IonSelectOption>
                <IonSelectOption value="music">music</IonSelectOption>
                <IonSelectOption value="TV Show">TV Show</IonSelectOption>
              </IonSelect>
            </IonItem>       
          </IonList>   
          <IonButton onClick={handleClick}>Buscar</IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        {isShown && (
          <div>
            {propertyValues.map(album => 
            {
              return (<div>
                        <img src={album.image} alt="default"></img>
                        <h1>{album.name}</h1>
                        <h4>Artista:{album.artistName}</h4>
                        <h4>Precio: {album.price}$</h4>
                      </div>)
            })}
          </div>
        )}
      </IonContent>
      <div>
      </div>
    </IonPage>
  );
};

export default Home;
/*
<div>
          {users.length > 0 && (
            <ul>
              {
              users.map(user => (<li>LL</li>))
              }
            </ul>
          )}
        </div>

<ExploreContainer />
*/