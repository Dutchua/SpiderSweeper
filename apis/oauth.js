
// const cors = require('cors')
const port = 5050;
// app.listen(port, () => {
//     console.log(`Server listening at http://localhost:${port}`);
// });
// window.location.replace("http://www.w3schools.com");
let access_code = ''
async function grabCode() {
}
// console.log("https://github.com/login/oauth/authorize?client_id=" + client_id);

async function clickSignIn() {
    console.log('start second');
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=user&redirect_uri=${redirect_uri}`;
    const device_flow = `https://github.com/login/device/code?client_id=${client_id}&scope=user`
    let options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:5500',
            'Access-Control-Request-Method': 'POST',
            'Access-Control-Request-Headers': 'origin, x-requested-with, accept',
            'Origin': 'http://127.0.0.1:5500'

        },
        credentials: 'same-origin',
    };
    let post_options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': 'http://127.0.0.1:5500',
            'Access-Control-Request-Method': 'POST',
            'Access-Control-Request-Headers': 'origin, x-requested-with, accept',
            'Origin': 'http://127.0.0.1:5500'

        },
        credentials: 'same-origin',
    };
    await fetch(device_flow, post_options).then(res => {
        console.log("start click")
        console.log(res);
        if (res.ok) {
            return res.json();
        } else {
            console.log(res.body);
            console.log(res.data);
            console.log(res.query);
            return res.json();
        }
        console.log("end click")
    }).then(data => {
        console.log("handle click data");
        console.log(data);
    });
    console.log("how " + device_flow);
}

document.getElementById("loginButton").addEventListener("click", clickSignIn);

// clickSignIn();
// grabCode();