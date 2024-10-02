// Import the express module 
const express = require('express');
// Call the router method from express to create the router 
const router = express.Router();

// import customer message
const Users = require('./users.routes');
// import amir form



router.use(Users)


// Export the router
module.exports = router; 