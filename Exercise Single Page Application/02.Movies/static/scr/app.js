const homePage = document.getElementById('home-page');
homePage.style.display = 'block';
const container = document.getElementById('container');
container.addEventListener('click', routePath);

import {showView} from './router.js';

const guestNavElements = Object.values(document.querySelectorAll('#guestUser'));
const loggedNavElements = Object.values(document.querySelectorAll('#loggedUser'));
//On load
refereshNavBar();
showView('/')

function routePath(e){
    e.preventDefault();

    if (e.target.tagName == 'A' || e.target.tagName == 'BUTTON') {
        const url = e.target.getAttribute('href');
        showView(url);
    }
}
function showUserNav(){
    loggedNavElements.forEach(element => {
        element.style.display = 'inline';
    });
    guestNavElements.forEach(element => {
        element.style.display = 'none';
    });
}
function showGuestNav(){
    loggedNavElements.forEach(element => {
        element.style.display = 'none';
    });
    guestNavElements.forEach(element => {
        element.style.display = 'inline';
    });
}
export function refereshNavBar(){
    const email = localStorage.getItem('email');
    if (email) {
        const greetingsElement = document.getElementsByName('greetings')[0];
        greetingsElement.textContent = `Welcome, ${email}`;
        showUserNav();
    }
    else{
        showGuestNav();
    }
}