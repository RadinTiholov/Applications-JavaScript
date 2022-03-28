import page from '../node_modules/page/page.mjs'
import { navigationMiddleware } from './middlewares/navigationMiddleware.js';
import { catalogView } from './views/catalogView.js';
import { createView } from './views/createView.js';
import { deleteView } from './views/deleteView.js';
import { detailsView } from './views/detailsView.js';
import { editView } from './views/editView.js';
import { homeView } from './views/homeView.js';
import { loginView } from './views/loginView.js';
import { logoutView } from './views/logoutView.js';
import { registerView } from './views/registerView.js';
import { renderMiddleware } from './middlewares/renderMiddleware.js';

page(navigationMiddleware);
page(renderMiddleware);
page('/', homeView);
page('/catalog', catalogView);
page('/create', createView);
page('/logout', logoutView);
page('/login', loginView);
page('/register', registerView);
page('/details/:id', detailsView);
page('/edit/:id', editView);
page('/delete/:id', deleteView);

page.start();
