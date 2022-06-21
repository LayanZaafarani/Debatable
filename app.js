// Load express.
const express = require('express');

// Create the app.
const app = express();

// Listen on the port
app.listen( 3001, ()=>{
    console.log("The app is listening on port 3001");
});

app.get('/', (req, res)=>{
    res.send("Hello world :)");
});