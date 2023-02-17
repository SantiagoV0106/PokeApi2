const pokecard = document.getElementById('pokecard')
const pokemons = 10

const pokeIniciales = async () => {
    for (let i = 1; i < pokemons; i++) {
        await pokeapi(i)        
    }
}
async function pokeapi(id) {
    const res = await fetch (`https://pokeapi.co/api/v2/pokemon/${id}`)
    const data = await res.json()
    console.log(data);
    createpokecard(data)
}

pokeIniciales()

function createpokecard(data) {
    const pokeElement = document.createElement('div')
    pokeElement.classList.add('pokemon')
    const name = data.name[0].toUpperCase() + data.name.slice(1)
    const stats = data.stats.map((element)=> element.stat.name)
    const pokestats = stats.slice(0,3)
    const basestats = data.stats.map((element)=>element.base_stat)
    const pokebasestats = basestats.slice(0,3)
    const stat = pokestats.map((stat) =>{
        return `<li class='st'>${stat}</li>`
    }).join("")
    const base = pokebasestats.map((base) =>{
        return `<li class='base'>${base}</li>`
    }).join("")
    const pokeInnerHTML = `
    
    <div class = 'img-container'>  
    <img src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${data.id}.gif'
    />
    </div>    
    <div class="info">    
    <span class ="poke_id">#${data.id.toString().padStart(3,'0')}</span>
    <h3 class = 'name'>${name}</h3>
    <small class = 'type'>Type: <span>${data.types[0].type.name}</span></small>
    </div>
    <div class='stats'>
    <h2>Stats<h2>
    <div class='flex'>
    <ul>${stat}</ul>
    <ul>${base}</ul>    
    </div>
    </div>`

    pokeElement.innerHTML = pokeInnerHTML

    pokecard.appendChild(pokeElement)
}
