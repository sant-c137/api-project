import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from './components/Card.jsx';
import './App.css';
import './components/Card.css';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonNumber, setPokemonNumber] = useState(1); // Estado para almacenar el número inicial de pokemons
  const [limit, setLimit] = useState(10); // Estado para almacenar el límite de pokemons

  useEffect(() => {
    const getPokemonData = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${pokemonNumber - 1}&limit=${limit}`);
        const pokemonList = response.data.results;
        const updatedPokemonList = await Promise.all(pokemonList.map(async (pokemonData, index) => {
          const pokemonResponse = await axios.get(pokemonData.url);
          const pokemon = pokemonResponse.data;
          return {
            number: pokemonNumber + index,
            name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
            image: pokemon.sprites.other['official-artwork'].front_default,
            types: pokemon.types.map(type => type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)),
          };
        }));
        setPokemons(updatedPokemonList);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getPokemonData();
  }, [pokemonNumber, limit]); // Ejecutar efecto cuando el número inicial o el límite cambien

  const handleNumberChange = (event) => {
    setPokemonNumber(parseInt(event.target.value)); // Actualizar el estado del número inicial con el valor del input
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value)); // Actualizar el estado del límite con el valor del input
  };

  return (
    <>
      <div>
        <p>Desde qué número de Pokémon quieres empezar</p>
        <input type="number" value={pokemonNumber} onChange={handleNumberChange} min='1'/>
      </div>
      <div>
        <p>Cantidad de pokemons que quieres ver</p>
        <input type="number" value={limit} onChange={handleLimitChange} min='1' />
      </div>

      <div className="container">
        {pokemons.length === 0 && <p>Loading...</p>}
        {pokemons.map((pokemon) => (
          <Card
            key={pokemon.number}
            number={pokemon.number}
            image={pokemon.image}
            name={pokemon.name}
            types={pokemon.types}
          />
        ))}
      </div>
    </>
  );
}

export default App;
