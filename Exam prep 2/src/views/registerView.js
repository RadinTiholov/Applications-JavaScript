import {html} from '../../node_modules/lit-html/lit-html.js'

const template = (onSubmit) => {
    return html`
    <!-- Register Page ( Only for Guest users ) -->
    <section id="register-page" class="register">
            <form id="register-form" action="" method="" @submit = ${onSubmit}>
                <fieldset>
                    <legend>Register Form</legend>
                    <p class="field">
                        <label for="email">Email</label>
                        <span class="input">
                            <input type="text" name="email" id="email" placeholder="Email">
                        </span>
                    </p>
                    <p class="field">
                        <label for="password">Password</label>
                        <span class="input">
                            <input type="password" name="password" id="password" placeholder="Password">
                        </span>
                    </p>
                    <p class="field">
                        <label for="repeat-pass">Repeat Password</label>
                        <span class="input">
                            <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
                        </span>
                    </p>
                    <input class="button submit" type="submit" value="Register">
                </fieldset>
            </form>
        </section>`;
} 

export const registreView = (ctx) => {
    ctx.render(template(onSubmit));

    async function onSubmit(e){
        e.preventDefault();

        const formData = new FormData(e.target);
        const email = formData.get('email');
        const rePass = formData.get('confirm-pass');
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