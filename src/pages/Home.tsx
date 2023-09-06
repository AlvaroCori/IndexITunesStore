import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { IonSearchbar, IonButton, IonItem, IonList, IonSelect, IonSelectOption } from '@ionic/react';

import React, { useEffect, useState } from "react";


//const urlAPI = "https://itunes.apple.com/search?term=";
//const request = urlAPI + "jack+johnson&limit=25";
//https://itunes.apple.com/search?term=jack+johnson&limit=25
const Home: React.FC = () => {
  //const express = require('express');
  //const app = express();
  const [data, setData] = useState([]);
  const fetchData = () => {
    fetch("https://itunes.apple.com/search?term=jack+johnson&enitity=all",
    {
      mode: "cors"
    }).then((response) => response.json())
    .then((json) => {
      console.log(json);
      setData(data);
    }).catch((error) => console.log(error));
  };
  useEffect(()=>{
    fetchData();
  }, []);
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
          <IonButton onClick={fetchData}>Buscar</IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer />
        <div>
          {data.length > 0 && (
            <ul>
              {
              data.map(d => (<li>LL</li>))
              }
            </ul>
          )}
        </div>
      </IonContent>
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
*/