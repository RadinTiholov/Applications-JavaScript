import {html} from '../../node_modules/lit-html/lit-html.js'

const template = (data,available) => {
    return html`
    <section id="dashboard-page" class="dashboard">
        ${available ? html`<h1>Dashboard</h1>
            <!-- Display ul: with list-items for All books (If any) -->
            <ul class="other-books-list">
                ${data.map(item => html`
                    <li class="otherBooks">
                    <h3>${item.title}</h3>
                    <p>Type: ${item.type}</p>
                    <p class="img"><img src=${item.imageUrl}></p>
                    <a class="button" href="/details/${item._id}">Details</a>
                </li>`)}
            </ul>` : 
            html`<!-- Display paragraph: If there are no books in the database -->
            <p class="no-books">No books in database!</p>`}
        </section>
    `;
} 

export const dashboardView = async (ctx) => {
    const data = Object.values(await ctx.data.getAllBooks());
    const available = data.length == 0 ? false : true;

    ctx.render(template(data, available));
}