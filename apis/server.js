const cors = require('cors')
const express = require('express');
const app = express();
const port = 8080;
const sql = require('mssql');
const numRows = 8;
const numCols = 8;
let numMines = 10;
const toWin = numRows * numCols - 10;

let boards = [];
app.use(express.json());
app.use(cors())

var corsOptions = {
    origin: '*',
}

const config = {
    user: process.env.db_username,
    password: process.env.db_password,
    server: process.env.db_instance_name,
    port: 1433,
    database: 'SpiderSweeper',
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
};


app.get('/hello', cors(corsOptions), (req, res) => {
    console.log("Hello start");
    res.setHeader('Access-Control-Allow-Origin', '*')
    return res.send({ message: "Hello, server alive" }).status(200)
});

app.get('/sql', async (req, res) => {
    try {
        let pool = await sql.connect(config);
        let resp = await pool.request()
            .input('username', sql.VarChar, 'test')
            .query(`select * from users where username=@username`);
        console.log('Data inserted successfully.');
        res.send({ 'message': 'SUCCEESS' }).status(200)
    } catch (error) {
        console.log(error);
        res.send({ 'error': error }).status(500)
    } finally {
        sql.close();
    }
    return
})

//
app.get('/sign-in', async (req, res) => {
    console.log('SIGN IN API');
    let oauthResponse = await verifyToken(req.headers.authorization);
    if (!oauthResponse['success']) {
        return { message: 'ERROR: Invalid OAuth Token' }
    }
    let username = oauthResponse['name'];
    let board = initializeBoard();
    console.log('finished initialise board');
    console.log('init board dimension ', board.length, board[0].length);
    boards[`${username}`] = board
    // try {
    try {
        let pool = await sql.connect(config);
        const query =
            `IF NOT EXISTS (select * from users where username = '${username}')
                BEGIN
                    insert into Users(username) values ('${username}')
                END;`;
        let resp = await pool.request().query(query)
        pool.close();
        console.log('Data inserted successfully.');
        res.send({ message: 'signed in' }).status(200);
    } catch (err) {
        console.error('Error inserting data:', err);
        res.status(500).send({ message: 'Error inserting data.', error: err });
    } finally {
        sql.close();
    }

    return
});

