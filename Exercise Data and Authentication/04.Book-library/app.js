window.onload=function(){
    const loadBooksButton = document.getElementById('loadBooks');
    const submitButton = document.getElementById('submitBtn');
    const editSaveButton = document.getElementById('saveBtn');
    editSaveButton.style.display = 'none';

    loadBooksButton.addEventListener('click', loadBooks);
    submitButton.addEventListener('click', submitButtonPress)
    const tbodyElement = document.getElementsByTagName('tbody')[0];
    loadBooks();
    function submitButtonPress(e){
        const titleInput = document.getElementById('title');
        const authorInput = document.getElementById('author');

        if (titleInput.value === '' || authorInput.value === '') {
            alert('Cannot add empty data!')
        }
        else{
            const title = titleInput.value;
            const author = authorInput.value;

            const url = 'http://localhost:3030/jsonstore/collections/books';
            fetch(url, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    author
                })})

                loadBooks();    
        }
    }
    function loadBooks(e){
        const url = 'http://localhost:3030/jsonstore/collections/books';

        fetch(url)
        .then(x => x.json())
        .catch(err =>  alert(err))
        .then(res => {
            tbodyElement.innerHTML = '';
            keys = Object.keys(res);
            arr = Object.values(res);
            console.log(arr);
            let index = 0;
            for (const item of arr) {
                const trElement = document.createElement('tr');

                const authorElement = trElement.insertCell(0);
                authorElement.textContent = item['title'];

                const titleElement = trElement.insertCell(1);
                titleElement.textContent = item['author'];

                const buttonElements = trElement.insertCell(2);
                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';

                buttonElements.appendChild(editButton);
                buttonElements.appendChild(deleteButton);
                editButton.addEventListener('click', editPress);
                deleteButton.addEventListener('click', deletePress);

                trElement.setAttribute('id', keys[index]);

                tbodyElement.appendChild(trElement);
                index++;
            }
        })
    }
    function editPress(e){
        const id = e.target.parentNode.parentNode.id;
        console.log(id);
        
        const urlForGet = `http://localhost:3030/jsonstore/collections/books/${id}`
        const titleInput = document.getElementById('title');
        const authorInput = document.getElementById('author');

        
        submitButton.style.display = 'none';
        editSaveButton.style.display = 'inline';
        fetch(urlForGet)
        .then(x => x.json())
        .catch(err =>  alert(err))
        .then(res => {
            const formName = document.getElementById('formName');
            titleInput.value = res['title'];
            authorInput.value = res['author'];
            formName.textContent = 'EditForm';
            editSaveButton.addEventListener('click',editButton)
        });
        function editButton(e){
            e.preventDefault();
            const urlToPut = `http://localhost:3030/jsonstore/collections/books/${id}`;
            fetch(urlToPut, {
                method: 'PUT',
                endpoint: `/jsonstore/books/${id}`,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    author: authorInput.value,
                    title: titleInput.value
                })
            });

            const formName = document.getElementById('formName');
            titleInput.value = '';
            authorInput.value = '';
            submitButton.style.display = 'inline';
            editSaveButton.style.display = 'none';
            formName.textContent = 'FORM';
        }
    }
    async function deletePress(e){
        const id = e.target.parentNode.parentNode.id;
        const res = await fetch(`http://localhost:3030/jsonstore/collections/books/${id}`, {
                method: 'DELETE'
            });
        loadBooks();
    }
    async function deleteById(id){
        const res = await fetch(`http://localhost:3030/jsonstore/collections/books/${id}`, {
                method: 'DELETE'
            });
        loadBooks();
    }
}