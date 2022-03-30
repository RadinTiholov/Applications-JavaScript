import {html} from '../../node_modules/lit-html/lit-html.js'

const template = (data, any) => {
    return html`<!-- All Memes Page ( for Guests and Users )-->
    <section id="meme-feed">
        <h1>All Memes</h1>
        <div id="memes">
            <!-- Display : All memes in database ( If any ) -->
            ${any ? data.map(item => cardTemplate(item)) : html`<p class="no-memes">No memes in database.</p>`}
            
            <!-- Display : If there are no memes in database -->
            
        </div>
    </section>`;
}
const cardTemplate = (item) => {
    return html`
    <div class="meme">
    <div class="card">
        <div class="info">
            <p class="meme-title">${item.title}</p>
            <img class="meme-image" alt="meme-img" src=${item.imageUrl}>
        </div>
        <div id="data-buttons">
            <a class="button" href="/details/${item._id}">Details</a>
        </div>
    </div>
</div>`;
}
export const allMemesView = async (ctx) => {
    const data = Object.values( await ctx.data.getAllMemes());
    const any = data.length > 0 ? true : false;
    ctx.render(template(data, any));
}