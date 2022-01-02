const container = document.querySelector('.container')
const paginationDiv = document.querySelector('.pagination')
const leftArrow = document.createElement('button')
leftArrow.textContent = '<'
leftArrow.className = 'arrow'
const rightArrow = document.createElement('button')
rightArrow.textContent = '>'
rightArrow.className = 'arrow'


let buttonsArray = []

paginationDiv.appendChild(leftArrow)
for (let i = 1; i < 6; i++) {
    buttonsArray[i - 1] = document.createElement('button')
    paginationDiv.appendChild(buttonsArray[i - 1])
    buttonsArray[i - 1].textContent = i
    buttonsArray[i - 1].addEventListener('click', () => {
        currPage = parseInt(buttonsArray[i - 1].textContent)
        pagination()
        fetchData()
    })
}
paginationDiv.appendChild(rightArrow)


let currPage = 1
let flag

function pagination() {
    flag = currPage
    if (flag < 4) {
        for (let i = 0, j = 1; i < 5, j < 6; i++, j++) {
            buttonsArray[i].textContent = j
        }
    }
    if (flag > 3 && flag < 41) {
        for (let i = 0; i < buttonsArray.length; i++) {
            buttonsArray[i].textContent = flag - 2
            flag++
        }
    }
}

function fetchData() {
    fetch(`https://rickandmortyapi.com/api/character/?page=${currPage}`)
        .then(res => res.json())
        .then(res => characters(res))
}

function characters(data) {
    let cardsDelete = document.querySelectorAll('.card')
    cardsDelete.forEach(e => e.remove())
    data.results.map((e) => {
        const card = document.createElement('div')
        card.className = 'card'
        const img = document.createElement('img')
        img.setAttribute('src', e.image)
        const name = document.createElement('h2')
        name.textContent = e.name
        const button = document.createElement('button')
        button.textContent = 'LIKE'

        card.appendChild(img)
        card.appendChild(name)
        card.appendChild(button)
        container.appendChild(card)

        button.addEventListener('click', () => {
            sessionStorage.setItem('user', e.id)
            window.open('./user.html', '_self')
        })
    })
}

function right() {
    if (currPage < 40) return currPage += 1
}

function left() {
    if (currPage > 1) return currPage -= 1
}

window.addEventListener('load', fetchData)

rightArrow.addEventListener('click', () => {
    right();
    pagination();
    fetchData();
})

leftArrow.addEventListener('click', () => {
    left();
    pagination();
    fetchData();
})





