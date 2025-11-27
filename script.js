const searchBtn = document.getElementById("searchBtn");
const input = document.getElementById("pokemonInput");
const errorMsg = document.getElementById("errorMsg");

const card = document.getElementById("pokemonCard");
const image = document.getElementById("pokemonImage");
const nameText = document.getElementById("pokemonName");
const typeText = document.getElementById("pokemonType");
const hpText = document.getElementById("pokemonHP");
const attackText = document.getElementById("pokemonAttack");
const defenseText = document.getElementById("pokemonDefense");

const typeColors = {
  fire: "#ff7043",
  water: "#42a5f5",
  grass: "#66bb6a",
  electric: "#ffeb3b",
  ice: "#81d4fa",
  fighting: "#d32f2f",
  poison: "#ab47bc",
  ground: "#8d6e63",
  flying: "#90caf9",
  psychic: "#f06292",
  bug: "#9ccc65",
  rock: "#a1887f",
  ghost: "#7e57c2",
  dragon: "#5c6bc0",
  dark: "#424242",
  steel: "#b0bec5",
  fairy: "#f8bbd0",
  normal: "#e0e0e0"
};

searchBtn.addEventListener("click", getPokemon);

async function getPokemon() {
  const pokemonName = input.value.toLowerCase();

  if (!pokemonName) {
    errorMsg.textContent = "Please enter a Pokemon name";
    errorMsg.classList.remove("hidden");
    return;
  }

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

    if (!response.ok) {
      errorMsg.textContent = "Pokémon not found";
    }

    const data = await response.json();
    const type = data.types[0].type.name;

    image.src = data.sprites.front_default;
    nameText.textContent = data.name.toUpperCase();
    typeText.textContent = type.toUpperCase();
    typeText.style.background = typeColors[type] || "#eee";
    hpText.textContent = "HP: " + data.stats[0].base_stat;
    attackText.textContent = "Attack: " + data.stats[1].base_stat;
    defenseText.textContent = "Defense: " + data.stats[2].base_stat;

    errorMsg.classList.add("hidden")
    card.classList.remove("hidden");

  } catch (error) {
    errorMsg.classList.remove("hidden");
    card.classList.add("hidden");
  }
}

pokemonInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    searchBtn.click();
  }
})
