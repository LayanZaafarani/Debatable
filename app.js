// Load express.
const express = require('express');
const bodyParser = require('body-parser');

// Create the app.
const app = express();

// parse json
app.use(bodyParser.json());

// Listen on the port
app.listen( 3001, ()=>{
    console.log("The app is listening on port 3001");
});

// add routes
app.use('/debates', require('./routers/debateRoutes'));
app.use('/debates/endorsements', require('./routers/endorsementRoutes'));