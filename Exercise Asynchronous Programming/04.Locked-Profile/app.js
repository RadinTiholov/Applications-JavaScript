function lockedProfile() {
    const url = 'http://localhost:3030/jsonstore/advanced/profiles';
    const main = document.getElementById('main');
    fetch(url)
        .then(res => res.json())
        .catch(err => {
            alert(err);
        })
        .then(res => {
            const personNode = document.getElementsByClassName('profile')[0];
            for (const info in res) {
                const age = res[info]['age'];
                const email = res[info]['email'];
                const user = res[info]['username'];

                const newPersonNode = personNode.cloneNode(true);
                console.log(newPersonNode.childNodes);
                newPersonNode.childNodes[16].value = user;
                newPersonNode.childNodes[18].childNodes[5].value = email;
                newPersonNode.childNodes[18].childNodes[9].value = age;
                newPersonNode.childNodes[20].addEventListener('click', showMore);

                main.appendChild(newPersonNode);
            }
            main.removeChild(personNode);
        });




    const divElements = Array.from(document.querySelectorAll('.profile'));
    for (const element of divElements) {
        element.childNodes[20].addEventListener('click', showMore);
    }
    function showMore(ev){
        if(ev.target.parentNode.children[2].checked) {
            return;
        }
        
        if(ev.target.textContent === 'Show more') {
            ev.target.parentNode.children[9].style.display = 'block';
            ev.target.parentNode.children[9].classList.remove('hiddenInfo');
            ev.target.parentNode.children[9].children[2].style.display = 'block';
            ev.target.parentNode.children[9].children[3].style.display = 'block';
            ev.target.textContent = 'Hide it';
        } else {
            ev.target.parentNode.children[9].style.display = 'none';
            ev.target.parentNode.children[9].classList.add('hiddenInfo');
            ev.target.textContent = 'Show more'
        }
    }
}