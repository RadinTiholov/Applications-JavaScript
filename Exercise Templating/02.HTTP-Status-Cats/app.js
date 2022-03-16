import {cats} from './catSeeder.js';
import {template} from './catTemplate.js';
import {html, render} from 'https://unpkg.com/lit-html?module';

const root = document.getElementById('allCats');
cats.forEach(c => c.info = false);
update();
root.addEventListener('click', toogleButton)

function update() {
    const result = template(cats);
    render(result, root);
}
function toogleButton(e){
    if (e.target.tagName == 'BUTTON') {
        const id = e.target.parentNode.querySelector('.status').id;
        const cat = cats.find(x => x.id == id);
        cat.info = !cat.info;
        update();
    }
}
