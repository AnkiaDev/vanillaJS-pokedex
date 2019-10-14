const pokedex = document.getElementById("pokedex");

const fetchPokemon = () => {
  const promises = [];
  for (let i = 1; i <= 151; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then(res => res.json()));
  }

  Promise.all(promises).then(results => {
    const pokemon = results.map(data => ({
      id: data.id,
      name: data.name,
      img: data.sprites.front_default,
      type: data.types.map(type => type.type.name).join(", ")
    }));
    displayPokemon(pokemon);
    console.log(pokemon)
  });
};

const displayPokemon = (pokemon) => {
  pokemon.map((poke)=> {

    const listElt = document.createElement("li");

    const imgElt = document.createElement("img");
    imgElt.src = `${poke.img}`;

    const nameElt = document.createElement("h3");
    nameElt.textContent = `${poke.id}. ${poke.name}`;

    const typeElt = document.createElement("p");
    typeElt.textContent = `${poke.type}`;

    listElt.appendChild(imgElt);
    listElt.appendChild(nameElt);
    listElt.appendChild(typeElt);

    pokedex.appendChild(listElt);
    
  })
};

fetchPokemon();
