import {html} from 'https://unpkg.com/lit-html?module';

export const template = (data) => {
    return html`${data.map(x => html`<option value = ${x._id}>${x.text}</option>`)}`;
}