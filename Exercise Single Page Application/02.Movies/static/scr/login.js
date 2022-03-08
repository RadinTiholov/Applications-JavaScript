const submitBtn = document.getElementById('submitBtnLogin');

submitBtn.addEventListener('click', logIn);
import { showView } from './router.js';

function logIn(e){
    const url = 'http://localhost:3030/users/login';
    const emailElement = document.getElementById('email');
    const passwordElement = document.getElementById('password');
    const email = emailElement.value;
    const password = passwordElement.value;
    if (email == '' || password == '') {
        alert("Cannot log in with empty data");
    }
    else{
        fetch(url, {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        .then(data => data.json())
        .catch(err => {alert('Error')})
        .then(user => {
            if (user.hasOwnProperty('message')) {
                alert(user.message);
            }else{
                localStorage.setItem('accessToken', user.accessToken);
                localStorage.setItem('_id', user._id);
                localStorage.setItem('email', user.email);
                localStorage.setItem('username', user.username);
                showView('/');
                }
            })
    }
}