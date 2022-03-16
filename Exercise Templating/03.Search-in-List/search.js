import {towns} from './towns.js'
import {render} from 'https://unpkg.com/lit-html?module';
import {template} from './template.js';

const root = document.querySelector('body');
update();
const inputElement = document.getElementById('searchText');
const button = document.getElementById('button');
button.addEventListener('click', onClickButton);

function onClickButton(e){
   const searchText = inputElement.value;
   if (searchText == '') {
      alert('Required!');
   }
   else{
      update(searchText);
      updateResultText();
   }
}

function update(searchText = ''){
   const result = template(towns, searchText);
   render(result, root);
}


