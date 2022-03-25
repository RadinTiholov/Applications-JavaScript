import {html} from '../../node_modules/lit-html/lit-html.js'

const template = (onSubmit) => {
    return html`
    <!-- Login Page ( Only for Guest users ) -->
    <section id="login-page" class="login">
            <form id="login-form" action="" method="" @submit = ${onSubmit}>
                <fieldset>
                    <legend>Login Form</legend>
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
                    <input class="button submit" type="submit" value="Login">
                </fieldset>
            </form>
        </section>`;
} 

export const loginView = (ctx) => {
    ctx.render(template(onSubmit));

    async function onSubmit(e){
        e.preventDefault();

        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');
    
        if(email == '' || password == ''){
            return alert('Empty')
        }
        else
        {
            await ctx.data.login(email, password);
            ctx.page.redirect('/');
        }
    }
}