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

// Routes

// debate route
app.use('/debates', require('./routers/debateRoutes'));

// endorsement route
app.use('/debates/debate', require('./routers/endorsementRoutes'));