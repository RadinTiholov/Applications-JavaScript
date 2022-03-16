import {html, render} from 'https://unpkg.com/lit-html?module';

export const template  = (data) =>{
    return html`
    <ul>
        ${data.map(x => html`<li>${x}</li>`)}
    </ul>`;
}