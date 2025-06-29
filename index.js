/*      TODO:
* -----------------------------
*
*   Spread this js file into modules
*
*-----------------------------
*/

import quotes from "./src/quotes.js";



const quoteElement = document.getElementById('quote');
const generateButton = document.getElementById('generate-button');
const dayNightModeButton = document.getElementById('day-night-mode-button');
const body = document.body;
const container = document.getElementById('container-div');
const heading1 = document.getElementById('h1');
const authorElement = document.getElementById('author');
const favoriteButton = document.getElementById('favorite-button');
const favoriteContainer = document.getElementById('favorite-container');

let previousRandomIndex;
let currentIndex;


function isFavoriteCheck() {
    if (quotes[currentIndex].isFavorite) {
            favoriteButton.textContent = 'Unfavorite quote';
        } else {
            favoriteButton.textContent = 'Favorite quote';
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

    favoriteButton.style.display = 'inline-block';
    favoriteButton.style.margin = '12px';

}


function toggleFavorite () {
    const currentBackgroundColor = getComputedStyle(body).backgroundColor;
    
    quotes[currentIndex].isFavorite = !quotes[currentIndex].isFavorite;
    isFavoriteCheck();

    if (quotes[currentIndex].isFavorite) {  
        const favoriteCard = document.createElement('div');
        
        favoriteCard.classList.add('favorite-card');

        if (currentBackgroundColor === 'rgb(240, 240, 240)') {
            favoriteCard.style.backgroundColor = 'white';
            favoriteCard.style.color = 'black';
        } else {
            favoriteCard.style.backgroundColor = '#18181b';
            favoriteCard.style.color = 'white';
        }

        favoriteCard.innerHTML = `
        <p><em>"${quotes[currentIndex].quote}"</em></p>
        <p>${quotes[currentIndex].author}</p>`;
            
        favoriteContainer.appendChild(favoriteCard);  
    } else {
        const favoriteCards = document.querySelectorAll('.favorite-card');
            
        favoriteCards.forEach(card => {
            if (card.textContent.includes(quotes[currentIndex].quote)) {
                card.remove();
            }
        });
    }
}



function switchMode() {
    const currentBackgroundColor = getComputedStyle(body).backgroundColor;

    if (currentBackgroundColor === 'rgb(240, 240, 240)') {
        const favoriteCards = document.querySelectorAll('.favorite-card');

        body.style.backgroundColor = '#27272a';
        container.style.backgroundColor = '#18181b';
        quoteElement.style.color = '#f0f0f0';
        heading1.style.color = '#f0f0f0';
        dayNightModeButton.style.backgroundColor = '#27272a';
        dayNightModeButton.style.color = '#f0f0f0';
        dayNightModeButton.textContent = 'Switch to light theme';
        authorElement.style.color = '#f0f0f0';
        favoriteButton.style.backgroundColor = '#27272a';
        favoriteButton.style.color = '#f0f0f0';
        
        favoriteCards.forEach(card => {
            card.style.backgroundColor = '#18181b';
            card.style.color = 'white';
        })
    
    } else {
        const favoriteCards = document.querySelectorAll('.favorite-card');

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

        favoriteCards.forEach(card => {
            card.style.backgroundColor = 'white';
            card.style.color = 'black';
        })
    }
}


generateButton.addEventListener('click', generateRandomQuote);
dayNightModeButton.addEventListener('click', switchMode);
favoriteButton.addEventListener('click', toggleFavorite);