import {render} from '../../node_modules/lit-html/lit-html.js'
import * as data from '../data.js';
const root = document.querySelector('main');

export const renderMiddleware = (ctx, next) => {
    ctx.render = (content) => render(content, root);
    ctx.data = data;

    next();
} 