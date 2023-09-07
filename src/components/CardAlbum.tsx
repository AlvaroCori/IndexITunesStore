import './CardAlbum.css';
import { IonCard,  IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { IonCol, IonRow } from '@ionic/react';
const CardAlbum = (albumCard:any)=>{
    //const {name, price} = albumInfo;
    const album = albumCard.albumCard;
    return (
        <IonCol size="6">
            <IonCard className="cardAlbum">
                <IonRow>
                    <IonCol size="4" className="ImgCol">
                        <img src={album.image?album.image:'../../dist/defaultImage.png'} alt="default"></img>
                    </IonCol>
                    <IonCol size="8" className="TextCol">
                        <IonCardTitle className="text">{album.name?album.name:"Sin Titulo"}</IonCardTitle>
                        <IonCardSubtitle className="text">Artista:{album.artistName?album.artistName:"Anonimo"}</IonCardSubtitle>
                        <IonCardSubtitle className="text">Precio: {album.price>0?(String(album.price)+"$"):"No aplica"}</IonCardSubtitle>
                        <a href={album.link?(String(album.link)):""} target="_blank" rel="noreferrer" className="text">
                            <button>Go to page</button>
                        </a>
                    </IonCol>
                </IonRow>
            </IonCard>
            </IonCol>
    );
};
export default CardAlbum;
