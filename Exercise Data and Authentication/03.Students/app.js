window.onload=function(){
    const url = 'http://localhost:3030/jsonstore/collections/students';
    const submitButton = document.getElementById('submit');
    const resultsElement = document.getElementById('results');
    const tBodyElement = resultsElement.children[1];
    submitButton.addEventListener('click', buttonPress);
    loadData();

    function buttonPress(){

        const firstNameElement = document.getElementsByName('firstName')[0];
        const lastNameElement = document.getElementsByName('lastName')[0];
        const facultyNumberElement = document.getElementsByName('facultyNumber')[0];
        const gradeElement = document.getElementsByName('grade')[0];
    
        if (firstNameElement.value === '' 
                || lastNameElement.value === '' 
                || facultyNumberElement.value === '' 
                || gradeElement.value === '') {
            alert('Error: Empty data')
        }
        else{
            fetch(url, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    firstName: firstNameElement.value,
                    lastName: lastNameElement.value,
                    facultyNumber: facultyNumberElement.value,
                    grade: gradeElement.value
                })
            })
            firstNameElement.value = '';
            lastNameElement.value = '';
            facultyNumberElement.value = '';
            gradeElement.value = '';
    
            loadData();
        }
    }

    function loadData(){
        fetch(url)
        .then(res => res.json())
        .catch(err => alert(err))
        .then(res => {
            res = Object.values(res);
            console.log(res);
            for (const item of res) {
                const trElement = document.createElement('tr');

                const fnthElement = trElement.insertCell(0);
                fnthElement.innerText = item.firstName;

                const lnthElement = trElement.insertCell(1);
                lnthElement.innerText = item.lastName;

                const nthElement = trElement.insertCell(2);
                nthElement.innerText = item.facultyNumber;

                const grthElement = trElement.insertCell(3);
                grthElement.innerText = item.grade;
                
                tBodyElement.appendChild(trElement)
            }
        })
    }
}