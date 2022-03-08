const homeElement = document.getElementById('home-page');
const loginElement = document.getElementById('form-login');
const registerElement = document.getElementById('form-sign-up');
const addmoviesElement = document.getElementById('add-movie');
const discriptionElement = document.getElementById('discription');
const editMovieElement = document.getElementById('edit-movie');

import {refereshNavBar} from './app.js';
import { loadMovies } from './movies.js';

const routes = {
    '/' : showHome,
    '/logout' : logout,
    '/login' : showLogin,
    '/register' : showRegister,
    '/addmovies' : showAddMovieView,
    '/details': showDetails
}

export function showView(path){
    hideAll();
    const view = routes[path];
    view();
}
function hideAll(){
    const sectionList = Object.values(document.querySelectorAll('.sectionList'));
    for (const item of sectionList) {
        item.style.display = 'none';
    }
}
function showHome(){
    homeElement.style.display = 'block';
    loadMovies();
    refereshNavBar();
}
function logout(){
    localStorage.clear();
    showView('/')
}
function showLogin(){
    loginElement.style.display = 'block';
}
function showRegister(){
    registerElement.style.display = 'block';
}
function showAddMovieView(){
    addmoviesElement.style.display = 'block';
}
function showDetails(){
    discriptionElement.style.display = 'block';
}