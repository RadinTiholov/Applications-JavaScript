import {html} from 'https://unpkg.com/lit-html?module';

export const template = (towns, search) => {
    return html`
    <article>
       <div id="towns">
          <ul>
          ${towns.map(town => html`<li class = ${search && town.toLowerCase().includes(search.toLowerCase()) ? 'active': ''}>${town}</li>`)}
          </ul>
       </div>
       <input type="text" id="searchText"/>
       <button id='button'>Search</button>
       <div id="result">${matchesCount(towns, search)}</div>
    </article>`;
}
function matchesCount(towns, searchText){
    const matches = towns.filter(t => searchText && t.toLowerCase().includes(searchText.toLowerCase())).length;
 
    return matches ? `${matches} matches found` : '';
 }