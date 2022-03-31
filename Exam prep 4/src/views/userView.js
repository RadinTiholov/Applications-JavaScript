import {html} from '../../node_modules/lit-html/lit-html.js'

const template = (data, any, length, username, email, gender) => {
    return html`
    <!-- Profile Page ( Only for logged users ) -->
    <section id="user-profile-page" class="user-profile">
            <article class="user-info">
                <img id="user-avatar-url" alt="user-profile" src="/images/${gender ? 'male' : 'female'}.png">
                <div class="user-content">
                    <p>Username: ${username}</p>
                    <p>Email: ${email}</p>
                    <p>My memes count: ${length}</p>
                </div>
            </article>
            <h1 id="user-listings-title">User Memes</h1>
            <div class="user-meme-listings">
                ${any ? data.map(item => cardTemplate(item)) : html`
                <p class="no-memes">No memes in database.</p>`}
            </div>
        </section>
`;
}
const cardTemplate = (item) => {
    return html`<!-- Display : All created memes by this user (If any) --> 
    <div class="user-meme">
        <p class="user-meme-title">${item.title}</p>
        <img class="userProfileImage" alt="meme-img" src=${item.imageUrl}>
        <a class="button" href="/details/${item._id}">Details</a>
    </div>`;
}
export const userView = async (ctx) => {
    const id = sessionStorage.getItem('userId');
    const data = Object.values( await ctx.data.getAllMyMemes(id));
    const any = data.length > 0 ? true : false;
    const length = data.length;
    const username = sessionStorage.getItem('username')
    const email = sessionStorage.getItem('userEmail')
    const gender= sessionStorage.getItem('gender') == 'male' ? true : false;
    ctx.render(template(data, any, length, username, email, gender));
}