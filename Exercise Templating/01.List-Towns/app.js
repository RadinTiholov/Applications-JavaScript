import {html, render} from 'https://unpkg.com/lit-html?module';
import {template} from './townTemplate.js';

const inputElement = document.getElementById('towns');
const buttonElement = document.getElementById('btnLoadTowns');
const root = document.getElementById('root');

buttonElement.addEventListener('click', loadTown);

function loadTown(e){
    e.preventDefault();
    const data = parseInput(inputElement.value);
    render(template(data), root);
}

function parseInput(text){
    return text.split(', ');
}