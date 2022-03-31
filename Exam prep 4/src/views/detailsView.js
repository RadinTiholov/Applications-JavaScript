import {html,nothing} from '../../node_modules/lit-html/lit-html.js'

const template = (item, creator) => {
    return html`
    <!-- Details Meme Page (for guests and logged users) -->
    <section id="meme-details">
        <h1>Meme Title: ${item.title}

        </h1>
        <div class="meme-details">
            <div class="meme-img">
                <img alt="meme-alt" src=${item.imageUrl}>
            </div>
            <div class="meme-description">
                <h2>Meme Description</h2>
                <p>
                    ${item.description}
                </p>
                ${creator ? html`<!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
                <a class="button warning" href='/edit/${item._id}'>Edit</a>
                <button class="button danger">Delete</button>` : nothing}
            </div>
        </div>
    </section>`;
}
export const detailsView = async (ctx) => {
    const id = ctx.params.id;
    const item = await ctx.data.getItem(id);
    const creator = sessionStorage.getItem('userId') == item._ownerId;
    ctx.render(template(item, creator));
    const deleteBtn = document.querySelector('button');
    deleteBtn.addEventListener('click', async (e) => {
        e.preventDefault();

        if (confirm("Do you want to delete it?") == true) { 
            const id = ctx.params.id;
            console.log(id);
            await ctx.data.del(id);
            ctx.page.redirect('/allmemes');
        }
    })
}