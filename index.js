/*      TODO:
* -----------------------------
*
*   Add favorite quotes system
*   Spread this js file into modules
*
*-----------------------------
*/

import quotes from "./src/quotes.js";



const quoteElement = document.getElementById('quote');
const generateButton = document.getElementById('generate-button');
const dayNightModeButton = document.getElementById('day-night-mode-button')
const body = document.body;
const container = document.getElementById('container-div');
const heading1 = document.getElementById('h1');
const authorElement = document.getElementById('author');
const favoriteButton = document.getElementById('favorite-button')

let previousRandomIndex;
let currentIndex;


function isFavoriteCheck() {
    if (quotes[currentIndex].isFavorite) {
            favoriteButton.textContent = 'Unfavorite quote'
        } else {
            favoriteButton.textContent = 'Favorite quote'
        }
}


function generateRandomQuote() {
    const currentBackgroundColor = getComputedStyle(body).backgroundColor;
    let randomIndex;

    if (currentBackgroundColor === 'rgb(240, 240, 240)') {
        quoteElement.style.color = 'black';
    } else {
        quoteElement.style.color = '#f0f0f0';
    }

    do {
        randomIndex = Math.floor(Math.random() * quotes.length)
    } while (randomIndex === previousRandomIndex)
        
    previousRandomIndex = randomIndex;
    currentIndex = randomIndex;

    isFavoriteCheck();

    const randomQuote = quotes[randomIndex];
    const quote = `<em>"${randomQuote.quote}"</em>`;
    quoteElement.innerHTML = quote;
    authorElement.innerHTML = randomQuote.author;

}


function toggleFavorite () {
    const currentBackgroundColor = getComputedStyle(body).backgroundColor;
    
    try {
        quotes[currentIndex].isFavorite = !quotes[currentIndex].isFavorite;
        isFavoriteCheck();
    } catch {
        quoteElement.style.color = 'red';
        quoteElement.textContent = 'Quote has not been generated yet.';
        
        setTimeout(() => {
            if (currentBackgroundColor === 'rgb(240, 240, 240)') {
                quoteElement.style.color = 'black';
            } else {
                quoteElement.style.color = '#f0f0f0';
            }
        }, 300);
    }
}



function switchMode() {
    const currentBackgroundColor = getComputedStyle(body).backgroundColor;

    if (currentBackgroundColor === 'rgb(240, 240, 240)') {

        body.style.backgroundColor = '#27272a';
        container.style.backgroundColor = '#18181b';
        quoteElement.style.color = '#f0f0f0';
        heading1.style.color = '#f0f0f0';
        dayNightModeButton.style.backgroundColor = '#27272a';
        dayNightModeButton.style.color = '#f0f0f0';
        dayNightModeButton.textContent = 'Switch to light theme'
        authorElement.style.color = '#f0f0f0';
        favoriteButton.style.backgroundColor = '#27272a';
        favoriteButton.style.color = '#f0f0f0';
    
    } else {
        
        body.style.backgroundColor = '#f0f0f0';
        container.style.backgroundColor = 'rgb(255, 255, 255)'
        quoteElement.style.color = 'black';
        heading1.style.color = 'black';
        dayNightModeButton.style.color = 'black';
        dayNightModeButton.style.backgroundColor = 'aliceblue';
        dayNightModeButton.textContent = 'Switch to dark theme';
        authorElement.style.color = 'black';
        favoriteButton.style.backgroundColor = 'aliceblue';
        favoriteButton.style.color = 'black';
    }
}


generateButton.addEventListener('click', generateRandomQuote);
dayNightModeButton.addEventListener('click', switchMode);
favoriteButton.addEventListener('click', toggleFavorite)