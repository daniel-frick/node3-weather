console.log('client side JS file loaded');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    const fetchURL = '/weather?address=' + location;
    messageOne.textContent = 'Loading...';
    messageOne.textContent = '';
    fetch(fetchURL).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageTwo.textContent = data.error;
        } else {
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
        }
    });
});
})
