import PropTypes from 'prop-types';

export const Card = ({ image, number, name, types }) => {
  const typeColors = {
    Normal: '#A8A878',
    Fire: '#F08030',
    Water: '#6890F0',
    Electric: '#F8D030',
    Grass: '#78C850',
    Ice: '#98D8D8',
    Fighting: '#C03028',
    Poison: '#A040A0',
    Ground: '#E0C068',
    Flying: '#A890F0',
    Psychic: '#F85888',
    Bug: '#A8B820',
    Rock: '#B8A038',
    Ghost: '#705898',
    Dragon: '#7038F8',
    Dark: '#705848',
    Steel: '#B8B8D0',
    Fairy: '#EE99AC'
  };
  
  

  return (
    <div className="pokemon-card">
      <img src={image} alt={name} />
      <h1>#{number}</h1>
      <p>{name}</p>
      <div className="pokemons-types">
        {types.map((type, index) => (
          <div key={index} style={{ backgroundColor: typeColors[type] }}>
            {type}
          </div>
        ))}
      </div>
    </div>
  );
};


Card.propTypes = {
  image: PropTypes.string.isRequired, 
  number: PropTypes.number.isRequired, 
  name: PropTypes.string.isRequired, 
  types: PropTypes.arrayOf(PropTypes.string).isRequired 
}