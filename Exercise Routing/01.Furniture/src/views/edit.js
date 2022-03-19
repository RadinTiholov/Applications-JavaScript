import { html } from "../lib.js";

const template = (data, onSubmit) => {
    return html`
    <div class="row space-top">
            <div class="col-md-12">
                <h1>Edit Furniture</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit = ${onSubmit}>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-make">Make</label>
                        <input class="form-control" id="new-make" type="text" name="make" value=${data.make}>
                    </div>
                    <div class="form-group has-success">
                        <label class="form-control-label" for="new-model">Model</label>
                        <input class="form-control" id="new-model" type="text" name="model" value=${data.model}>
                    </div>
                    <div class="form-group has-danger">
                        <label class="form-control-label" for="new-year">Year</label>
                        <input class="form-control" id="new-year" type="number" name="year" value=${data.year}>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-description">Description</label>
                        <input class="form-control" id="new-description" type="text" name="description" value=${data.description}>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-price">Price</label>
                        <input class="form-control" id="new-price" type="number" name="price" value=${data.price}>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-image">Image</label>
                        <input class="form-control" id="new-image" type="text" name="img" value=${data.img}>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-material">Material (optional)</label>
                        <input class="form-control" id="new-material" type="text" name="material" value=${data.material}>
                    </div>
                    <input type="submit" class="btn btn-info" value="Edit" />
                </div>
            </div>
        </form>`;
}

export async function editPage(ctx){
    const id = ctx.params.id;
    const data = await ctx.data.getFurnitureDetails(id);
    ctx.render(template(data, onSubmit));

    async function onSubmit(e){
        e.preventDefault();
        const formData = new FormData(e.target);

        const make = formData.get('make');
        const model = formData.get('model');
        const year = Number(formData.get('year'));
        const description = formData.get('description');
        const price = Number(formData.get('price'));
        const img = formData.get('img');
        const material = formData.get('material');

        const makeElement = document.getElementById('new-make');
        const modelElement = document.getElementById('new-model');
        const yearElement = document.getElementById('new-year');
        const descriptionElement = document.getElementById('new-description');
        const priceElement = document.getElementById('new-price');
        const imgElement = document.getElementById('new-image');
        const materialElement = document.getElementById('new-material');

        cleanAllClasses()
        if(make == '' || model == ''|| year == '' || description == '' || price == ''|| img == ''){
            alert('All fields except material are required');
            checkForInValidClass(makeElement);
            checkForInValidClass(modelElement);
            checkForInValidClass(yearElement);
            checkForInValidClass(descriptionElement);
            checkForInValidClass(priceElement);
            checkForInValidClass(imgElement);
        }
        else if(make.length < 4 || model.length < 4){
            alert('Make and Model must be at least 4 symbols long');
            addInvalidClass(makeElement);
            addInvalidClass(modelElement);
        }
        else if(year < 1950 || year > 2050){
            alert('Year must be between 1950 and 2050');
            addInvalidClass(yearElement);
        }
        else if(description.length < 10){
            alert('Description must be more than 10 symbols');
            addInvalidClass(descriptionElement);
        }
        else if(price < 0){
            alert('Price must be a positive number');
            addInvalidClass(priceElement);
        }
        else if(img == ''){
            alert('Image URL is required');
            addInvalidClass(imgElement);
        }
        else {
            const data = {
                make,
                model,
                year,
                description,
                price,
                img,
                material
            }
            await ctx.data.updateFurniture(id, data);
            ctx.updateUserNav();
            ctx.page.redirect(`/details/${id}`);
        }
        function checkForInValidClass(element){
            if (element.value == '') {
                addInvalidClass(element);
            }
        }
        function addInvalidClass(element){
            element.classList.add('is-invalid');
        }
        function cleanAllClasses(){
            makeElement.classList.remove('is-invalid');
            modelElement.classList.remove('is-invalid');
            yearElement.classList.remove('is-invalid');
            descriptionElement.classList.remove('is-invalid');
            priceElement.classList.remove('is-invalid');
            imgElement.classList.remove('is-invalid');
            materialElement.classList.remove('is-invalid');
        }
    }
}