import {html,nothing} from '../../node_modules/lit-html/lit-html.js'

const template = (item, author,user, onSubmit, comments, areThereComs) => {
    return html`<section id="game-details">
    <h1>Game Details</h1>
    <div class="info-section">

        <div class="game-header">
            <img class="game-img" src=${item.imageUrl} />
            <h1>${item.title}</h1>
            <span class="levels">MaxLevel: ${item.maxLevel}</span>
            <p class="type">${item.category}</p>
        </div>

        <p class="text">
            ${item.summary}
        </p>

        <!-- Bonus ( for Guests and Users ) -->
        <div class="details-comments">
            <h2>Comments:</h2>
            ${areThereComs ? html`<ul class = 'comm-list'>
                ${comments.map(item => html`<li class="comment">
                    <p>Content: ${item.comment}</p>
                </li>`)}
            </ul>` : html`
            <ul class = 'comm-list'></ul>
            <!-- Display paragraph: If there are no games in the database -->
            <p class="no-comment">No comments.</p>`}
        </div>

        ${author ? html`<!-- Edit/Delete buttons ( Only for creator of this game )  -->
        <div class="buttons">
            <a href="/edit/${item._id}" class="button">Edit</a>
            <a href="/delete/${item._id}" class="button">Delete</a>
        </div>` : nothing}
    </div>

    <!-- Bonus -->
    <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->
    ${user ? html`<article class="create-comment">
        <label>Add new comment:</label>
        <form class="form" @submit = ${onSubmit}>
            <textarea name="comment" placeholder="Comment......"></textarea>
            <input class="btn submit" type="submit" value="Add Comment">
        </form>
    </article>` : nothing}
</section>
`;
} 

export const detailsView = async (ctx) => {
    const id = ctx.params.id;
    const item = await ctx.data.getGame(id); 
    const author = item._ownerId == sessionStorage.getItem('userId');

    const userId = sessionStorage.getItem('userId');
    const user = userId && userId != item._ownerId ? true: false;
    const comments = Object.values(await ctx.data.getComments(id))
    const areThereComs = comments.length > 0 ? true : false;
    ctx.render(template(item,author,user, onSubmit, comments,areThereComs));

    async function onSubmit(e){
        e.preventDefault();

        const formData = new FormData(e.target);
        const comment = formData.get('comment');
        if (comment != '') {
            const data = {
                gameId: id,
                comment
            }              
            await ctx.data.comment(data);
            const commentElement = document.createElement('li');
            commentElement.classList.add('comment');
            const pEl = document.createElement('p');
            pEl.textContent += `Content: ${comment}`;
            commentElement.appendChild(pEl);

            document.querySelector('.comm-list').appendChild(commentElement);
            e.target.reset();
        }
        else{
            alert('Empty');
        }
    }
}