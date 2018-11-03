const express = require('express');
const path = require('path');
const settingsController = require('./controllers/settingsController');

var app = express();
const port = 3000;

//set up temp engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('public'));

//controllers
settingsController(app);

app.listen(port, () => console.log(`Now listening on port ${port}`));
