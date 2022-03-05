window.addEventListener('load', async () => {
    const email = localStorage.getItem('email');
    const loadButton = document.getElementById('loadBtn');
    const catchesElement = document.getElementById('catches');
    const templateElement = document.getElementById('catches').children[0];
    const createButton = document.getElementById('addBtn');
    catchesElement.innerHTML = '';

    const userNavBar = document.getElementById('user');
    const guestNavBar = document.getElementById('guest');
    const logOutButton = document.getElementById('logoutBtn');
    const welcomeText = document.getElementById('welcomeText');
    console.log(logOutButton);

    logOutButton.addEventListener('click', logOutFunc);
    loadButton.addEventListener('click', loadAllCatches);
    createButton.addEventListener('click', createCatch);

    loadAllCatches();

    if (email) {
        userNavBar.style.display = 'inline';
        guestNavBar.style.display = 'none';
        welcomeText.style.display = 'block';
        const userWelcome = document.getElementById('userWelcome');
        userWelcome.textContent = localStorage.getItem('email');
        createButton.disabled = false;
    }
    else{
        guestNavBar.style.display = 'inline';
        userNavBar.style.display = 'none';
        welcomeText.style.display = 'none';
        createButton.disabled = true;
    }
    //TODO
    function createCatch(e){
        e.preventDefault();

        const anglerInput = document.getElementsByName('angler')[0];
        const weightInput = document.getElementsByName('weight')[0];
        const speciesInput = document.getElementsByName('species')[0];
        const locationInput = document.getElementsByName('location')[0];
        const baitInput = document.getElementsByName('bait')[0];
        const captureTimeInput = document.getElementsByName('captureTime')[0];

        const angler = anglerInput.value;
        const weight = weightInput.value;
        const species = speciesInput.value;
        const location = locationInput.value;
        const bait = baitInput.value;
        const captureTime = captureTimeInput.value;
        if (angler == '' || weight == '' || species == '' || location == '' || bait == '' || captureTime == '') {
            alert('Cannot add empty data.');
        }
        else{
            let accessToken = localStorage.getItem('accessToken');
            fetch('http://localhost:3030/data/catches', {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              'X-Authorization': accessToken
            },
            body: JSON.stringify({
                angler,
                weight,
                species,
                location,
                bait,
                captureTime
            })
        })
        .then(data => data.json())
        .catch(err => {alert(err)})
        .then(user => {
            window.location.href = 'index.html';
            loadAllCatches();
        })
            anglerInput.value = '';
            weightInput.value = '';
            speciesInput.value = '';
            locationInput.value = '';
            baitInput.value = '';
            captureTimeInput.value = '';
        }
    }
    function loadAllCatches(e){
        catchesElement.innerHTML = '';
        const urlForLoad = 'http://localhost:3030/data/catches';

        fetch(urlForLoad)
        .then(res => res.json())
        .catch(err => alert(err))
        .then(res => {
            res = Object.values(res);
            for (const item of res) {
                //TODO disable buttons if you are a guest
                const template = templateElement.cloneNode(true);
                template.children[1].value = item['angler'];
                template.children[3].value = item['weight'];
                template.children[5].value = item['species'];
                template.children[7].value = item['location'];
                template.children[9].value = item['bait'];
                template.children[11].value = item['captureTime'];
                template.children[12].setAttribute('data-id', item['_id']);
                template.children[13].setAttribute('data-id', item['_id']);
                catchesElement.appendChild(template);
                template.children[12].addEventListener('click', updateCatch);
                template.children[13].addEventListener('click', deleteCatch);
                const id = localStorage.getItem('_id');
                if (id) {
                    console.log('loged');
                    if (id === item['_ownerId']) {
                        template.children[12].disabled = false;
                        template.children[13].disabled = false;
                    }
                    else{
                        template.children[12].disabled = true;
                        template.children[13].disabled = true;
                    }
                }
                else{
                    console.log('not loged');
                    template.children[12].disabled = true;
                    template.children[13].disabled = true;
                }
                // const id = localStorage.getItem('_id');
                // if (id) {
                //     template.children[12].disabled = false;
                //     template.children[13].disabled = false;
                // }
                // else{
                //     emplate.children[12].disabled = true;
                //     template.children[13].disabled = true;
                // }
            }
        })
        function deleteCatch(e){
            e.preventDefault();

            let currElement = e.target.parentNode;
            let currId = e.target.getAttribute('data-id');
            let accessToken = localStorage.getItem('accessToken');
            console.log(accessToken);

            fetch(`http://localhost:3030/data/catches/${currId}`, {
                method: 'DELETE',
                headers: {
                    'X-Authorization': accessToken
                }
            })
            .catch(err => alert(err))
            .then(res => {
                if (res.status == 200) {
                    currElement.remove();
                }
                else{
                    alert("Cannot remove or edit other's blogs")
                }
            });
        }
        function updateCatch(e){
            e.preventDefault();

            console.log('updateCatch');
            let anglerInput = e.target.parentNode.querySelector('.angler');
            let weightInput = e.target.parentNode.querySelector('.weight');
            let speciesInput = e.target.parentNode.querySelector('.species');
            let locationInput = e.target.parentNode.querySelector('.location');
            let baitInput = e.target.parentNode.querySelector('.bait');
            let captureTimeInput = e.target.parentNode.querySelector('.captureTime');
            if (!(anglerInput.value &&
                    weightInput.value &&
                    speciesInput.value &&
                    locationInput.value &&
                    baitInput.value &&
                    captureTimeInput.value)) {
                alert('All fields must be filled!');
                return;
            }
            const angler = document.getElementsByName('angler')[0];
            const weight = document.getElementsByName('weight')[0];
            const species = document.getElementsByName('species')[0];
            const location = document.getElementsByName('location')[0];
            const bait = document.getElementsByName('bait')[0];
            const captureTime = document.getElementsByName('captureTime')[0];
            if (!(angler.value &&
                weight.value &&
                species.value &&
                location.value &&
                bait.value &&
                captureTime.value)) {
                    alert('All fields must be filled!');
                    return;
                }
            
            let currId = e.target.getAttribute('data-id');
            let accessToken = localStorage.getItem('accessToken');
    
            fetch(`http://localhost:3030/data/catches/${currId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Authorization': accessToken
                    },
                    body: JSON.stringify({
                        angler: angler.value,
                        weight: weight.value,
                        species: species.value,
                        location: location.value,
                        bait: bait.value,
                        captureTime: captureTime.value
                    })
                })
                .catch(err => {
                    alert(err);
                })
                .then(res => {
                    angler.value = '';
                    weight.value = '';
                    species.value = '';
                    location.value = '';
                    bait.value = '';
                    captureTime.value = '';
                    if (res.status !== 200) {
                        alert("Cannot remove or edit other's blogs")
                    }
                    loadAllCatches();
                    
                });
        }
    }
    function logOutFunc(e){
        e.preventDefault();
        fetch('http://localhost:3030/users/logout')
        .then(x => x.json)
        .catch(res => alert(res))
        .then(x => {
            localStorage.clear();
            window.location.href = 'index.html';
        })
    }
});

