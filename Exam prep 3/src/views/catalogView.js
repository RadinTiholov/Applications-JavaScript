import {html} from '../../node_modules/lit-html/lit-html.js'

const template = (data,articles) => {
    return html`
    <section id="catalog-page">
    <h1>All Games</h1>
    <!-- Display div: with information about every game (if any) -->
    ${articles ? data.map(item => itemTemplate(item)) 
        : html`<h3 class="no-articles">No articles yet</h3>`}
</section>`;
} 
const itemTemplate = (item) => {
    return html`<div class="allGames">
    <div class="allGames-info">
        <img src=${item.imageUrl}>
        <h6>${item.category}</h6>
        <h2>${item.title}</h2>
        <a href="details/${item._id}" class="details-button">Details</a>
    </div>

</div>`;
}
export const catalogView = async (ctx) => {
    const data = Object.values(await ctx.data.allGames())
    console.log(data);
    const articles = data.length > 0 ? true : false;
    ctx.render(template(data, articles));
}