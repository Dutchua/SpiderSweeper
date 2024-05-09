const server = 'http://localhost:8080'


let username = '';
let accessToken = '';

function oauthSignIn() {
    var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

    var form = document.createElement('form');
    form.setAttribute('method', 'GET');
    form.setAttribute('action', oauth2Endpoint);

    var params = {
        'client_id': '389577083888-tuvvlhaf0ka80p9tqrs8vmrfp106e2nq.apps.googleusercontent.com',
        'redirect_uri': 'http://localhost:5500/signin.html',
        'response_type': 'token',
        'scope': 'https://www.googleapis.com/auth/userinfo.profile',
        'include_granted_scopes': 'true',
        'state': 'pass-through value'
    };

    for (var p in params) {
        var input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', p);
        input.setAttribute('value', params[p]);
        form.appendChild(input);
    }

    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();
    handleRedirect
}


async function handleRedirect() {
    var urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams);
    let hash = location.hash.substring(1);
    let fragmentParams = new URLSearchParams(hash);
    accessToken = fragmentParams.get('access_token');
    let email;

    // Fetch user info using the access token
    await fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + accessToken)
        .then(response => response.json())
        .then(data => {
            email = data.email;
            console.log(data);
            username = data['name']
        })
        .catch(error => {
            console.error('Error:', error);
        });
    console.log("User: " + username);

    // POPULATES DB AND RETURNS USERNAME
    let s = `${server}/sign-in`
    console.log(s);
    try {
        let user = await fetch('http://localhost:8080/sign-in', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken,
                'Access-Control-Allow-Origin': '*',
            } // Convert the data object to JSON
        }).then(response => {
            console.log('Sent req');
            if (!response.ok) {
                throw new Error(response['message']);
            }
            return response.json();
        }).catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    } catch (error) {
        console.log('cant connect ',error);
    }
}

async function query() {
    return await fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
            // Add any additional headers if needed
        }
    }).then(response => {
        if (response.ok) {
            console.log('Success!');
        }
        return response.json();
    }).then(data => {
        console.log(data);
        if (data['error']) {
            console.log('ERROR: ' + data['error']['message']);
            return false;
        } else {
            return { success: true, name: data['name'] }
        }
    })
}
document.getElementById("loginButton").addEventListener("click", oauthSignIn);
document.getElementById("grabButton").addEventListener("click", handleRedirect);
document.getElementById("queryButton").addEventListener("click", query);


