import {serverUrl} from '../api.js';
import {get, set, remove} from "../ls-service";

const onLoginSubmit =   () =>  {
    
    const form = document.querySelectorAll(".login-container form input");
    let email = '';
    let pass = "";

    for (let i = 0; i < form.length; i++) {
        const item = form[i].attributes.getNamedItem('data-name').value;
        if (item === "email") { email = form[i].value; }
        if (item === 'pass') { pass = form[i].value; }
    }
    console.log('email=', email);
    console.log('pass=', pass);

    const myUrl = serverUrl("/application/login");
    fetch(myUrl, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, pass, mode: "dashboard" })
    })
        .then(res => res.json())
        .then(handleResponseData)
        .catch(error => console.error('Error:', error));

    function handleResponseData (res){
        console.log('res====', res);
        if (!res.status) {
            console.log("Failed to log in.")
        }
        const token = res.data.token;
        set('xxx-kon-dev-token', token);
        window.location.href = "/";
    }

}

export default {
    onLoginSubmit
}