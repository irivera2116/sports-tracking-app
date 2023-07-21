const router = require('express').Router();
const axios = require('axios');
const { rapidAPIKey } = require('../config/key');

router.get('/', async (req, res) => {
  try {
    // Make an API request to fetch scores data
    const options = {
      method: 'GET',
      url: 'https://allscores.p.rapidapi.com/api/allscores/search',
      params: {
        filter: 'all',
        timezone: 'America/Chicago',
        langId: '1',
        query: 'Benfica'
      },
      headers: {
        'X-RapidAPI-Key': rapidAPIKey,
        'X-RapidAPI-Host': 'allscores.p.rapidapi.com'
      }
    };

    const response = await axios.request(options);
    const scoresData = response.data;

    // Render the homepage view with the scoresData
    res.render('homepage', { scoresData });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session && req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session && req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;

