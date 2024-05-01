const express = require('express');
const app = express();
const port = 8080;
const sql = require('mssql');

const connection = {
    user: 'your_username',
    password: 'enjoyBBDJK$2826',
    server: 'your_server_name', // This should be the name or IP address of your SQL Server instance
    database: 'your_database_name',

};

// Define a route for the '/hello' endpoint
app.get('/hello', (req, res) => {
    console.log("Hello start");
    return res.send({ message: "Hello, server alive" }).status(200)
});


app.get('/sign-in', (req, res) => {
    let username = "";

    res.send({ username: username }).status(200);
});

app.use(express.json());

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
