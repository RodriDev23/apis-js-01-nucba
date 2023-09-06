const fetchPokemonButton = document.getElementById("fetchPokemon");
const pokemonNumberInput = document.getElementById("pokemonNumber");
const pokemonInfoContainer = document.getElementById("pokemonInfo");

fetchPokemonButton.addEventListener("click", () => {
    const pokemonNumber = pokemonNumberInput.value;
    if (!pokemonNumber) {
        displayError("Por favor, ingrese un número de Pokémon válido.");
        return;
    }

    getPokemonData(pokemonNumber)
        .then((data) => {
            displayPokemonData(data);
        })
        .catch((error) => {
            displayError("No se encontró ningún Pokémon con ese número.");
        });
});

function getPokemonData(pokemonNumber) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("No se encontró ningún Pokémon con ese número.");
            }
            return response.json();
        });
}

function displayPokemonData(data) {
    const pokemonName = data.name;
    const pokemonTypes = data.types.map((type) => type.type.name).join(", ");
    const pokemonHeight = (data.height / 10).toFixed(1); // Convertir de decímetros a metros
    const pokemonWeight = (data.weight / 10).toFixed(1); // Convertir de hectogramos a kilogramos
    const pokemonImageUrl = data.sprites.front_default;

    const pokemonCard = `
        <div class="card">
            <img src="${pokemonImageUrl}" alt="${pokemonName}">
            <h2>${pokemonName}</h2>
            <p><strong>Tipo(s):</strong> ${pokemonTypes}</p>
            <p><strong>Altura:</strong> ${pokemonHeight} m</p>
            <p><strong>Peso:</strong> ${pokemonWeight} kg</p>
        </div>
    `;

    pokemonInfoContainer.innerHTML = pokemonCard;
}

function displayError(message) {
    const errorElement = document.createElement("div");
    errorElement.classList.add("error");
    errorElement.textContent = message;
    pokemonInfoContainer.innerHTML = "";
    pokemonInfoContainer.appendChild(errorElement);
}
