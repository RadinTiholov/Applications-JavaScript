window.onload=function(){
    const formElement = document.querySelector('form');

    formElement.addEventListener('submit', (e) => {
        let formData = new FormData(e.currentTarget);

        let email = formData.get('email');
        let password = formData.get('password');

        fetch('http://localhost:3030/users/login', {
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
                localStorage.setItem('username', user.username);
                window.location.href = 'index.html';
            }
        })
})

}

