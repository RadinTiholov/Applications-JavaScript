import {html} from '../../node_modules/lit-html/lit-html.js'

const template = (onSubmit) => {
    return html`
    <section id="register-page" class="content auth">
            <form id="register" @submit = ${onSubmit}>
                <div class="container">
                    <div class="brand-logo"></div>
                    <h1>Register</h1>

                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="maria@email.com">

                    <label for="pass">Password:</label>
                    <input type="password" name="password" id="register-password">

                    <label for="con-pass">Confirm Password:</label>
                    <input type="password" name="confirm-password" id="confirm-password">

                    <input class="btn submit" type="submit" value="Register">

                    <p class="field">
                        <span>If you already have profile click <a href="/login">here</a></span>
                    </p>
                </div>
            </form>
        </section>`;
} 

export const registerView = (ctx) => {
    ctx.render(template(onSubmit));

    async function onSubmit(e){
        e.preventDefault();

        const formData = new FormData(e.target);
        const email = formData.get('email');
        const rePass = formData.get('confirm-password');
        const password = formData.get('password');
    
        if(email == '' || password == '' || rePass == ''){
            return alert('Empty')
        }
        else if(password != rePass){
            return alert('Pass is different from rePass');    
        }
        else
        {
            await ctx.data.register(email, password);
            ctx.page.redirect('/');
        }
    }
}