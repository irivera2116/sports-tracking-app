const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');
const StoreSequelize = require('connect-session-sequelize')(session.Store);
const scoresRouter = require('./controllers/api/scores');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const axios = require('axios');
const { rapidAPIKey } = require('./config/key')
const PORT = process.env.PORT || 3001;
const routes = require('./controllers');
app.use(routes);


app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'layouts'}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.engine('handlebars', exphbs());
//app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/scores', scoresRouter);

app.get('/', async (req, res) => {
  try {
    const options = {
      method: 'GET',
      url: 'https://allscores.p.rapidapi.com/api/allscores/games-scores',
      params: {
        startDate: '18/01/20223',
        langId: '1',
        sport: '1',
        endDate: '18/01/20223',
        timezone: 'America/Chicago',
        onlyMajorGames: 'true',
        withTop: 'true'
      },
      headers: {
        'X-RapidAPI-Key': rapidAPIKey,
        'X-RapidAPI-Host': 'allscores.p.rapidapi.com'
      }
    };

    const response = await axios.request(options);
    const scoresData = response.data;

    console.log(scoresData); // logs the data

    res.render('homepage', { scoresData: scoresData || [] }); // Pass empty array if scoresData is undefined
  } catch (error) {
    console.error('Error fetching scores:', error);
    res.status(500).send('Internal Server Error');
  }
});

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
