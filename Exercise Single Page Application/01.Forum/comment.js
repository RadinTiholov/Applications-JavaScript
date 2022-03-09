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
        let currentTime = Date(Date.now()).toString();
        const data = {
            comment,
            username,
            'ownerId': localStorage.getItem('_id'),
            currentTime: currentTime.substring(0, currentTime.indexOf('('))
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
        allComments();
    })
}
export function showAllComments(){
    allComments();
}
async function allComments(){
    commentsElement.innerHTML = '';
    const id = localStorage.getItem('_id');

    //get post 
    await fetch('http://localhost:3030/jsonstore/collections/myboard/posts')
    .then(res => res.json())
    .catch(err => alert(err))
    .then(res => {
        res = Object.values(res);
        for (const item of res) {
            if (item['_id'] == id) {
            commentsElement.innerHTML += `<div class="header">
            <img src="./static/profile.png" alt="avatar">
            <p><span>${item['username']}</span> posted on <time>${item['currentTime']}</time></p>
        
            <p class="post-content">${item['postText']}</p>
        </div>`;
            }
        }
    })

    const url = 'http://localhost:3030/jsonstore/collections/myboard/comments';
    fetch(url)
    .then(res => res.json())
    .catch(err => alert(err))
    .then(res => {
        res = Object.values(res);
        for (const item of res) {
            if (id == item['ownerId']) {
            commentsElement.innerHTML += `<div id="user-comment">
            <div class="topic-name-wrapper">
                <div class="topic-name">
                    <p><strong>${item['username']}</strong> commented on <time>${item['currentTime']}</time></p>
                    <div class="post-content">
                        <p>${item['comment']}</p>
                    </div>
                </div>
            </div>
        </div>`;
            }
            
        }
    })
}
function clearAll(){
    commentsElement.innerHTML = '';
}