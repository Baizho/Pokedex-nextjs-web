import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

function Card(props) {
  return (
    <>
      <div className="card col col-4 d-flex justify-content-center">
      <Image src={props.src} className="card-img-top" alt="..." width="100%"  height="175%"/>
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
        </div>
        <p>{props.weight}</p>
      </div>
    </>
  )
}

export default function Pokemon() {
  const router = useRouter();
  const name = router.query.name;
  const [pokemon, setpokemon] = useState({});
  useEffect(() => {
    if (!router.isReady) { return; }
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setpokemon({ weight: json["weight"], species: json["species"], url: json.species.url });
      })
  }, [router.isReady]);
  if (!pokemon.url) { return; }
  return (
    <>
      <div className="App">
        <div className="container">
          <div className="row justify-content-center">
            <Card
              key={getIdPokemon(pokemon)}
              weight={pokemon.weight}
              title={name}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${getIdPokemon(pokemon)}.png`}
            />
          </div>
          <div className="row justify-content-center">
            <Link href="../">
              <a className="btn btn-primary">Go back to Pokedex</a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

function getIdPokemon(pokemon) {
  return pokemon.url.replace("https://pokeapi.co/api/v2/pokemon-species/", "").replace("/", "");
}