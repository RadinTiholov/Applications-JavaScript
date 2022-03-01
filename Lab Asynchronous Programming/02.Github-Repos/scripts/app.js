function loadRepos() {
	const inputElement = document.getElementById('username');
	const resultElement = document.getElementById('repos');
	resultElement.innerHTML = '';
	console.log(inputElement.value);

	let url = `https://api.github.com/users/${inputElement.value}/repos`;
	fetch(url).
		then(res => res.json()).
		catch(err => {resultElement.textContent = 'Error'}).
		then(data => {
			for (const entry of Array.from(data)) {
				const fullName = entry['full_name'];
				const url = entry['html_url'];
				console.log(fullName);
				console.log(url);

				let liElement = document.createElement('li');
				let aElement = document.createElement('a');
				aElement.href = `${url}`;
				aElement.textContent = `${fullName}`;

				liElement.appendChild(aElement);
				resultElement.appendChild(liElement);
			}
		})
}