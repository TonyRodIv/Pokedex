const pokeName = document.querySelector('.pokeName');
const pokeNum = document.querySelector('.pokeNum');
const pokeImg = document.querySelector('.pokeImg');

const pokeForm = document.querySelector('.pokeForm');
const pokeInput = document.querySelector('.inputSearch');
const btnPrev = document.querySelector('.btnPrev');
const btnNext = document.querySelector('.btnNext');
const btnShiny = document.querySelector('.btnShiny');

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
    checkboxShiny.checked = false;
    pokeNum.innerHTML = '';
    pokeName.innerHTML = 'Loading...';
    const data = await fetchPokemon(pokemon);
    if (data) {
        pokeImg.style.display = 'block';
        pokeName.innerHTML = data.name;
        pokeNum.innerHTML = data.id;

        pokeImg.style.height = '18%'
        pokeImg.style.bottom = '55%'
            pokeImg.src = data['sprites']['other']['showdown']['front_default'];
        pokeInput.value = '';
        pokeSearch = data.id;
    } else {
        pokeImg.style.display = 'none';
        pokeNum.innerHTML = '';
        pokeName.innerHTML = 'Not found :(';
    }
};

let checkboxShiny = document.getElementById('shinyChange')

checkboxShiny.addEventListener("change", ()=>{
    if(checkboxShiny.checked){
        console.log(renderShiny())
    }else{
        console.log(renderPokemon(pokeSearch))
    }
})

const renderShiny = async () => {
    const data = await fetchPokemon(pokeSearch);
    pokeNum.innerHTML = data.id;
    if (data.id < 650) {
        pokeImg.style.height = '18%'
        pokeImg.style.bottom = '55%'
        pokeImg.src = data['sprites']['other']['showdown']['front_shiny'];
    }else{
        alert('ERRO 404 - NÃO TEMOS POKEMONS SHINY NA BASE DE DADOS')
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
