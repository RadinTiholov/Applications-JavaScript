function getInfo() {
    const inputElement = document.getElementById('stopId');
    const stopNameElement = document.getElementById('stopName');
    const busesElement = document.getElementById('buses');
    stopNameElement.innerHTML = '';
    busesElement.innerHTML = '';

    const url = `http://localhost:3030/jsonstore/bus/businfo/${inputElement.value}`;

    fetch(url)
        .then(res => res.json())
        .catch(err => {
            stopNameElement.textContent = 'Error';
        })
        .then(res => {
            stopNameElement.textContent = res.name;
            for (const bus in res.buses) {
                const liElement = document.createElement('li');
                liElement.textContent = `Bus ${bus} arrives in ${res.buses[bus]} minutes`;
                busesElement.appendChild(liElement);
            }
        });
}