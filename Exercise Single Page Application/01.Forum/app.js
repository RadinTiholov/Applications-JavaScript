const body = document.querySelector('body');
body.addEventListener('click', clickResponse)

import {renderView} from "./router.js"
import {renderCommentSection} from "./router.js"
import {loadAll} from "./home.js"
import {showAllComments} from "./comment.js"

renderView('/');
loadAll();
function clickResponse(e){
    e.preventDefault();

    if (e.target.tagName == "A") {
        console.log(e.target.getAttribute('href'));
        const path = e.target.getAttribute('href');
        renderView(path);
    }
    else if(e.target.tagName == "H2"){
        const id = e.target.getAttribute('data-id');
        localStorage.setItem("_id", id);
        renderCommentSection(id);
        showAllComments();
    }
}