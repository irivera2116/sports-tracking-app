
const express = require('express');
const app = express();

/*
// Define your routes here
router.get('/', (req, res) => {
  res.send('Hello, World!');
});

module.exports = router;
*/

const fs = require('fs');
const login = require('../models/login_info');
const user = require('../models/user');
const messages = require('../models/messages');
const rooms = require('../models/rooms');

function routes(app, onlineUsers) {
   
// Define a POST route
app.post('/example', (req, res) => {
    // Your route handling logic here
    res.send('This is a POST request');
  });
  
  // Start the server
  app.listen(3001, () => {
    console.log('Server started on port 3001');
  });
}

module.exports = routes;