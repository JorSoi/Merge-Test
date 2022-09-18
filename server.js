const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.port || 4000;
const database = require('./chatData.json');


//Middleware functions
app.use(cors());
app.use(express.json())




app.post('/messages', (req, res, next) => {
    if(req.body.message) {
        database.push(req.body);
        res.send(database);
    } else {
        res.status(400).send('No message was sent.')
    }
    
})

app.get('/', (req, res, next) => {
    res.send(database);
})





















app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`)
})

