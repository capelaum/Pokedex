/* https://pokeapi.co */

const types = [
  "fire",
  "grass",
  "electric",
  "water",
  "ground",
  "rock",
  "fairy",
  "poison",
  "bug",
  "dragon",
  "psychic",
  "flying",
  "fighting",
  "normal",
];

const POKEMON_COUNT = 12;

const cardHTML = `
<div class="card id="card-{id}">
  <div class="title">
    <h2>{name}</h2>
    <small># {id}</small>
  </div>
  <div class="img bg-{type}">
    <img src="https://pokeres.bastionbot.org/images/pokemon/{id}.png" alt="{name}">
  </div>
  <div class="type {type}">
    <p>{type}</p>
  </div>
  <button class="favorite" data-id="{id}">
    <div class="heart">
    </div>
  </button>
</div>
`;

const cards = document.querySelector('.cards');

const getType = (data) => {
  const apiTypes = data.map((type) => type.type.name);
  const type = types.find((type) => apiTypes.indexOf(type) > -1);
  // console.log(apiTypes)
  return type;
};

const fetchPokemon = async (pokemonId) => {
  if (!pokemonId) return;
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;

  const response = await fetch(url).then((response) => response.json());
  // console.log(response);

  const { id, name, types } = response;
  const type = getType(types);

  return { id, name, type };
};

const fetchAllPokemons = async () => {
  for (let i = 1; i <= POKEMON_COUNT; i++) {
    const pokemon = await fetchPokemon(i);
    createPokemonCard(pokemon)
  }
};

fetchAllPokemons();

const replacer = (text, source, destination) => {
  const regex = new RegExp(source, "gi");
  return text.replace(regex, destination);
};

const createPokemonCard = (pokemon) => {
  const { id, name, type } = pokemon;
  let newCard = replacer(cardHTML, "{id}", id);
  newCard = replacer(newCard, "{name}", name);
  newCard = replacer(newCard, "{type}", type);

  cards.innerHTML += newCard;
};
