window.onload=function(){
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginButton = document.getElementById('loginBtn');

    loginButton.addEventListener('click', loginFunc);

    function loginFunc(e){
        const email = emailInput.value;
        const password = passwordInput.value;
        const url = 'http://localhost:3030/users/login';

        if (email === '' || password === '') {
            alert('Cannot add empty data');
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
                localStorage.setItem('username', user.username);
                window.location.href = 'index.html';
                }
            })
            emailInput.value = '';
            passwordInput.value = '';
        }
    }
}