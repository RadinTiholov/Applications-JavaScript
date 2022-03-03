function attachEvents() {
    const phonebookElement = document.getElementById('phonebook');
    const loadButton = document.getElementById('btnLoad');
    const createButton = document.getElementById('btnCreate');
    const url = 'http://localhost:3030/jsonstore/phonebook';

    loadButton.addEventListener('click', loadButtonPress);
    createButton.addEventListener('click', createButtonPress);

    function loadButtonPress(e){
        phonebookElement.innerHTML = '';

        fetch(url)
        .then(res => res.json())
        .catch(err => alert(err))
        .then(res => {
            res = Object.values(res);
            for (const item of res) {  
                const liElement = document.createElement('li');
                liElement.textContent = `${item.person}: ${item.phone}`;
                const buttonElement = document.createElement('button');
                buttonElement.textContent  = 'Delete';
                buttonElement.id = 'btnDelete';
                buttonElement.addEventListener('click', deleteButtonPress);
                liElement.appendChild(buttonElement);
                liElement.setAttribute('id', item._id);
                
                phonebookElement.appendChild(liElement);
            }
        })
        async function deleteButtonPress(e){
            const id = e.target.parentNode.id;
            e.target.parentNode.remove();
            const res = await fetch(`http://localhost:3030/jsonstore/phonebook/${id}`, {
                method: 'DELETE'
            });
        }
    }
    function createButtonPress(e){
        const personInput = document.getElementById('person');
        const phoneInput = document.getElementById('phone');

        const person = personInput.value;
        const phone = phoneInput.value;
        if (person === '' || phone === '') {
            alert('Cannot add empty data')
        }
        else{
            fetch(url, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    person,
                    phone
                })
            })
            personInput.value = '';
            phoneInput.value = '';
        }
    }
}

attachEvents();