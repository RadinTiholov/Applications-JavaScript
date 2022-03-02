function solution() {
    const urlForArticles = 'http://localhost:3030/jsonstore/advanced/articles/list';
    const mainSection = document.getElementById('main');

    fetch(urlForArticles)
        .then(res => res.json())
        .catch(err => {
            alert('Error');
        })
        .then(res => {
            console.log(res);
            for (const element of res) {
                const id = element['_id'];
                const title = element['title'];
                const urlForContent = `http://localhost:3030/jsonstore/advanced/articles/details/${id}`; 
                fetch(urlForContent)
                    .then(res => res.json())
                    .catch(err => {
                        alert('Error');
                    })
                    .then(secRes => {
                        const content = secRes['content'];

                        const accordionElement = document.createElement('div');
                        accordionElement.classList.add('accordion');

                        const headElement = document.createElement('div');
                        headElement.classList.add('head');
                        
                        const nameElement = document.createElement('span');
                        nameElement.textContent = title;
                        const buttonElement = document.createElement('button');
                        buttonElement.classList.add('button');
                        buttonElement.id = id;
                        buttonElement.textContent = 'More';

                        headElement.appendChild(nameElement);
                        headElement.appendChild(buttonElement);
                        accordionElement.addEventListener('click', toggle);

                        const extraElement = document.createElement('div');
                        extraElement.classList.add('extra');

                        const contentElement = document.createElement('p');
                        contentElement.textContent = content;

                        extraElement.appendChild(contentElement);

                        accordionElement.appendChild(headElement);
                        accordionElement.appendChild(extraElement);

                        mainSection.appendChild(accordionElement);
                    }); 
            }
        });
    function toggle(e) {
        let button = e.target;
        let extra = e.target.parentNode.parentNode.children[1];
        if (button.textContent === 'More') {
            extra.style.display = 'block';
            button.textContent = 'Less';
        }
        else if(button.textContent === 'Less'){
            extra.style.display = 'none';
            button.textContent = 'More';
        }
    }
}
solution();