app.post('/highscores', async (req, res) => {
    let oauthResponse = await verifyToken(req.headers.authorization);
    console.log(req.body['highscore']);
    if (!oauthResponse['success']) {
        return { message: 'ERROR: Invalid OAuth Token' }
    }
    let username = oauthResponse['name'];
    try {
        const score = req.body['highscore'];
        const date = Date.now();

        try {
            let pool = await sql.connect(config);
            let userID = await pool.request()
                .query(`select userID from users where username = ${username}`)
            const query = `INSERT INTO HighScore (userID, Score, Date) VALUES (@userID, @score, @date)`;
            let resp = await pool.request()
                .input('userID', sql.Int, userID)
                .input('score', sql.Int, score)
                .input('date', sql.DateTime, date)
                .query(query)

            console.log('Data inserted successfully.');
            res.status(200).send({ message: 'Data inserted successfully.' });
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
    console.log('GET HIGHSCORE');
    let oauthResponse = await verifyToken(req.headers.authorization);
    if (!oauthResponse['success']) {
        return { message: 'ERROR: Invalid OAuth Token' }
    }
    try {
        let username = oauthResponse['name'];
        console.log('await sql connection');
        let pool = await sql.connect(config);
        console.log('past connect');
        const query = `SELECT Score, tmstamp FROM HighScore h inner join users u on u.userID = h.userID WHERE u.username = @username`;
        let resp = await pool.request()
            .input('username', sql.VarChar, username)
            .query(query);

        console.log('HIighScores retrieved successfully.');
        res.status(200).send({ scores: resp.recordset, message: 'success' }); // Send the retrieved data as JSON response
    } catch (err) {
        console.error('Error retrieving data:', err);
        res.status(500).send({ 'error': 'Error retrieving data.' });
        // throw err;
    } finally {
        sql.close();
    }
    return
});
app.get('/new-game', async (req, res) => {
    let oauthResponse = await verifyToken(req.headers.authorization);
    if (!oauthResponse['success']) {
        return { message: 'ERROR: Invalid OAuth Token' }
    }
    try {
        let username = oauthResponse['name'];
        boards[username] = initializeBoard();
        console.log('reset game'); 
        res.status(200).send({ message: 'success' }); // Send the retrieved data as JSON response
    } catch (err) {
        console.error('Error retrieving data:', err);
        res.status(500).send({ 'error': 'Error retrieving data.' });
        // throw err;
    } finally {
        sql.close();
    }
    return
});

app.get('/game', async (req, res) => {
    let oauthResponse = await verifyToken(req.headers.authorization);
    if (!await oauthResponse['success']) {
        res.status(403).send({ message: 'ERROR: Invalid OAuth Token' });
        return;
    }
    let username = oauthResponse['name'];
    let board = boards[username];
    console.log(boards);
    console.log('LENGTH ', boards.length, username);
    try {
        if (board != undefined)
            console.log('THE BOARD IS NOT EMPTY ', board[0][0]);
        let cells = []
        let row = 5;
        let col = 4;
        revealCell(board, row, col, cells);
        console.log('count', cells);
        res.send({ message: 'success', cells: cells }).status(200);
        return
    } catch (error) {
        console.log(error);
        res.send({ error: error }).status(400);
        return
    }
})

async function verifyToken(accessToken) {
    let data = await fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
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
        if (data['error']) {
            console.log('ERROR: ' + data['error']['message']);
            return { success: false, message: data['error']['message'] };
        } else {
            console.log('DATA HARVEST');
            return { success: true, name: data['name'] }
        }
    })
    console.log(data);
    console.log('emnd');
    return data;
}

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});





function initializeBoard() {
    let board = []
    console.log('start init');
    for (let i = 0; i < numRows; i++) {
        board[i] = [];
        for (let j = 0; j < numCols; j++) {
            board[i][j] = {
                isMine: false,
                revealed: false,
                count: 0,
            };
        }
    }

    while (numMines > 0) {
        const row = Math.floor(Math.random() * numRows);
        const col = Math.floor(Math.random() * numCols);
        if (!board[row][col].isMine) {
            board[row][col].isMine = true;
            numMines--;
        }
    }
    console.log('finish random');
    // Calculate counts
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            if (!board[i][j].isMine) {
                let count = 0;
                for (let dx = -1; dx <= 1; dx++) {
                    for (let dy = -1; dy <= 1; dy++) {
                        const ni = i + dx;
                        const nj = j + dy;
                        if (checkBounds(ni, nj) && board[ni][nj].isMine) {
                            count++;
                        }
                    }
                }
                board[i][j].count = count;
            }
        }
    }
    console.log('finish init');
    board[0][0]['cells'] = toWin;
    console.log(board[0][0]);
    return board;
}
function checkBounds(i, j) {
    return i >= 0 && i < numRows && j >= 0 && j < numCols
}

function revealCell(board, row, col, cells) {
    if (!checkBounds(row, col) || board[row][col].revealed) {
        return;
    }
    console.log('revealcell', board[row][col]);
    board[row][col].revealed = true;
    board[0][0]['cells']--;
    let position = `${row},${col}`
    cells[position] = board[row][col];
    console.log(cells.length);
    if (board[row][col].isMine) {
        // Handle game over
        console.log('BOMB');
        return ("Game Over! You stepped on a mine.");
    } else if (board[0][0]['cells'] <= 0) {
        console.log('WIN');
        return ("CONGRATS! YOU WON!");
    } else if (board[row][col].count === 0) {
        // If cell has no mines nearby,
        // Reveal adjacent cells
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                revealCell(board, row + dx, col + dy, cells);
            }
        }
    }
}