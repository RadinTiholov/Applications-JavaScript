import {html} from '../../node_modules/lit-html/lit-html.js'

const template = (data,available) => {
    return html`<!-- My Books Page ( Only for logged-in users ) -->
    <section id="my-books-page" class="my-books">
    ${available ? html`<h1>My Books</h1>
        <!-- Display ul: with list-items for every user's books (if any) -->
        <ul class="my-books-list">
        ${data.map(item => html`<li class="otherBooks">
                    <h3>${item.title}</h3>
                    <p>Type: ${item.type}</p>
                    <p class="img"><img src=${item.imageUrl}></p>
                    <a class="button" href="/details/${item._id}">Details</a>
            </li>`)}
        </ul>` : 
        html`<!-- Display paragraph: If the user doesn't have his own books  -->
        <p class="no-books">No books in database!</p>`}
    </section>
    `;
} 

export const myBookView = async (ctx) => {
    const id = sessionStorage.getItem('userId');
    const data = Object.values(await ctx.data.getMyBooks(id));
    console.log(data);
    console.log(id);
    const available = data.length == 0 ? false : true;

    ctx.render(template(data, available));
}