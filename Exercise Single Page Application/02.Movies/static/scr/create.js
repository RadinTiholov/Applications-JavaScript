const section = document.getElementById('add-movie');
const form = section.querySelector('form');
import {showView} from './router.js'

form.addEventListener('submit', onSubmit);

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(form);

    const title = formData.get('title');
    const description = formData.get('description');
    const img = formData.get('imageUrl');
    if (title == '' || description == '' || img == '') {
        alert('Cannot create a post with empty data.')
    }
    else{
        createMovie(title, description, img);
        form.reset();
        showView('/');
    }
}
function createMovie(title, description, img){
    const url = 'http://localhost:3030/data/movies ';

    fetch(url, {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': localStorage.getItem('accessToken')
        },
        body: JSON.stringify({ title, description, img })
    })
    .then(res => res.json())
    .catch(err => alert(err))
    .then(res => {
        console.log(res);
    })
}