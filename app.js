const pokedex = document.getElementById("pokedex");
const searchBar = document.getElementById("searchPoke");

const fetchPokemon = async () => {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=151`;
  const res = await fetch(url);
  const data = await res.json();
  const pokemon = data.results.map((poke, index) => ({
    ...poke,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index +
      1}.png`,
    id: index + 1
  }));

  if (searchBar.value.length === 0) {
    displayPokemon(pokemon);
  } 
  else {
    const filteredPoke = pokemon.filter(poke => {
      return poke.name.toLowerCase().includes(searchBar.value.toLowerCase());
    });
    displayPokemon(filteredPoke);
  }

  searchBar.addEventListener("input", event => {
    let filteredPoke = pokemon.filter(poke => {
      return poke.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
    pokedex.innerHTML = "";
    displayPokemon(filteredPoke);
  });
};



const displayPokemon = pokemon => {
  pokemon.map(poke => {
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
  });
};

const getPokemon = async id => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const results = await fetch(url);
  const pokeInfo = await results.json();
  displayPopup(pokeInfo);
};

const displayPopup = poke => {
  const type = poke.types.map(type => type.type.name).join(", ");
  const img = poke.sprites.front_default;
  const popupDiv = document.createElement("div");
  popupDiv.setAttribute("id", "popup");
  const closeBtn = document.createElement("button");
  closeBtn.setAttribute("id", "closeBtn");
  closeBtn.textContent = "Close";
  closeBtn.addEventListener("click", () => {
    closePopup();
  });
  const classCard = document.createElement("div");
  classCard.setAttribute("class", "card");
  const imgElt = document.createElement("img");
  imgElt.src = `${img}`;
  imgElt.classList = "card-img";
  const nameElt = document.createElement("h3");
  nameElt.textContent = `${poke.id}. ${poke.name}`;
  nameElt.classList = "card-title";
  const infoElt = document.createElement("p");
  infoElt.textContent = `Height: ${poke.height} | weight: ${poke.weight} | type: ${type}`;
  classCard.appendChild(imgElt);
  classCard.appendChild(nameElt);
  classCard.appendChild(infoElt);
  classCard.appendChild(closeBtn);
  popupDiv.appendChild(classCard);
  pokedex.innerHTML = "";
  pokedex.appendChild(popupDiv);
};

const closePopup = () => {
  pokedex.innerHTML = "";
  fetchPokemon();
};

fetchPokemon();
