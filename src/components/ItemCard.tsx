import './ItemCard.css';
import { IonCard,  IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { IonCol, IonRow } from '@ionic/react';
const ItemCard = (itemCard:any)=>{
    const item = itemCard.itemCard;
    return (
        <IonCol size="6">
            <IonCard className="carditem">
                <IonRow>
                    <IonCol size="4" className="ImgCol">
                        <img src={item.image?item.image:'../../public/defaultImg.png'} alt="default"></img>
                    </IonCol>
                    <IonCol size="8" className="TextCol">
                        <IonCardTitle className="text">{item.name?item.name:"Sin Titulo"}</IonCardTitle>
                        <IonCardSubtitle className="text">Artist:{item.artistName?item.artistName:"Anonymous"}</IonCardSubtitle>
                        <IonCardSubtitle className="text">Price: {item.price>0?(String(item.price)+"$"):"No apply"}</IonCardSubtitle>
                        <a href={item.link?(String(item.link)):""} target="_blank" rel="noreferrer" className="text">
                            <button>Go to page</button>
                        </a>
                    </IonCol>
                </IonRow>
            </IonCard>
            </IonCol>
    );
};
export default ItemCard;
