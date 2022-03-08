const body = document.querySelector('body');
body.addEventListener('click', clickResponse)

import {renderView} from "./router.js"
renderView('/');
function clickResponse(e){
    e.preventDefault();

    if (e.target.tagName == "A") {
        console.log(e.target.href);
        const path = e.target.href;
        const url = new URL(path);
        renderView(url.pathname);
    }
}