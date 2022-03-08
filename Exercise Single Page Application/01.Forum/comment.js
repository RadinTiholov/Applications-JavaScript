const commentBtn = document.getElementById('commentBtn');
const commentElement = document.getElementById('comment');
const usernameElement = document.querySelectorAll('#username')[1];
const commentsElement = document.getElementsByClassName('comment')[0];

commentBtn.addEventListener('click', onComment);

function onComment(e){
    const comment = commentElement.value;
    const username = usernameElement.value;
    if (comment == '' || username == '') {
        alert('Cannot add empty comment');
    }
    else{
        const data = {
            comment,
            username,
            '_id': localStorage.getItem('_id')
        }
        makeRequest(data);

        usernameElement.value = '';
        commentElement.value = '';
    }
}
function makeRequest(data){
    const url = 'http://localhost:3030/jsonstore/collections/myboard/comments';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .catch(err => alert(err))
    .then(res => {
        showAllComments();
    })
}
export function showAllComments(){
    clearAll();
    const id = localStorage.getItem('_id');
    showPost(id);

    const url = 'http://localhost:3030/jsonstore/collections/myboard/comments';
    fetch(url)
    .then(res => res.json())
    .catch(err => alert(err))
    .then(res => {
        res = Object.values(res);
        for (const item of res) {
            console.log(id);
            console.log(item);
            commentsElement.innerHTML += `<div id="user-comment">
            <div class="topic-name-wrapper">
                <div class="topic-name">
                    <p><strong>${item['username']}</strong> commented on <time>3/15/2021, 12:39:02 AM</time></p>
                    <div class="post-content">
                        <p>${item['comment']}</p>
                    </div>
                </div>
            </div>
        </div>`;
            
        }
    })
}
function clearAll(){
    commentsElement.innerHTML = '';
}
async function showPost(id){
    fetch('http://localhost:3030/jsonstore/collections/myboard/posts')
    .then(res => res.json())
    .catch(err => alert(err))
    .then(res => {
        res = Object.values(res);
        for (const item of res) {
            if (item['_id'] == id) {
            commentsElement.innerHTML += `<div class="header">
            <img src="./static/profile.png" alt="avatar">
            <p><span>${item['username']}</span> posted on <time>2020-10-10 12:08:28</time></p>
        
            <p class="post-content">${item['postText']}</p>
        </div>`;
            }
        }
    })
}