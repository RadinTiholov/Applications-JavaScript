const homepage = document.getElementById('homepage');
const commentPage = document.getElementById('commentPage');

const routes = {
    '/': showHome,
    '/comment': showComment
}
export function renderView(path){
    hideAll();
    const view = routes[path];
    view();
}
function hideAll(){
    homepage.style.display = 'none'
    commentPage.style.display = 'none'
}

function showHome(){
    homepage.style.display = 'block'
}
function showComment(){
    commentPage.style.display = 'block'
}