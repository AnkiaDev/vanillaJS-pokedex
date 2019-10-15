const pokedex = document.getElementById("pokedex");

const fetchPokemon = async () => {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=151`;
  const res = await fetch(url);
  const data= await res.json();
  const pokemon = data.results.map((poke, index )=> ({
    ...poke,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
    id: index + 1,
  }));
  displayPokemon(pokemon);
};

const displayPokemon = (pokemon) => {
  pokemon.map((poke)=> {

    const listElt = document.createElement("li");
    listElt.classList = "card";
    listElt.addEventListener("click", () => {
        getPokemon(poke.id);
    });

    const imgElt = document.createElement("img");
    imgElt.src = `${poke.img}`;
    imgElt.classList = "card-img";

    const nameElt = document.createElement("h3");
    nameElt.textContent = `${poke.id}. ${poke.name}`;
    nameElt.classList = "card-title";

    listElt.appendChild(imgElt);
    listElt.appendChild(nameElt);

    pokedex.appendChild(listElt);
    
  })
};

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const results = await fetch(url);
  const pokeInfo = await results.json();
  displayPopup(pokeInfo);
}

const displayPopup = (poke) => {
  console.log(poke); 
  // A terminer !!!
}
fetchPokemon();
