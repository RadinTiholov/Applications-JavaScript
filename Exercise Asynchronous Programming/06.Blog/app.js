function attachEvents() {
    const loadButton = document.getElementById('btnLoadPosts');
    const viewButton = document.getElementById('btnViewPost');
    const postsElement = document.getElementById('posts');

    const postTitle = document.getElementById('post-title');
    const postBody = document.getElementById('post-body');
    const postComments = document.getElementById('post-comments');

    loadButton.addEventListener('click', loadOptions);
    viewButton.addEventListener('click', viewOptions);

    function loadOptions(e){
        postsElement.innerHTML = '';
        const url = 'http://localhost:3030/jsonstore/blog/posts';

        fetch(url)
        .then(res => res.json())
        .catch(err => {
            alert("Error");
        })
        .then(res => {
            for (const name in res) {
                const title = res[name]['title'];
                const optionElement = document.createElement('option');
                optionElement.textContent = title;
                optionElement.value = res[name]['id'];
                postsElement.appendChild(optionElement);
            }
        });
    }
    function viewOptions(e){
        postComments.innerHTML = '';
        const selectedId = postsElement.value;
        const url = `http://localhost:3030/jsonstore/blog/comments`;

        fetch(url)
        .then(res => res.json())
        .catch(err => {
            alert("Error");
        })
        .then(res => {
            let asArr = Object.entries(res);
            asArr = asArr.filter(([, value]) => value.postId === postsElement.value);
            
            fetch('http://localhost:3030/jsonstore/blog/posts')
            .then(res => res.json())
            .catch(err => {
                alert("Error");
            })
            .then(res => {
                postTitle.textContent = res[postsElement.value].title.toUpperCase();
                postBody.textContent = res[postsElement.value].body;
            })
            
            for (const [key, value] of asArr) {

                const liElement = document.createElement('li');
                liElement.id = key;
                liElement.textContent = value.text;
                postComments.appendChild(liElement);
            }
        });
    }
}

attachEvents();