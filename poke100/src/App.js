import {useEffect,useState} from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=100')
    .then(response => response.json())
    .then((data) => {
      setData (data.results)
    })
  }
  , [])

  if (!data || !data.length) return null;
  
  return (
    <div className="App">
      <div className="Logo">
        <img src="icon.png" alt="logo"/>
        <p>100 Primeiros Pokémons</p>
      </div>

      <div className="carousel">
        {data.map((pokemon) => {
          const {name, url} = pokemon;
          const pokeId = url.split('/')[url.split('/').length-2];
          return(
            <div className="Pokemon" key={name}>
              <div className="id">
                <span className="Id">{pokeId}</span>
              </div>
              <div className="image">
                <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+ pokeId +".png"} alt="Pokémon"/>
              </div>
              <div className="name">
                <span className="Name">{name.charAt(0).toUpperCase() + name.slice(1)}</span>
              </div>
            </div>
          )
        })}
      </div> 
    </div>
  );
}

export default App;
