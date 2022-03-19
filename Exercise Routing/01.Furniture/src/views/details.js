import { html } from "../lib.js";

const template = (data, ownerId) => {
    return html`<div class="row space-top">
    <div class="col-md-12">
        <h1>Furniture Details</h1>
    </div>
</div>
<div class="row space-top">
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src=${data.img} />
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <p>Make: <span>${data.make}</span></p>
        <p>Model: <span>${data.model}</span></p>
        <p>Year: <span>${data.year}</span></p>
        <p>Description: <span>${data.description}</span></p>
        <p>Price: <span>${data.price}</span></p>
        <p>Material: <span>${data.material}</span></p>
        <div>
            <a href='/edit/${data._id}' class="btn btn-info" style=${data._ownerId == ownerId ? "display: inline":"display: none"}>Edit</a>
            <a id  ='deleteBtn' href='javascript:void(0)' class="btn btn-red" style=${data._ownerId == ownerId ? "display: inline":"display: none"}>Delete</a>
        </div>
    </div>
</div>`;
}

export async function detailsPage(ctx){
    const id = ctx.params.id;
    const data = await ctx.data.getFurnitureDetails(id);
    const ownerId = sessionStorage.getItem('userId');
    ctx.render(template(data,ownerId))
    await onDelete(ctx, id);
}
async function onDelete(ctx,id){
    const deleteBtn = document.getElementById('deleteBtn');
    deleteBtn.addEventListener('click', deleteBtnClick);

    async function deleteBtnClick(e){
        confirm("Do you want to delete the item?");
        await ctx.data.deleteFurniture(id);
        ctx.updateUserNav();
        ctx.page.redirect('/');
    }
}