const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = []

fetch(endpoint)
    .then(page => page.json())
    .then(data => cities.push(...data))

function findMatches(word, cities) {
    return cities.filter(place => {
        const regex = new RegExp(word, "gi")
        return place.city.match(regex) || place.state.match(regex)
    })
}

const $input = document.querySelector(".search")
const $suggestions = document.querySelector(".suggestions")

function displayMatches() {
    console.log(this.value)
    const matchArray = findMatches(this.value, cities)
    const html = matchArray.map(place => {
        const regex = new RegExp(this.value, "gi")
        const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`) 
        const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`)   
        return `
            <li>
                <span class="name">${cityName}, ${stateName}</span>
                <span class="population">${place.population}</span>
            </li>
        `
    }).join("") //pasa el array a string
    $suggestions.innerHTML = html
}

$input.addEventListener("change", displayMatches)
$input.addEventListener("keyup", displayMatches)