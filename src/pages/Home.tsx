import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import CardAlbum from '../components/CardAlbum';
import './Home.css';
import { IonButton, IonItem, IonList, IonSelect, IonSelectOption } from '@ionic/react';
import { IonCol, IonGrid, IonRow } from '@ionic/react';
import { IonInput } from '@ionic/react';
import React, { useState } from "react";
import loadData from '../load/LoadAlbums';
const urlAPI = "https://itunes.apple.com/search";

let propertyValues = Array();
const Home: React.FC = () => {
  let cardNumber = 0;
  let firstCard: any;
  const [isShown, setIsShown] = useState(false);
  const [data, setData] = useState(Object);
  const [searchText, setSearchText] = useState("");
  const [val, setVal] = useState("");
  const getAlbumCards = () =>{
    if (searchText == "" && val == ""){
      propertyValues = loadData(setData, data);
      console.log(propertyValues);
      console.log(propertyValues.sort(a => a.price));
      return;
    }
    if (searchText != "" && val == ""){
      propertyValues = loadData(setData, data, urlAPI+"?term="+searchText);
      return;
    }
    if (searchText == "" && val != ""){
      propertyValues = loadData(setData, data, urlAPI+"?term="+val);
      return;
    }
    propertyValues = loadData(setData, data, urlAPI+"?term="+searchText+"&enitity="+val);
  }
  const handleClick = () => {
    setIsShown(true);
    getAlbumCards();
    getAlbumCards();
  };
  console.log("0", isShown);
  const listChange = (e: any) => {
    const newVal = e.detail.value;
    setVal(newVal);
  };
  return (
    <IonPage>
      <IonHeader id="header">
        <IonToolbar>
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
        <IonGrid id="bodyCards">
        {isShown && (
          <div>
            {propertyValues.map(albumInfo => 
            {
              let card;
              if (cardNumber == propertyValues.length - 1 && propertyValues.length % 2 == 0)
              {
                cardNumber = 0;
                return (<CardAlbum albumCard={albumInfo}/>);
              }
              if (cardNumber%2 == 0)
              {
                firstCard = (<CardAlbum albumCard={albumInfo}/>);
              }
              else{
                card = (<IonRow>{(firstCard)}<CardAlbum albumCard={albumInfo}/></IonRow>);
              }
              cardNumber = cardNumber + 1;
              return (card);
            })
            }
          </div>
        )}
        </IonGrid>
        {
          propertyValues.length == 0 && (
            <IonTitle id="voidTitle">WITHOUT RESULTS</IonTitle>
          )
        }
      </IonContent>
    </IonPage>
  );
};

export default Home;

/*
<IonTitle>APPLE</IonTitle>
*/