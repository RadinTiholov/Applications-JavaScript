function loadCommits() {
    const usernameElements = document.getElementById('username');
    const repoElements = document.getElementById('repo');
    const commitsElement = document.getElementById('commits');
    commitsElement.innerHTML = '';

    let url = `https://api.github.com/repos/${usernameElements.value}/${repoElements.value}/commits`;

    fetch(url)
    .then(async (data) => {
        if (!data.ok) {
            throw new Error('Not Found');
        }})
        .then(data => data.json())
        .catch(err => {
            const element = document.createElement('li');
            element.textContent = err;
            commitsElement.appendChild(element);
            return;
        })
        .then(data => {
            for (const entry of Array.from(data)) {
                const liElement = document.createElement('li');
                liElement.textContent = `${entry.commit.author.name}: ${entry.commit.message}`;
                commitsElement.appendChild(liElement);
            }
        })
}