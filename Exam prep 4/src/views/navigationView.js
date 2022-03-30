import {html, render} from '../../node_modules/lit-html/lit-html.js'

const root = document.querySelector('.nav');

const template = (user) => {
    return html`
    <a href="/allmemes">All Memes</a>
    ${user ? logged(user) : guest()}
   `;
}
const logged = (user) => {
    return html`
    <!-- Logged users -->
   <div class="user">
       <a href="/create">Create Meme</a>
       <div class="profile">
           <span>Welcome, ${user}</span>
           <a href="/myprofile">My Profile</a>
           <a href="/logout">Logout</a>
       </div>
   </div>`;
}
const guest = () => {
    return html`<!-- Guest users -->
    <div class="guest">
        <div class="profile">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
        </div>
        <a class="active" href="/">Home Page</a>
    </div>`
}

export const navigationView = () => {
    const user = sessionStorage.getItem('userEmail');
    render(template(user), root);
}