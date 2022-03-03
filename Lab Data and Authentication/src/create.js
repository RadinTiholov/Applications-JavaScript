window.onload=function(){
    const formElement = document.querySelector('form');

    formElement.addEventListener('submit', (e) => {
        let formData = new FormData(e.currentTarget);

        let name = formData.get('name');
        let img = formData.get('img');
        let ingredients = formData.get('ingredients').split('\n');
        let steps = formData.get('steps').split('\n');

        let data = {
            name,
            img,
            ingredients,
            steps
        }
        let accessToken = localStorage.getItem('accessToken');
        fetch('http://localhost:3030/data/recipes', {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              'X-Authorization': accessToken
            },
            body: JSON.stringify(data)
        })
        .then(data => data.json())
        .catch(err => {alert(err)})
        .then(user => {
            alert('gg')
            window.location.href = 'index.html';
        })
    })

}

