import {html} from '../../node_modules/lit-html/lit-html.js'

const template = (onSubmit, item) => {
    return html` <!-- Edit Meme Page ( Only for logged user and creator to this meme )-->
    <section id="edit-meme">
        <form id="edit-form" @submit = ${onSubmit}>
            <h1>Edit Meme</h1>
            <div class="container">
                <label for="title">Title</label>
                <input id="title" type="text" placeholder="Enter Title" name="title" value="${item.title}">
                <label for="description">Description</label>
                <textarea id="description" placeholder="Enter Description" name="description">
                        ${item.description}
                    </textarea>
                <label for="imageUrl">Image Url</label>
                <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" value="${item.imageUrl}">
                <input type="submit" class="registerbtn button" value="Edit Meme">
            </div>
        </form>
    </section>`;
}
export const editView = async (ctx) => {
    const id = ctx.params.id;
    const item = await ctx.data.getItem(id);
    ctx.render(template(onSubmit, item));

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
            await ctx.data.edit(data,id);
            ctx.page.redirect(`/details/${id}`);
        }
    }
}