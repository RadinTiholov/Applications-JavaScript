import page from '../node_modules/page/page.mjs'
import { navigationMiddleware } from './middlewares/navigationMiddleware.js';
import { renderMiddleware } from './middlewares/renderMiddleware.js';
import { allMemesView } from './views/allMemesView.js';
import { createView } from './views/createView.js';
import { homeView } from './views/homeview.js';
import { loginView } from './views/loginView.js';
import { logoutView } from './views/logoutView.js';
import { registerView } from './views/registerView.js';

page(navigationMiddleware);
page(renderMiddleware);

page('/', homeView)
page('/allmemes', allMemesView)
page('/create', createView)
page('/myprofile', () => console.log('myprofile'))
page('/logout', logoutView)
page('/login', loginView)
page('/register', registerView)
page.start();