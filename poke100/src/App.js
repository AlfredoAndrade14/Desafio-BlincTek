import { useEffect, useState, useRef } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const carousel = useRef(null);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=100')
    .then(response => response.json())
    .then((data) => {
      setData (data.results)
    })
  }
  , [])

  const leftClick = (e) => {
    e.preventDefault();

    carousel.current.scrollLeft -= carousel.current.offsetWidth + 15;
  }

  const rightClick = (e) => {
    e.preventDefault();
    
    carousel.current.scrollLeft += carousel.current.offsetWidth + 15;
  }

  if (!data || !data.length) return null;
  
  return (
    <div className="App">
      <div className="Logo">
        <img src="icon.png" alt="logo"/>
        <p></p>
      </div>

      <div className="carousel" ref={carousel}>
        {data.map((pokemon) => {
          const {name, url} = pokemon;
          const pokeId = url.split('/')[url.split('/').length-2];

          let id = pokeId;
          for(var i = 0; i < (3 - pokeId.length); i++) {
            id = '0' + id
          }
          id = '#' + id
          
          return(
            <div className="Pokemon" key={name}>
              <div className="id">
                <span className="Id">{id}</span>
              </div>
              <div className="image">
                <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+ pokeId +".png"} alt={name}/>
              </div>
              <div className="name">
                <span className="Name">{name.charAt(0).toUpperCase() + name.slice(1)}</span>
              </div>
            </div>
          )
        })}
      </div> 

      <div className='buttons'>
        <button onClick ={leftClick}><img src="https://img.icons8.com/clouds/50/000000/back.png" alt="Scroll Left"/></button>
        <button onClick ={rightClick}><img src="https://img.icons8.com/clouds/50/000000/forward.png" alt="Scroll Right"/></button>
      </div>
    </div>
  );
}

export default App;
