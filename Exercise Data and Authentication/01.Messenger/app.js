function attachEvents() {
    const submitButton = document.getElementById('submit');
    const refreshButton = document.getElementById('refresh');
    const messagesArea = document.getElementById('messages');
    const url = 'http://localhost:3030/jsonstore/messenger';

    submitButton.addEventListener('click', submitButtonOnClick);
    refreshButton.addEventListener('click', refreshButtonOnClick);

    function submitButtonOnClick(e){
        const authorElement = document.getElementsByName('author')[0];
        const contentElement = document.getElementsByName('content')[0];

        if (authorElement.value === '' || contentElement.value === '') {
            alert('Cannot add empty data')
        }
        else{
            fetch(url, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    author: authorElement.value,
                    content: contentElement.value
                })
            })
            authorElement.value = '';
            contentElement.value = '';
        }
    }
    function refreshButtonOnClick(e){
        fetch(url)
        .then(res => res.json())
        .catch(err => alert(err))
        .then(res => {
            res = Object.values(res);
            let allMessages = '';
            for (const data of res) {
                allMessages += `${data['author']}: ${data['content']}\n`;
            }
            messagesArea.textContent = allMessages;
        })
    }
}

attachEvents();