const express = require('express');
// const path = require('path');
const app = express();

// Set the port of the application
// process.env.PORT lets the port be set by Heroku
const PORT = process.env.PORT || 8080;

// Use the express.static middleware to serve static content for the app from the 'public' directory in the application directory.
app.use(express.static('public'));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// will need to require some things

// Import routes and give the server access to them
const routes = require('./controllers/burgers_controller');

app.use(routes);

// Start our server so that it can begin listening to client requests
app.listen(PORT, () => {
   // Log (server-side) when our server has started
   console.log(`Server listening on http://localhost:${PORT}`);
});