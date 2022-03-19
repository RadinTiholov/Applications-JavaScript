import { page, render} from './lib.js';
import { catalogPage } from "./views/catalog.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { loginPage } from "./views/login.js";
import { myFurniturePage } from "./views/my-furniture.js";
import { registerPage } from "./views/register.js";
import * as data from "./data.js";
window.data = data;

const root = document.querySelector('.container')
document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(decorateContext);
page('/', catalogPage);
page('/details/:id', detailsPage);
page('/create', createPage);
page('/edit/:id', editPage);
page('/login', loginPage);
page('/register', registerPage);
page('/my-furniture', myFurniturePage);

page.start();
goToHome();
updateUserNav();

async function onLogout(e){
    const res = await data.logout();
    updateUserNav();
    goToHome();
}
async function goToHome(){
    page.redirect('/');
}
function updateUserNav(){
    const userId = sessionStorage.getItem('userId');
    if (userId) {
        document.getElementById('user').style.display = 'inline';
        document.getElementById('guest').style.display = 'none';
    }
    else{
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'inline';
    }
}

function decorateContext(ctx, next){
    ctx.render = (content) => render(content, root);
    ctx.data = data;
    ctx.updateUserNav = updateUserNav;

    next();
}