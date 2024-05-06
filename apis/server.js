const cors = require('cors')
const express = require('express');
const app = express();
const port = 8080;
const sql = require('mssql');
// app.use(cors)
const client_id = "119f107716cbc4eb4191";
const client_secret = "8aeceab1d0035d9ba0746f5278f694bb45f47098";

app.use(express.json());

const connection = {
    user: 'admin',
    password: 'secret_password',
    server: 'web-levelup-db.cex3uty77nu9.eu-west-1.rds.amazonaws.com', // This should be the name or IP address of your SQL Server instance
    database: 'web-levelup-db',
};

// Define a route for the '/hello' endpoint
app.get('/hello', (req, res) => {
    console.log("Hello start");
    return res.send({ message: "Hello, server alive" }).status(200)
});

app.get('/callback', async (req, res) => {
    const access_code = req.query.code
    let access_token = ''
    let options = {
        hostname: 'github.com',
        path: '/login/oauth/access_token',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }, body: JSON.stringify({
            code: access_code, // Replace {port} with your actual port
        })
    };
    let tokenString = `https://github.com/login/oauth/access_token?code=${access_code}&client_id=${client_id}&client_secret=${client_secret}`;
    console.log("code: " + access_code);
    await fetch(tokenString, options).then(res => {
        console.log("start git")
        if (res.ok) {
            return res.json();
        }
        console.log("end git")
    }).then(data => {
        console.log("handle data");
        console.log(data);
        access_token = data.access_token
    });
    res.send({ token: access_token }).status(200);

})
app.get('/sign-in', async (req, res) => {
    let username = "";
    let options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${req.headers.authorization}` // Set the Content-Type header if needed
        }
    };
    await fetch("https://api.github.com/user", options).then(res => {
        console.log("start rec")
        if (res.ok) {
            return res.json();
        }
        console.log("end rec")
    }).then(data => {
        console.log("handle data");
        console.log(data.login, data.id, data.name);
        username = data.name;
    });
    res.send({ username: username }).status(200);
});

app.get('/manual', async (req, res) => {
    clickSignIn()
})

app.post('/highscores', async (req, res) => {
    console.log("game body: " + req.body);

    try {
        const email = req.body.email;
        const userID = req.body.userID;
        const score = req.body.highscore;
        const date = Date.now();

        try {
            await sql.connect(connection);

            const request = new sql.Request();
            const query = `INSERT INTO HighScore (userID, Score, Date) VALUES (@userID, @score, @date)`;

            request.input('userID', sql.Int, userID);
            request.input('score', sql.Int, score);
            request.input('date', sql.DateTime, date);
            await request.query(query);
            console.log('Data inserted successfully.');
            res.status(200).send('Data inserted successfully.');
        } catch (err) {
            console.error('Error inserting data:', err);
            res.status(500).send({ message: 'Error inserting data.', error: err });
        } finally {
            sql.close();
        }
    } catch (error) {
        console.log(error);
    }
});

app.get('/highscores', async (req, res) => {
    try {
        const { userID } = req.params;
        try {
            await sql.connect(connection);

            const request = new sql.Request();
            const query = `SELECT * FROM HighScore WHERE userID = @userID`;
            // Bind parameter to the query
            request.input('userID', sql.Int, userID);

            const result = await request.query(query);
            console.log('Data retrieved successfully.');
            res.status(200).json(result.recordset); // Send the retrieved data as JSON response
        } catch (err) {
            console.error('Error retrieving data:', err);
            res.status(500).send('Error retrieving data.');
            throw err;
        } finally {
            sql.close();
        }
    } catch (error) {
        console.log(error);
    }
});
// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});



const backend = 'http://localhost:' + '5050';
const redirect_uri = backend + '/apis/signin.html';
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
