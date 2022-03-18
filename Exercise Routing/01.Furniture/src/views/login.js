import { html } from "../lib.js";

const template = (onSubmit) => {
    return html`<div class="row space-top">
    <div class="col-md-12">
        <h1>Login User</h1>
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
            <input type="submit" class="btn btn-primary" value="Login" />
        </div>
    </div>
</form>`;
}

export const loginPage = (ctx) => {
    ctx.render(template(onSubmit));

    async function onSubmit(e){
        e.preventDefault();

        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');

        const emailInput = document.getElementById('email')
        const passwordInput = document.getElementById('password');
        emailInput.classList.remove('is-invalid');
        passwordInput.classList.remove('is-invalid');
        if(email == '' &&password == '' ){
            emailInput.classList.add('is-invalid');
            passwordInput.classList.add('is-invalid');
        }
        else if (email == '') {
            emailInput.classList.add('is-invalid');
        }
        else if(password == ''){
            passwordInput.classList.add('is-invalid');
        }
        else{
            await ctx.data.login(email, password);
            ctx.updateUserNav();
            ctx.page.redirect('/');
        }
    }
}