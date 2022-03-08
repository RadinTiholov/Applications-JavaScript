const submitBtn = document.getElementById('submitBtnRegister');

submitBtn.addEventListener('click', registerIn);
import { showView } from './router.js';

function registerIn(e){
    const url = 'http://localhost:3030/users/register';
    const emailElement = document.getElementById('emailReg');
    const passwordElement = document.getElementById('passwordReg');
    const repeatPasswordElement = document.getElementById('repeatPassword');
    const email = emailElement.value;
    const password = passwordElement.value;
    const repeatPassword = repeatPasswordElement.value;
    if (email == '' || password == '' || repeatPassword == '' || repeatPassword != password) {
        alert("Cannot register with empty or wrong data");
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