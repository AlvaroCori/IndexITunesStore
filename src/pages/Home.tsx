import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import CardAlbum from '../components/CardAlbum';
import './Home.css';
import Album from './Album';
import { IonSearchbar, IonButton, IonItem, IonList, IonSelect, IonSelectOption } from '@ionic/react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { IonInput } from '@ionic/react';
import React, { useEffect, useState } from "react";
import { type } from 'os';


const urlAPI = "https://itunes.apple.com/search";
const request = urlAPI + "?term=jack+johnson&enitity=all";
const defaultQuery = urlAPI + "?term=all";

let propertyValues = Array();
//https://itunes.apple.com/search?term=jack+johnson&enitity=all
const Home: React.FC = () => {
  const [isShown, setIsShown] = useState(false);
  
  const [data, setData] = useState(Object);
  const [searchText, setSearchText] = useState("");
  
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
      console.log("error");
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
    console.log(propertyValues);
  }
  const handleClick = () => {
    setIsShown(current => !current);
    console.log(searchText);
    if (searchText == ""){
      console.log("here");
      loadData();
    }
    else{
      console.log("here_2");
      loadData(urlAPI+"?term="+searchText);
    }
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
          <IonTitle>Ready</IonTitle>
          
          <IonItem>
            <IonInput label="Buscar" placeholder="..." clearInput={true} value={searchText} onIonInput={(e: any) => setSearchText(e.target.value)}></IonInput>
          </IonItem>
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
              return (<IonCard>
                        <img src={album.image?album.image:'../../dist/defaultImage.png'} alt="default"></img>
                        <IonCardTitle>{album.name?album.name:"Sin Titulo"}</IonCardTitle>
                        <IonCardSubtitle>Artista:{album.artistName?album.artistName:"Anonimo"}</IonCardSubtitle>
                        <IonCardSubtitle>Precio: {album.price>0?(String(album.price)+"$"):"No aplica"}</IonCardSubtitle>
                      </IonCard>)
            })}
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;
/*
<IonSearchbar placeholder="Custom Placeholder" value={searchText} onIonChange={e => setSearchText(e.detail.value!)}></IonSearchbar>
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