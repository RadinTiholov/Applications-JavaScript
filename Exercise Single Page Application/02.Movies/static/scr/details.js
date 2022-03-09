const section = document.getElementById('discription');

export function detailsPage(id) {
    updateDataForDetailsPage(id);
}

async function updateDataForDetailsPage(id){
    const accessToken =  localStorage.getItem('accessToken');
    const email =  localStorage.getItem('email');
    const username =  localStorage.getItem('username');
    const _id =  localStorage.getItem('_id');
    const user = {
        accessToken,
        email,
        username,
        _id
    }

    const [movie, likes, ownLike] = await Promise.all([
        getMovie(id),
        getLikes(id),
        getOwnLike(id, user)
    ]);

    section.replaceChildren(createMovieCard(movie, user, likes, ownLike));
}
function createMovieCard(movie, user, likes, ownLike) {
    const element = document.createElement('div');
    element.className = 'container';
    element.innerHTML = `
    <div class="row bg-light text-dark">
        <h1>Movie title: ${movie.title}</h1>
        <div class="col-md-8">
            <img class="img-thumbnail" src="${movie.img}" alt="Movie">
        </div>
        <div class="col-md-4 text-center">
            <h3 class="my-3 ">Movie Description</h3>
            <p>${movie.description}</p>
            ${createControls(movie, user, ownLike)}
            <span class="enrolled-span">Liked ${likes}</span>
        </div>
    </div>`;

    const likeBtn = element.querySelector('.like-btn');
    if (likeBtn) {
        likeBtn.addEventListener('click', (e) => likeMovie(e, movie._id));
    }
    
    const deleteButton = element.querySelector('.btn-danger');
    const editButton = element.querySelector('.btn-warning');
    deleteButton.addEventListener('click', (e) => deleteFilm(e, movie._id));
    editButton.addEventListener('click', (e) => editFilm(e, movie._id));

    return element;
}
function deleteFilm(e, id){
    console.log('delete ' + id);
}
function editFilm(e, id){
    console.log('edit ' + id);
}
function createControls(movie, user, ownLike) {
    const isOwner = user && user._id == movie._ownerId;
    let buttons = [];
    if (isOwner) {
        buttons.push('<a class="btn btn-danger" href="#">Delete</a>');
        buttons.push('<a class="btn btn-warning" href="#">Edit</a>');
    }
    else if(user && ownLike == false){
        buttons.push('<a class="btn btn-primary like-btn" href="#">Like</a>');
    }

    return buttons.join(' ');
}
async function getMovie(id) {
    const res = await fetch(`http://localhost:3030/data/movies/${id}`);
    const movie = await res.json();

    return movie;
}

async function getLikes(id) {
    const res = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`);
    const likes = await res.json();

    return likes;
}

async function getOwnLike(movieId, user) {
    if (!user) {
        return false;
    } else {
        const userId = user._id;
        const res = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22`);
        const like = await res.json();

        return like.length > 0;
    }
}
async function likeMovie(e, movieId){
    e.preventDefault();

    const accessToken =  localStorage.getItem('accessToken');
    const email =  localStorage.getItem('email');
    const username =  localStorage.getItem('username');
    const _id =  localStorage.getItem('_id');
    const user = {
        accessToken,
        email,
        username,
        _id
    }

    await fetch('http://localhost:3030/data/likes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': user.accessToken
        },
        body: JSON.stringify({
            movieId
        })
    });

    detailsPage(movieId);
}