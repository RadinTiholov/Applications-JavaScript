const homePage = document.getElementById('home-page');
homePage.style.display = 'block';
const container = document.getElementById('container');
container.addEventListener('click', routePath);
const moviesSection = document.getElementById('movies');
moviesSection.addEventListener('click', handleClickForDetails)

import {showView} from './router.js';
import {detailsPage} from './details.js';

const guestNavElements = Object.values(document.querySelectorAll('#guestUser'));
const loggedNavElements = Object.values(document.querySelectorAll('#loggedUser'));
//On load
refereshNavBar();
showView('/')
function handleClickForDetails(e){
    e.preventDefault();

    if (e.target.tagName == 'BUTTON') {
        const id = e.target.getAttribute('data-id');
        showView('/details');
        detailsPage(id);
    }
}
function routePath(e){
    e.preventDefault();

    if (e.target.tagName == 'A') {
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