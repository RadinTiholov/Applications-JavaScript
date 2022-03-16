import {html} from 'https://unpkg.com/lit-html?module';

export const template = (data, search) => {
    return html`${data.map(user => 
        html`<tr class = ${search && (contains(user.firstName, search) || contains(user.lastName, search) || contains(user.email, search) || contains(user.course, search)) ? 'select' : ''}>
                <td>${user.firstName} ${user.lastName}</td>
                <td>${user.email}</td>
                <td>${user.course}</td>
            </tr>`
    )}`;
}

function contains(text, search){
    return text.toLowerCase().includes(search.toLowerCase())
}