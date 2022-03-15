import {html, render} from 'https://unpkg.com/lit-html?module';
import {cardTemplate} from './templateCard.js';
import {contacts} from './contacts.js'

const root = document.getElementById('contacts');

window.onload = () => {
    console.log(contacts);
    const result = contacts.map(cardTemplate);
    render(result, root);
}