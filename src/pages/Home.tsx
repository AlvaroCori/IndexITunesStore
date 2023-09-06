import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import CardAlbum from '../components/CardAlbum';
import './Home.css';
import Album from './Album';
import { IonSearchbar, IonButton, IonItem, IonList, IonSelect, IonSelectOption } from '@ionic/react';
import { IonCol, IonGrid, IonRow } from '@ionic/react';

import { IonInput } from '@ionic/react';
import React, { useEffect, useState } from "react";
import { type } from 'os';

const urlAPI = "https://itunes.apple.com/search";
const request = urlAPI + "?term=jack+johnson&enitity=all";
const defaultQuery = urlAPI + "?term=all";

let propertyValues = Array();
const Home: React.FC = () => {
  const [isShown, setIsShown] = useState(false);
  
  const [data, setData] = useState(Object);
  const [searchText, setSearchText] = useState("");
  const [val, setVal] = useState("");

  const fetchData = (query=defaultQuery) => {
    console.log(query);
    fetch(query,
    {
      mode: "cors"
    }).then((response) => response.json())
    .then((datas) => {
      setData(datas);
    }).catch((error) => 
    {
      console.log(error);
    });
  };
  useEffect(()=>{
    fetchData(defaultQuery);
  }, []);
  
  function loadData(query = defaultQuery) {
    fetchData(query);
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
  }
  const handleClick = () => {
    setIsShown(current => !current);
    console.log(searchText, val, "values");
    if (searchText == "" && val == ""){
      loadData();
      return;
    }
    if (searchText != "" && val == ""){
      loadData(urlAPI+"?term="+searchText);
      return;
    }
    if (searchText == "" && val != ""){
      loadData(urlAPI+"?term="+val);
      return;
    }
    loadData(urlAPI+"?term="+searchText+"&enitity="+val);
  };
  const listChange = (e: any) => {
    const newVal = e.detail.value;
    setVal(newVal);
  };
  return (
    <IonPage>
      <IonHeader id="header">
        <IonToolbar>
          <IonTitle>APPLE</IonTitle>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonItem id="item">
                  <IonInput label="Buscar" placeholder="..." clearInput={true} value={searchText} onIonInput={(e: any) => setSearchText(e.target.value)}></IonInput>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonList id="list">
                  <IonItem>
                    <IonSelect aria-label="categories" interface="popover" placeholder="all" value={val} onIonChange={listChange}>
                      <IonSelectOption value="all">all</IonSelectOption>
                      <IonSelectOption value="song">music</IonSelectOption>
                      <IonSelectOption value="tv-episode">TV Show</IonSelectOption>
                      <IonSelectOption value="feature-movie">movie</IonSelectOption>
                      <IonSelectOption value="podcast">podcast</IonSelectOption>
                      <IonSelectOption value="music-video">musicVideo</IonSelectOption>
                    </IonSelect>
                  </IonItem>
                </IonList>
              </IonCol>
              <IonCol>       
                <IonButton id="button" onClick={handleClick}>Buscar</IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {isShown && (
          <div>
            {propertyValues.map(albumInfo => 
            {
              return (
                <IonGrid>
                  <CardAlbum albumCard={albumInfo}/>
                </IonGrid>)            
            })}
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;
