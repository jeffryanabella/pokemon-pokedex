const searchBtn = document.getElementById("searchBtn");
const input = document.getElementById("pokemonInput");

const card = document.getElementById("pokemonCard");
const image = document.getElementById("pokemonImage");
const nameText = document.getElementById("pokemonName");
const typeText = document.getElementById("pokemonType");
const hpText = document.getElementById("pokemonHP");
const attackText = document.getElementById("pokemonAttack");
const defenseText = document.getElementById("pokemonDefense");

searchBtn.addEventListener("click", getPokemon);

async function getPokemon() {
  const pokemonName = input.value.toLowerCase();

  if (!pokemonName) {
    alert("Please enter a Pokémon name");
    return;
  }

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

    if (!response.ok) {
      throw new Error("Pokémon not found");
    }

    const data = await response.json();

    image.src = data.sprites.front_default;
    nameText.textContent = data.name.toUpperCase();
    typeText.textContent = "Type: " + data.types[0].type.name;
    hpText.textContent = "HP: " + data.stats[0].base_stat;
    attackText.textContent = "Attack: " + data.stats[1].base_stat;
    defenseText.textContent = "Defense: " + data.stats[2].base_stat;

    card.classList.remove("hidden");

  } catch (error) {
    alert("Pokémon not found!");
    card.classList.add("hidden");
  }
}
