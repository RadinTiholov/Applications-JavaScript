import {html, render} from 'https://unpkg.com/lit-html?module';
import { styleMap } from '../node_modules/lit-html/directives/style-map.js';

export const template = (data) => html`
<ul>
    ${data.map(cat => html`
    <li>
        <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
        <div class="info">
            <button class="showBtn">${cat.info ? 'Hide' : 'Show'} status code</button>
            <div class="status" style= ${styleMap(cat.info ? {} : {display : 'none'})} id=${cat.id}>
                    <h4>Status Code: ${cat.statusCode}</h4>
                    <p>${cat.statusMessage}</p>
                </div>
        </div>
    </li>`)}
</ul>`;