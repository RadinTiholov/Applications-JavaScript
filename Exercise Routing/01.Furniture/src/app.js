import { page, render} from './lib.js';
import { catalogPage } from "./views/catalog.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { loginPage } from "./views/login.js";
import { myFurniturePage } from "./views/my-furniture.js";
import { registerPage } from "./views/register.js";
const root = document.querySelector('.container')

page(decorateContext);
page('/', catalogPage);
page('/details/:id', detailsPage);
page('/create', createPage);
page('/edit/:id', editPage);
page('/login', loginPage);
page('/register', registerPage);
page('/my-furniture', myFurniturePage);

page.start();

function decorateContext(ctx, next){
    ctx.render = (content) => render(content, root);

    next();
}