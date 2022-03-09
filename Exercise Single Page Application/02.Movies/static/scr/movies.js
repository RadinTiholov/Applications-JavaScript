const movies = document.getElementById('movies');

export function loadMovies(){
    const url = 'http://localhost:3030/data/movies';
    fetch(url)
    .then(res => res.json())
    .catch(err => console.log(res))
    .then(res => {
        res = Object.values(res);
        let parentElement = movies.children[0].children[0];
        parentElement.innerHTML = '';
        res.forEach(item => {
            const element = document.createElement('div');
            element.className = 'card mb-4';
            element.innerHTML += `
            <img class="card-img-top" src="${item.img}"
                alt="Card image cap" width="400">
            <div class="card-body">
                <h4 class="card-title">${item.title}</h4>
            </div>
            <div class="card-footer">
                <a>
                    <button data-id="${item._id}" type="button" class="btn btn-info">Details</button>
                </a>
            </div>`;
            parentElement.appendChild(element);
        });
    })
}