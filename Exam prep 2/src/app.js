import page from '../node_modules/page/page.mjs'
import { navigationMiddleware } from './middlewares/navigationMiddleware.js';
import {renderMiddleware} from './middlewares/renderMiddleware.js'
import { createView } from './views/createView.js';
import { dashboardView } from './views/dashboardView.js';
import { deleteView } from './views/deleteView.js';
import { detailsView } from './views/detailsView.js';
import { editView } from './views/editView.js';
import { loginView } from './views/loginView.js';
import { logoutView } from './views/logoutView.js';
import { myBookView } from './views/myBooksView.js';
import { registreView } from './views/registerView.js';

page(renderMiddleware);
page(navigationMiddleware);
page('/', dashboardView);
page('/login', loginView)
page('/register', registreView)
page('/mybooks', myBookView)
page('/details/:id', detailsView)
page('/create', createView)
page('/logout', logoutView)
page('/edit/:id', editView)
page('/delete/:id', deleteView)

page.start();