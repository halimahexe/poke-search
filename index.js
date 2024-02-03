const form = document.querySelector('#pokeForm'); // Form containing search box
const output = document.querySelector('#output'); // Output where search result appears
const pokeballs = document.querySelectorAll('.pokeball');

// Setting Pokeball images to default (closed) before search
pokeballs.forEach((pokeball) => {
    pokeball.setAttribute('src', 'assets/Pokeball.svg')
    pokeball.alt = 'closed pokeball';
});

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = formData.get('name').toLowerCase();

    // Reset search bar after searching
    form.reset();

    // Reset output so search results don't stack
    output.innerHTML = '';
    
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.status)
            }
            return response.json();
        })
        .then((pokemonData) => {
            console.log(pokemonData);
            // Adding searched name as a header
            const heading = document.createElement('h2');
            heading.textContent = pokemonData.name[0].toUpperCase() + pokemonData.name.slice(1); //capitalise first letter
            
            // Adding fetched avatar to the output
            const avatar = document.createElement('img');
            avatar.src = pokemonData.sprites.front_default;
            avatar.alt = '';
            
            output.append(heading, avatar);

            // Adding Pokemon type
            const types = pokemonData.types
            types.forEach((type) => {
                const pokeType = type.type.name;
                const p = document.createElement('p');
                p.textContent = pokeType;
                p.classList.add('pokemon-type', `pokemon-type--${pokeType}`) // styles the box containing type depending on name
                output.append(p);
            })
        })
        .catch((error) => {
            if (error.message === '404') {
                let message = document.createElement('p');
                message.textContent = `⚠️ Couldn't find "${name}"`;
                output.append(message);
                meme();
            } else {
                let message = document.createElement('p');
                message.textContent = `⚠️ Something went wrong`;
                output.append(message);
                meme();
            }
        });

    // Pokeballs open when the pokemon appears!
    pokeballs.forEach((pokeball) => {
        pokeball.src = 'assets/Open-Pokeball.svg';
        pokeball.alt = 'open pokeball';
    });
})

// Code to display meme in case of error message
function meme() {
    const meme = document.createElement('img');
    meme.src = 'assets/meme_surprised_shocked_pikachu.svg';
    meme.setAttribute('class','img-md');
    meme.alt = 'surprised pikachu'; // setting alt text for image
    output.append(meme);
}