const express = require('express');
const app = express();
const port = 8080;

// Define a route for the '/hello' endpoint
app.get('/hello', (req, res) => {
    console.log("Hello start");
    return res.send({message: "Hello, server alive"}).status(200)
});

app.get('/sign', (req, res) => {
    res.send('response').status(200)
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
