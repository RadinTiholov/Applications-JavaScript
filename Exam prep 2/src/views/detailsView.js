import {html, nothing} from '../../node_modules/lit-html/lit-html.js'

const template = (item, id, currentCount, isLiked) => {
    return html`
    <!-- Details Page ( for Guests and Users ) -->
    <section id="details-page" class="details">
        <div class="book-information">
            <h3>${item.title}</h3>
            <p class="type">Type: ${item.type}</p>
            <p class="img"><img src=${item.imageUrl}></p>
            <div class="actions">
                ${item._ownerId == id ? html`
                <!-- Edit/Delete buttons ( Only for creator of this book )  -->
                <a class="button" href="/edit/${item._id}">Edit</a>
                <a class="button" href="/delete/${item._id}">Delete</a>

                <div class="likes">
                    <img class="hearts" src="/images/heart.png">
                    <span id="total-likes">Likes: ${currentCount}</span>
                </div>
                ` : html`
                ${id ? html`
                <!-- Bonus -->
                <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
                ${isLiked? nothing:html`<a class="button likeBtn" href="javascript:void(0)">Like</a>`}
                <div class="likes">
                    <img class="hearts" src="/images/heart.png">
                    <span id="total-likes">Likes: ${currentCount}</span>
                </div>`: html`
                <!-- ( for Guests and Users )  -->
                <div class="likes">
                    <img class="hearts" src="/images/heart.png">
                    <span id="total-likes">Likes: ${currentCount}</span>
                </div>
                <!-- Bonus -->`}    `}
                            
            </div>
        </div>
        <div class="book-description">
            <h3>Description:</h3>
            <p>${item.description}</p>
        </div>
    </section>`;
} 

export const detailsView = async (ctx) => {
    const id = ctx.params.id;
    const item = await ctx.data.details(id);
    console.log(item);
    const userId = sessionStorage.getItem('userId');
    const currentCount = await ctx.data.totalLikes(id);
    const isLikedValue =  await ctx.data.isLiked(id, userId);
    const isLiked = isLikedValue == 1 ? true: false;
    ctx.render(template(item, userId, currentCount, isLiked));

    const totalLikes = document.getElementById('total-likes');

    const likeBtn = document.querySelector('.likeBtn');
    if (likeBtn) {
        likeBtn.addEventListener('click', async (e) => {
            e.target.remove();
            const count = Number(totalLikes.textContent.split(' ')[1]);
            totalLikes.textContent = `Likes: ${count + 1}`;
            await ctx.data.like(id);
        })
    }
}