const form = document.querySelector('#pokeForm');
const output = document.querySelector('#output');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = formData.get('name');

    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.status)
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
        })
        .catch((error) =>
            console.error(error)
        );
})