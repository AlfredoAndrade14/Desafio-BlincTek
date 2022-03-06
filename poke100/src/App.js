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

  const leftClick = (event) => {
    event.preventDefault();

    carousel.current.scrollLeft -= carousel.current.offsetWidth + 14.9876;
  }
  
  const startClick = (event) => {
    event.preventDefault();
  
    carousel.current.scrollLeft = 0;
    console.log(carousel.current.scrollLeftMax)
  }

  const rightClick = (event) => {
    event.preventDefault();
    
    carousel.current.scrollLeft += carousel.current.offsetWidth + 14.9876;
  }

  const endClick = (event) => {
    event.preventDefault();
  
    carousel.current.scrollLeft = carousel.current.scrollLeftMax;
  }

  if (!data || !data.length) return null;
  
  return (
    <div className="App">
      <div className="Logo">
        <img src="icon.png" alt="logo"/>
      </div>

      <div className='Titulo'>
        <h1>100 Primeiros Pokémons</h1>
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
        <button onClick ={startClick}><img src="https://img.icons8.com/clouds/50/000000/left.png" alt="Scroll Start"/></button>
        <button onClick ={leftClick}><img src="https://img.icons8.com/clouds/50/000000/back.png" alt="Scroll Left"/></button>
        <button onClick ={rightClick}><img src="https://img.icons8.com/clouds/50/000000/forward.png" alt="Scroll Right"/></button>
        <button onClick ={endClick}><img src="https://img.icons8.com/clouds/50/000000/right.png" alt="Scroll End"/></button>
      </div>
    </div>
  );
}

export default App;
