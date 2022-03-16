import {getUsers} from './data.js';
import {render} from 'https://unpkg.com/lit-html?module';
import {template} from './template.js';

const data = Object.values(await getUsers());
const root = document.querySelector('tbody');
update();
solve();

function solve() {
   document.querySelector('#searchBtn').addEventListener('click', onClick);
   const inputElement = document.getElementById('searchField');

   function onClick() {
      if (inputElement.value == '') {
         alert('Required!')
      }
      else{
         update(inputElement.value);
      }
   }
}

function update(search = ''){
   const result = template(data, search);
   render(result, root);
}