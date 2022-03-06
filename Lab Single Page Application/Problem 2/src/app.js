const homeSection = document.getElementsByClassName('home')[0];
homeSection.style.display = 'block';
const guestNavigationElement = document.querySelector('#guest');
const userNavigationElement = document.querySelector('#user');
guestNavigationElement.style.display = 'inline';

const navigationElement = document.querySelector('.navigation');
navigationElement.addEventListener('click', (e) => {
    if (e.target.tagName == 'A') {
        let url = new URL(e.target.href);

        console.log(url.pathname);
    }
})