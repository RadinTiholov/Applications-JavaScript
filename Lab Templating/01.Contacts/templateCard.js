import {html, render} from 'https://unpkg.com/lit-html?module';

export function cardTemplate(data){
    return html`
    <div class="contact card">
    <div>
        <i class="far fa-user-circle gravatar"></i>
    </div>
    <div class="info">
        <h2>Name: ${data.name}</h2>
        <button class="detailsBtn" @click = ${showDetails}>Details</button>
        <div class="details" id="${data.id}">
            <p>Phone number: ${data.phoneNumber}</p>
            <p>Email: ${data.email}</p>
        </div>
    </div>
</div>`;
}

function showDetails(e){
    if (e.target.parentNode.children[2].style.display == 'block') {
        e.target.parentNode.children[2].style.display = 'none';
    }
    else{
        e.target.parentNode.children[2].style.display = 'block';
    }
}