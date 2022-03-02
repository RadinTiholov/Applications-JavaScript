const infoElement = document.getElementsByClassName('info')[0];
const departButton = document.getElementById('depart');
const arriveButton = document.getElementById('arrive');
let nextStopId = 'depot';
let currentStop = '';

infoElement.textContent = 'Not Connected';

function solve() {
    function depart() {
        departButton.disabled = true;
        arriveButton.disabled = false;

        const url = `http://localhost:3030/jsonstore/bus/schedule/${nextStopId}`;

        fetch(url)
            .then(res => res.json())
            .catch(err => {
                infoElement.textContent = 'Error';
                departButton.disabled = true;
                arriveButton.disabled = true;
            })
            .then(res => {
                infoElement.textContent = `Next stop ${res.name}`;
                nextStopId = res.next;
                currentStop = res.name;
            });
    }

    function arrive() {
        departButton.disabled = false;
        arriveButton.disabled = true;

        infoElement.textContent = `Arriving at ${currentStop}`;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();