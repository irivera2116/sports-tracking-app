const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;
// socketIO implementation
const http = require('http').Server(app);
const io = require('socket.io')(http);
// server-side array for keeping track of users in a room
let userList = [];

// Configure Handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

// connecting to routing file
require('./routes/apiRoute.js')(app, userList);

// connecting to socketIO routing
io.on('connection', (socket) => require('./routes/socketRoute.js')(io, socket, userList));

// start server
http.listen(PORT, () => {
    console.log('listening on port', PORT);
});