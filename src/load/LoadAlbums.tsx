const urlAPI = "https://itunes.apple.com/search";
const defaultQuery = urlAPI + "?term=all";
function fetchData(query=defaultQuery, setData:any){
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
export default function loadData(setData:any, data:any, query = defaultQuery) {
  fetchData(query, setData);
  try{
  return Object.values(data.results).map(values=>{
    let value = Object(values);
    let album = Object();
    album.id = value.trackId;
    album.name = value.trackName;
    album.kind = value.kind;
    album.artistName = value.artistName;
    album.price = value.trackPrice;
    album.image = value.artworkUrl100;
    return album;
  }).sort((firstValue, secondValue) => (firstValue.name > secondValue.name)? 1 : (firstValue.name < secondValue.name)? -1 : 0);
  }
  catch(error){
    console.log("A error occur in the datas.");
    console.log(error);
  }
  return [];
}

