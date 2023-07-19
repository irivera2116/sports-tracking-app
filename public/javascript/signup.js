const el_username = document.querySelector('#username');
const el_firstname = document.querySelector('#firstname');
const el_lastname = document.querySelector('#lastname');
const el_password = document.querySelector('#password');
const el_password2 = document.querySelector('#passwordConfirm');
const el_error1 = document.querySelector('#error1');
const el_error1b = document.querySelector('#error1b');
const el_error1c = document.querySelector('#error1c');
const el_error3 = document.querySelector('#error3');
const el_error4 = document.querySelector('#error4');
const el_error5 = document.querySelector('#error5');
const el_noerror1 = document.querySelector('#noerror1');

function fetchJSON( url, method='get', data={} ){
    // post requires header, method + data to be sent
    const postUser = {
        headers: { 'Content-Type': 'application/json' },
        method,
    }
    if (method === 'post'){
        postUser.body = JSON.stringify (data)
    }
    return fetch( url, postUser ).then( res=>res.json() )
}

// onblur function on username input box...
async function checkUsername(){
    if (el_username.value.includes(" ")){
        el_error1c.classList.remove('d-none');
        el_error1.classList.add('d-none');
        el_error1b.classList.add('d-none');
        el_noerror1.classList.add('d-none');
        return;
    } else {
        el_error1c.classList.add('d-none');
    }
    if (el_username.value === ''){
        el_error1b.classList.remove('d-none');
        el_noerror1.classList.add('d-none');
        el_error1.classList.add('d-none');
        return;
    }
    const checkUser = await fetchJSON (`/api/usercheck/${el_username.value.trim()}`);
    console.log('the response code: ', checkUser.code);

    if (checkUser.code === 202){
        console.log(checkUser.message);
        el_error1b.classList.add('d-none');
        el_error1.classList.add('d-none');
        el_noerror1.classList.remove('d-none')
    } else {
        console.log(checkUser.message);
        el_noerror1.classList.add('d-none')
        el_error1b.classList.add('d-none');
        el_error1.classList.remove('d-none');
    }
}

//When user clicks "continue" button...
async function checkUser(event){
    event.preventDefault();
    el_error1b.classList.add('d-none');
    el_error3.classList.add('d-none');
    el_error4.classList.add('d-none');
    el_error5.classList.add('d-none');

    if (el_username.value === ''){
        el_error1b.classList.remove('d-none');
        el_noerror1.classList.add('d-none');
    }
    if (el_firstname.value === ''){
        el_error4.classList.remove('d-none');
    }
    if (el_lastname.value === ''){
        el_error5.classList.remove('d-none');
    }
    if (el_password.value !== el_password2.value){
        el_error3.classList.remove('d-none');
    }
    if (el_password.value === ''){
        el_error3.classList.remove('d-none');
    }
    if ( !(el_error1.classList.contains('d-none')) || !(el_error1b.classList.contains('d-none')) || !(el_error1c.classList.contains('d-none')) || !(el_error3.classList.contains('d-none')) || !(el_error4.classList.contains('d-none')) || !(el_error5.classList.contains('d-none')) ){
        return;
    }
    document.querySelector("#continue").setAttribute("data-bs-target", "#staticBackdrop");
    document.querySelector("#continue").removeAttribute("onClick");
   
    document.querySelector('#continue').click();
}

//when clicking the register button...
async function register(event) {
    event.preventDefault();
    let newUser = {
        username: el_username.value.trim(),
        firstname: el_firstname.value.trim(),
        lastname: el_lastname.value.trim(),
        password: el_password.value,
        
    };
    const response = await fetchJSON( '/api/register', 'post', newUser )
    if( response.message ) {
        alert( response.message )
    }
    window.location.replace( '/' );
}