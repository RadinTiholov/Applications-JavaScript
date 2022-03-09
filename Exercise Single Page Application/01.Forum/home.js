const createButton = document.getElementById('createBtn');
createButton.addEventListener('click', createPost);

const cancelButton = document.getElementById('cancelBtn');
cancelButton.addEventListener('click', cancelPost);

const topicContainer = document.getElementsByClassName('topic-container')[0];

function cancelPost(e){
    e.preventDefault();
    const topicNameElement = document.getElementById('topicName');
    const usernameElement = document.getElementById('username');
    const postTextElement = document.getElementById('postText');

    topicNameElement.value = '';
    usernameElement.value = '';
    postTextElement.value = '';
}
function createPost(e){
    e.preventDefault();

    const topicNameElement = document.getElementById('topicName');
    const usernameElement = document.getElementById('username');
    const postTextElement = document.getElementById('postText');

    const topicName = topicNameElement.value;
    const username = usernameElement.value;
    const postText = postTextElement.value;
    if (topicName == '' || username == '' || postText == '') {
        alert("Empty data")
    }
    else{
        let currentTime = Date(Date.now()).toString();
        const data = {
            topicName,
            username,
            postText,
            currentTime: currentTime.substring(0, currentTime.indexOf('('))
        }
        makeRequest(data);

        topicNameElement.value = '';
        usernameElement.value = '';
        postTextElement.value = '';
    }
}
function makeRequest(data){
    fetch('http://localhost:3030/jsonstore/collections/myboard/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .catch(err => alert(err))
    .then(res => {
        visualiseData(res);
    })
}
function visualiseData(data){
    //Vis with html
    topicContainer.innerHTML += `<div class="topic-name-wrapper">
    <div class="topic-name">
        <a class="normal" >
            <h2 href="/comment" data-id = "${data['_id']}">${data['topicName']}</h2>
        </a>
        <div class="columns">
            <div>
                <p>Date: <time>${data['currentTime']}</time></p>
                <div class="nick-name">
                    <p>Username: <span>${data['username']}</span></p>
                </div>
            </div>
        </div>
    </div>
</div>`
}
export function loadAll(){
    fetch('http://localhost:3030/jsonstore/collections/myboard/posts')
    .then(res => res.json())
    .catch(err => alert(err))
    .then(res => {
        res = Object.values(res);
        for (const item of res) {
            const data = {
                'topicName' : item['topicName'],
                'postText' : item['postText'],
                'username': item['username'],
                '_id': item['_id'],
                'currentTime' : item['currentTime']
            }
            visualiseData(data);
        }
    })
}