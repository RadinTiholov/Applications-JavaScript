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
export function renderCommentSection(id){
    hideAll();
    showComment(id);
}
function hideAll(){
    homepage.style.display = 'none'
    commentPage.style.display = 'none'
}

function showHome(){
    hideAll();
    homepage.style.display = 'block'
}
function showComment(id){
    hideAll();
    commentPage.style.display = 'block'

    let data = {};
    fetch('http://localhost:3030/jsonstore/collections/myboard/posts')
    .then(res => res.json())
    .catch(err => alert(err))
    .then(res => {
        res = Object.values(res);
        for (const item of res) {
            if (item['_id'] == id) {  
                const nameElement = commentPage.getElementsByClassName('theme-name')[0].children[0];
                nameElement.textContent = item['topicName'];
            }
        }
    })

}