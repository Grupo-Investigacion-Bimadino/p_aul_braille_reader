const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

//middlewares
app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());


// Setting
const PORT = process.env.PORT || 3000;
const BRAILLE = require('./braille');

//Routes
app.use('/BRAILLE', BRAILLE);

//Server online
app.listen(PORT, () => {
     console.log(`running on ${PORT}`);
 });