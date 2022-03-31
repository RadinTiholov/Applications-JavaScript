import page from '../node_modules/page/page.mjs'
import { navigationMiddleware } from './middlewares/navigationMiddleware.js';
import { renderMiddleware } from './middlewares/renderMiddleware.js';
import { allMemesView } from './views/allMemesView.js';
import { createView } from './views/createView.js';
import { detailsView } from './views/detailsView.js';
import { editView } from './views/editView.js';
import { homeView } from './views/homeview.js';
import { loginView } from './views/loginView.js';
import { logoutView } from './views/logoutView.js';
import { registerView } from './views/registerView.js';
import { userView } from './views/userView.js';

page(navigationMiddleware);
page(renderMiddleware);

page('/', homeView)
page('/allmemes', allMemesView)
page('/create', createView)
page('/myprofile', userView)
page('/logout', logoutView)
page('/login', loginView)
page('/register', registerView)
page('/details/:id', detailsView);
page('/edit/:id', editView);
page.start();