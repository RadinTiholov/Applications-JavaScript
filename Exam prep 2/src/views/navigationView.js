import {html, render} from '../../node_modules/lit-html/lit-html.js'

const root = document.getElementById('site-header');

const template = (user) => {
    return html`
    <!-- Navigation -->
    <nav class="navbar">
                <section class="navbar-dashboard">
                    <a href="/">Dashboard</a>
                    ${user ? logged(user) : guest()}
                </section>
            </nav>
    `;
}
const logged = (user) => {
    return html`<!-- Logged-in users -->
    <div id="user">
        <span>Welcome, ${user}</span>
        <a class="button" href="/mybooks">My Books</a>
        <a class="button" href="/create">Add Book</a>
        <a class="button" href="/logout">Logout</a>
    </div>`;
}
const guest = () => {
    return html`<!-- Guest users -->
    <div id="guest">
        <a class="button" href="/login">Login</a>
        <a class="button" href="/register">Register</a>
    </div>`
}

export const navigationView = (ctx) => {
    const user = sessionStorage.getItem('userEmail');
    render(template(user), root);
}