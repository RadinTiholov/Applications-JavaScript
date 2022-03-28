import {html, render} from '../../node_modules/lit-html/lit-html.js'

const root = document.querySelector('header');

const template = (user) => {
    return html`
    <!-- Navigation -->
    <h1><a class="home" href="/">GamesPlay</a></h1>
            <nav>
                <a href="/catalog">All games</a>
                ${user ? logged() : guest()}
                
            </nav>
    `;
}
const logged = () => {
    return html`
    <!-- Logged-in users -->
    <div id="user">
        <a href="/create">Create Game</a>
        <a href="/logout">Logout</a>
    </div>`;
}
const guest = () => {
    return html`
    <!-- Guest users -->
    <div id="guest">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
    </div>`
}

export const navigationView = (ctx) => {
    const user = sessionStorage.getItem('userEmail');
    render(template(user), root);
}