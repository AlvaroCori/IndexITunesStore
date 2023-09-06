import React, { useEffect, useState } from "react";

const [data, setData] = useState(Object);

class AlbumController {
    defaultQuery: string;
    propertyValues: Array<Object>;
    constructor()
    {
        const urlAPI = "https://itunes.apple.com/search";
        const request = urlAPI + "?term=jack+johnson&enitity=all";
        this.defaultQuery = urlAPI + "?term=all";
        this.propertyValues = Array();
    }
    fetchData(query=this.defaultQuery){
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
      useEffect(){
        this.fetchData();
      }
      loadData(query = this.defaultQuery) {
        this.fetchData(query);
        try{
           this.propertyValues = Object.values(data.results).map(values=>{
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
}
export default AlbumController;