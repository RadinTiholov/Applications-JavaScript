const createButton = document.getElementById('createBtn');
createButton.addEventListener('click', createPost);
const topicContainer = document.getElementsByClassName('topic-container')[0];

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
        const data = {
            topicName,
            username,
            postText
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
    console.log(data);
}