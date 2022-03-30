import {html} from '../../node_modules/lit-html/lit-html.js'

const template = (onSubmit) => {
    return html`
    <!-- Create Meme Page ( Only for logged users ) -->
    <section id="create-meme">
        <form id="create-form" @submit = ${onSubmit}>
            <div class="container">
                <h1>Create Meme</h1>
                <label for="title">Title</label>
                <input id="title" type="text" placeholder="Enter Title" name="title">
                <label for="description">Description</label>
                <textarea id="description" placeholder="Enter Description" name="description"></textarea>
                <label for="imageUrl">Meme Image</label>
                <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
                <input type="submit" class="registerbtn button" value="Create Meme">
            </div>
        </form>
    </section>`;
}
export const createView = (ctx) => {
    ctx.render(template(onSubmit));

    async function onSubmit(e){
        e.preventDefault();

        const formData = new FormData(e.target);
        const title = formData.get('title');
        const description = formData.get('description');
        const imageUrl = formData.get('imageUrl');
    
        if(title == '' || title == '' || imageUrl == ''){
            return alert('Empty')
        }
        else
        {
            const data = {
                title,
                description,
                imageUrl
            }
            await ctx.data.create(data);
            ctx.page.redirect('/allmemes');
        }
    }
}