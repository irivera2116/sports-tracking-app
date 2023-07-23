
const express = require('express');
const axios = require('axios');
const { rapidAPIKey } = require('../config/key');
const router = express.Router();

router.get('/', async (req, res) => {
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

    console.log(scoresData);

    res.render('scores', { scoresData });
  } catch (error) {
    console.error('Error fetching scores:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;