import {html} from '../../node_modules/lit-html/lit-html.js'

const template = (onSubmit) => {
    return html`<!-- Register Page ( Only for guest users ) -->
    <section id="register">
        <form id="register-form" @submit = ${onSubmit}>
            <div class="container">
                <h1>Register</h1>
                <label for="username">Username</label>
                <input id="username" type="text" placeholder="Enter Username" name="username">
                <label for="email">Email</label>
                <input id="email" type="text" placeholder="Enter Email" name="email">
                <label for="password">Password</label>
                <input id="password" type="password" placeholder="Enter Password" name="password">
                <label for="repeatPass">Repeat Password</label>
                <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
                <div class="gender">
                    <input type="radio" name="gender" id="female" value="female">
                    <label for="female">Female</label>
                    <input type="radio" name="gender" id="male" value="male" checked>
                    <label for="male">Male</label>
                </div>
                <input type="submit" class="registerbtn button" value="Register">
                <div class="container signin">
                    <p>Already have an account?<a href="/login">Sign in</a>.</p>
                </div>
            </div>
        </form>
    </section>`;
} 

export const registerView = (ctx) => {
    ctx.render(template(onSubmit));

    async function onSubmit(e){
        e.preventDefault();

        const formData = new FormData(e.target);
        const username = formData.get('username');
        const email = formData.get('email');
        const rePass = formData.get('repeatPass');
        const password = formData.get('password');
        const gender = formData.get('gender');
        console.log(gender);
    
        if(username == '' || email == '' || password == '' || rePass == '' || gender == ''){
            return alert('Empty')
        }
        else if(password != rePass){
            return alert('Pass is different from rePass');    
        }
        else
        {
            const data = {
                username,
                email,
                password,
                gender
            }              
            await ctx.data.register(data);
            ctx.page.redirect('/allmemes');
        }
    }
}