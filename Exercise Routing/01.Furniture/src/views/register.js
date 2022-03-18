import { html } from "../lib.js";

const template = (onSubmit) => {
    return html`<div class="row space-top">
    <div class="col-md-12">
        <h1>Register New User</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit = ${onSubmit}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="email">Email</label>
                <input class="form-control" id="email" type="text" name="email">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="password">Password</label>
                <input class="form-control" id="password" type="password" name="password">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="rePass">Repeat</label>
                <input class="form-control" id="rePass" type="password" name="rePass">
            </div>
            <input type="submit" class="btn btn-primary" value="Register" />
        </div>
    </div>
</form>`;
}

export const registerPage = (ctx) => {
    ctx.render(template(onSubmit));

    async function onSubmit(e){
        e.preventDefault();

        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');
        const rePass = formData.get('rePass');

        const emailInput = document.getElementById('email')
        const passwordInput = document.getElementById('password');
        const rePasswordInput = document.getElementById('rePass');
        emailInput.classList.remove('is-invalid');
        passwordInput.classList.remove('is-invalid');
        rePasswordInput.classList.remove('is-invalid');

        if(email == '' && password == '' && rePass == ''){
            emailInput.classList.add('is-invalid');
            passwordInput.classList.add('is-invalid');
            rePasswordInput.classList.add('is-invalid');
        }
        else if (email == '') {
            emailInput.classList.add('is-invalid');
        }
        else if(password == ''){
            passwordInput.classList.add('is-invalid');
        }
        else if(rePass == ''){
            rePasswordInput.classList.add('is-invalid');
        }
        else if(rePass != password){
            alert('The paswords are different');
        }
        else{
            await ctx.data.register(email, password);
            ctx.updateUserNav();
            ctx.page.redirect('/');
        }
    }
}