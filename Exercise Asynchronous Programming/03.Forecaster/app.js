function attachEvents() {
    const locationElement = document.getElementById('location');
    const submitButton = document.getElementById('submit');
    const forecastElement = document.getElementById('forecast');
    const currentElement = document.getElementById('current');
    const upcomingElement = document.getElementById('upcoming');
    function logError(){
        const error = document.createElement('span');
        error.classList.add('forecast-data');
        error.textContent = 'Error';

        currentElement.appendChild(error);                    
    }
    const conditions = {
        Sunny : '&#x2600;',
        Partly : '&#x26C5;',
        Overcast : '&#x2601',
        Rain : '&#x2614;',
        Degrees : '&#176;',
    }

    submitButton.addEventListener('click', () => {
        const url = 'http://localhost:3030/jsonstore/forecaster/locations';

        fetch(url)
            .then(res => res.json())
            .catch(err => {
                logError();
                forecastElement.style.display = 'block';
            })
            .then(res => {
                if (!res.some(x => x['name'] === locationElement.value)) {
                    logError();
                    forecastElement.style.display = 'block';
                }
                else{
                    const city = res.find(x => x['name'] === locationElement.value);
                    const code = city['code'];
                    forecastElement.style.display = 'inline';

                    const urlForCurrentCondition = `http://localhost:3030/jsonstore/forecaster/today/${code}`;
                    const urlForThreeDays = `http://localhost:3030/jsonstore/forecaster/upcoming/${code}`;

                    fetch(urlForCurrentCondition)
                        .then(res => res.json())
                        .catch(err => {
                            logError();
                        })
                        .then(res => {
                            currentElement.innerHTML = '<div class="label">Current conditions</div>';
                            const condition = res['forecast']['condition'].split(' ')[0];
                            const conditionIconElement = document.createElement('span');
                            conditionIconElement.classList.add('symbol');
                            conditionIconElement.innerHTML = conditions[condition];

                            currentElement.appendChild(conditionIconElement);

                            const conditionElement = document.createElement('span');
                            conditionElement.classList.add('condition');

                            const locationElement = document.createElement('span');
                            locationElement.classList.add('forecast-data');
                            locationElement.textContent = res['name'];

                            const tempElement = document.createElement('span');
                            tempElement.classList.add('forecast-data');
                            tempElement.textContent = res['forecast']['low'] + '°/' + res['forecast']['high'] + '°';

                            const condlement = document.createElement('span');
                            condlement.classList.add('forecast-data');
                            condlement.textContent = res['forecast']['condition'];

                            conditionElement.appendChild(locationElement);
                            conditionElement.appendChild(tempElement);
                            conditionElement.appendChild(condlement);

                            currentElement.appendChild(conditionElement);
                        });

                        fetch(urlForThreeDays)
                        .then(res => res.json())
                        .catch(err => {
                           forecastElement.textContent = 'Error';
                        })
                        .then(res => {
                            upcomingElement.innerHTML = '<div class="label">Three-day forecast</div>';
                            for (const element of Array.from(res['forecast'])) {
                                const spanUpcomingElement = document.createElement('span');
                                spanUpcomingElement.classList.add('upcoming');

                                const iconElement = document.createElement('span');
                                iconElement.classList.add('symbol');
                                const conditionInputInput = element['condition'].split(' ')[0];
                                iconElement.innerHTML = conditions[conditionInputInput];

                                const tempElement = document.createElement('span');
                                tempElement.classList.add('forecast-data');
                                tempElement.textContent = element['low'] + '°/' + element['high'] + '°';

                                const condlement = document.createElement('span');
                                condlement.classList.add('forecast-data');
                                condlement.textContent = element['condition'];

                                spanUpcomingElement.appendChild(iconElement);
                                spanUpcomingElement.appendChild(tempElement);
                                spanUpcomingElement.appendChild(condlement);

                                upcomingElement.appendChild(spanUpcomingElement);
                            }
                        });
                }
            });
    });
}

attachEvents();