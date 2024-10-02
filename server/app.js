// Import the express module 
const express = require('express');
// Import the dotenv module and call the config method to load the environment variables
require('dotenv').config();
// Import the sanitizer module (ensure this is a valid middleware)
//const sanitize = require('sanitize'); // Example sanitizer
// Import the CORS module 
const cors = require('cors');
// Import the database module
const db = require('./config/db.config'); // Adjust the path if necessary
const router= require('./routes')

// Set up the CORS options to allow requests from our front-end only
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200
};

// Create a variable to hold our port number 
const port = process.env.PORT || 4000; // Default to 3000 if PORT is not set

// Create the webserver 
const app = express();


// Add the CORS middleware
app.use(cors(corsOptions));

// Add the express.json middleware to the application
app.use(express.json());

// Add the sanitizer to the express middleware 
//app.use(sanitize);
  app.use(router);

db.checkConnection().then(() => {
  console.log('Database connected successfully.');
}).catch((error) => {
  console.error('Failed to connect to database:', error.message);
});
app.get('/', (req, res) => {
  res.send('Hello World! The server is working well');
});


// Define a route to fetch members (example)

// Start the webserver
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

module.exports = app;