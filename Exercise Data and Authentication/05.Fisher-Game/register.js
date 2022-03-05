window.onload=function(){
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const registerButton = document.getElementById('registerButton');
    const rePassElement = document.getElementById('rePass');

    registerButton.addEventListener('click', registerFunc);

    function registerFunc(e){
        const email = emailInput.value;
        const password = passwordInput.value;
        const rePass = rePassElement.value;
        const url = 'http://localhost:3030/users/register';

        if (email === '' || password === '' || rePass === '' ) {
            alert('Cannot add empty data');
        }
        else if(rePass != password){
            alert('The two passwords don\'t match');
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
            console.log(user);
            if (user.hasOwnProperty('message')) {
                alert(user.message);
            }else{
                localStorage.setItem('accessToken', user.accessToken);
                localStorage.setItem('_id', user._id);
                localStorage.setItem('email', user.email);
                const username = email.split('@')[0];
                console.log(username);
                localStorage.setItem('username',username);
                window.location.href = 'index.html';
                }
            })
            emailInput.value = '';
            passwordInput.value = '';
            rePassElement.value = '';
        }
    }
}