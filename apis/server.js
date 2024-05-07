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
    user: 'admin',
    password: 'supersecretpassword',
    server: 'terraform-20240507114400697600000001.cex3uty77nu9.eu-west-1.rds.amazonaws.com', // This should be the name or IP address of your SQL Server instance
    port: 1433,
    database: 'SpiderSweeper',
    options: {
        encrypt: true,
        trustServerCertificate: true, // Set this to true for self-signed certificates
    },
};

// Create a connection pool with the specified configuration
// const pool = new sql.ConnectionPool(config);

// Define a route for the '/hello' endpoint
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
        // await request.query(query);
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
    } catch (err) {
        console.error('Error inserting data:', err);
        res.status(500).send({ message: 'Error inserting data.', error: err });
    } finally {
        sql.close();
    }
    // } catch (error) {
    //     console.log(error);
    //     return res.send({ message: error }).status(420);
    // }
    return res.send({ username: username }).status(200);
});

app.post('/highscores', async (req, res) => {
    console.log("POST Highscore game body: " + req.body);
    let oauthResponse = verifyToken(req.headers.authorization);
    if (!oauthResponse['success']) {
        return { message: 'ERROR: Invalid OAuth Token' }
    }
    try {
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
    console.log('GET HIGHSCORE');
    let oauthResponse = verifyToken(req.headers.authorization);
    if (!oauthResponse['success']) {
        return { message: 'ERROR: Invalid OAuth Token' }
    }
    try {
        try {
            let pool = await sql.connect(config);
            const request = new sql.Request();
            const query = `SELECT Score, tmstamp FROM HighScore h inner join users u on u.userID = h.userID WHERE u.username = @username`;
            let resp = await pool.request()
                .input('username', sql.VarChar, username)
                .query(query);

            const result = await request.query(query);
            console.log('HIighScores retrieved successfully.');
            res.status(200).json(result.recordset); // Send the retrieved data as JSON response
        } catch (err) {
            console.error('Error retrieving data:', err);
            res.status(500).send({ 'error': 'Error retrieving data.' });
            // throw err;
        } finally {
            sql.close();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({ 'error': error })
    }
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
        let cells =[]
        let row = 5;
        let col = 4;
        revealCell(board, row, col, cells);
        console.log('count', cells);
    } catch (error) {
        console.log(error);
        res.send(error).status(400);
        return
    }
    res.send({ message: 'simple' }).status(200)
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
        console.log(data);
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