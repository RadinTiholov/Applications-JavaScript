import * as api from './api.js';
import {render} from 'https://unpkg.com/lit-html?module';
import {template} from './template.js';

const menu = document.getElementById('menu');
const form = document.querySelector('form');
form.addEventListener('submit', addItem);

update();

async function addItem(e) {
    e.preventDefault();

    const formData = new FormData(form);
    const text = formData.get('text');
    if (!text) {
        alert('Required');
    }
    else{
        const response = await fetch('http://localhost:3030/jsonstore/advanced/dropdown', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text }),
        });
    
        e.target.reset();
        update();
    }
}
async function update(){
    let data = await api.get('/jsonstore/advanced/dropdown');
    data = Object.values(data);
    const result = template(data);
    render(result, menu);
}