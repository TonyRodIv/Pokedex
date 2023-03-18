const pokeName = document.querySelector('.pokeName');
const pokeNum = document.querySelector('.pokeNum');
const pokeImg = document.querySelector('.pokeImg');

const pokeForm = document.querySelector('.pokeForm');
const pokeInput = document.querySelector('.inputSearch');
const btnPrev = document.querySelector('.btnPrev');
const btnNext = document.querySelector('.btnNext');

let pokeSearch = 1;
const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    console.log(APIResponse)
    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
};

const renderPokemon = async (pokemon) => {
    pokeNum.innerHTML = '';
    pokeName.innerHTML = 'Loading...';
    const data = await fetchPokemon(pokemon);
    if (data) {
        pokeImg.style.display = 'block';
        pokeName.innerHTML = data.name;
        pokeNum.innerHTML = data.id;

        pokeImg.style.height = '18%'
        pokeImg.style.bottom = '55%'
        if (data.id < 650) {
            pokeImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        } else if (data.id < 722) {
            pokeImg.src = data['sprites']['versions']['generation-vi']['x-y']['front_default'];

        } else if (data.id < 808) {
            pokeImg.src = data['sprites']['versions']['generation-vii']['ultra-sun-ultra-moon']['front_default'];
            pokeImg.style.height = '28%'
            pokeImg.style.bottom = '51.5%'
        } else if (data.id < 1009) {
            pokeImg.src = data['sprites']['front_default'];
            pokeImg.style.height = '28%'
            pokeImg.style.bottom = '51.5%'
        } else {
            pokeImg.style.display = 'none';
            pokeNum.innerHTML = '';
            pokeName.innerHTML = 'Not found :(';
        }
        pokeInput.value = '';
        pokeSearch = data.id;
    } else {
        pokeImg.style.display = 'none';
        pokeNum.innerHTML = '';
        pokeName.innerHTML = 'Not found :(';
    }
};

pokeForm.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('enviando formulário...');
    renderPokemon(pokeInput.value.toLowerCase());
});
btnPrev.addEventListener('click', () => {
    if (pokeSearch > 1) {
        pokeSearch -= 1
        renderPokemon(pokeSearch)
    }
});
btnNext.addEventListener('click', () => {
    pokeSearch += 1
    renderPokemon(pokeSearch)
});
renderPokemon(pokeSearch)
