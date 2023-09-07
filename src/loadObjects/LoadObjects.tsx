const urlAPI = "https://itunes.apple.com/search";
const defaultQuery = urlAPI + "?term=all";
function fetchData(query=defaultQuery, setData:any){
  fetch(query,
  {
    mode: "cors"
  }).then((response) => response.json())
  .then((datas) => {
    setData(datas);
  }).catch((error) => 
  {
    console.log("A error occur during the fetch.");
    console.log(error);
  });
};
export default function loadData(setData:any, data:any, query = defaultQuery) {
  try{
    fetchData(query, setData);
    return Object.values(data.results).map(values=>{
      let value = Object(values);
      let item = Object();
      item.id = value.trackId;
      item.name = value.trackName;
      item.kind = value.kind;
      item.artistName = value.artistName;
      item.price = value.trackPrice;
      item.image = value.artworkUrl100;
      item.link = value.collectionViewUrl;
      return item;
    }).sort((firstValue, secondValue) => (firstValue.name > secondValue.name)? 1 : (firstValue.name < secondValue.name)? -1 : 0);
  }
  catch(error){
    console.log("A error occur in the datas.");
    console.log(error);
  }
  return [];
}

