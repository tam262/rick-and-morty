const id = sessionStorage.getItem('user')

function fetchData() {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
        .then(res => res.json())
        .then(res => characters(res))
}

function characters(data) {
    const card = document.querySelector('.character')
    const img = document.createElement('img')
    img.setAttribute('src', data.image)
    const name = document.createElement('h1')
    name.textContent = data.name
    const gender = document.createElement('p')
    const species = document.createElement('p')
    const charStatus = document.createElement('p')
    const origin = document.createElement('p')
    const location = document.createElement('p')
    gender.textContent = 'Gender: ' + data.gender
    species.textContent = 'Species: ' + data.species
    charStatus.textContent = 'Status: ' + data.status
    origin.textContent = 'Origin: ' + data.origin.name
    location.textContent = 'Location: ' + data.location.name
    card.appendChild(img)
    card.appendChild(name)
    card.appendChild(gender)
    card.appendChild(species)
    card.appendChild(charStatus)
    card.appendChild(origin)
    card.appendChild(location)
    body.appendChild(card)
}

window.addEventListener('load', fetchData)