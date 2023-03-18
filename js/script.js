const pokeName = document.querySelector('.pokeName')
const pokeNum = document.querySelector('.pokeNum')
const pokeImg = document.querySelector('.pokeImg')
const fetchPokemon = async(pokemon)=>{
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    const data = await APIResponse.json();
    return data;
}

 const renderPokemon = async(pokemon)=>{
    const data = await fetchPokemon(pokemon);
    pokeName.innerHTML = data.name;
    pokeNum.innerHTML = data.id;
    pokeImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
 }
 renderPokemon('darkrai')