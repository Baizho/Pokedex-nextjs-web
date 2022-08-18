import { useState, useEffect } from 'react';
import Link from 'next/link';

function Card(props) {
  const [likes, setlikes] = useState(0);
  return (
    <>
      <div className="card col col-4 d-flex justify-content-center">
        <img src={props.src} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <Link href={{pathname: "pokemons/[name]", query: {name: props.title}}}>
            <a><strong>Press to go to Pokemon info!</strong></a>
          </Link>
          <p className="card-text">Likes: {likes}</p>
          <a href="#!" onClick={() => { setlikes(likes + 1) }} className="btn btn-primary">{props.buttonText}</a>
        </div>
      </div>
    </>
  )
}

function App() {
  const [pokemonList, setpokemonList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const limit = 20;
  useEffect(() => {
    setLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setLoading(false);
        setpokemonList([...pokemonList, ...json["results"]]);
      })
  }, [offset])
  return (
    <div className="App">
      <div className='container'>
        <div className='row'>
          {pokemonList.map((response) => {
            const id=getIdPokemon(response);
            return <Card
              key={id}
              id={id}
              title={response["name"]}
              buttonText="Likes"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`}
            />
          })}
        </div>

        <div className="row justify-content-center">
            {(isLoading === true ? <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div> : null)}
        </div>
        <div className="row justify-content-center">

          <button style={{ width: "6%" }} onClick={() => (setOffset(offset + limit))}>More</button>
        </div>
      </div>

    </div>
  );
}

function getIdPokemon(pokemon) {
  return pokemon.url.replace("https://pokeapi.co/api/v2/pokemon/", "").replace("/", "");
}

export default App;
