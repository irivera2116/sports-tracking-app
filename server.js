const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');
const StoreSequelize = require('connect-session-sequelize')(session.Store);

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 3001;

const routes = require('./controllers');
app.use('/', routes);
/*const myMiddleware = (req, res, next) => {
  console.log('This is a middleware function.');
  next();
};*/
//app.use(myMiddleware);

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'layouts'}));
app.set('view engine', 'handlebars');

app.engine('handlebars', exphbs());
//app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Create a session store and use it
const sessionStore = new StoreSequelize({ db: sequelize });
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  })
);

io.on('connection', (socket)  => require('./routes/socketRoute.js')(io, socket, userList));



sequelize.sync({ force: false }).then(() => {
  http.listen(PORT, () => console.log('Now listening'+PORT ));
});
