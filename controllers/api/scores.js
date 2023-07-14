// api/scores.js
const express = require('express');
const axios = require('axios');
const { rapidAPIKey } = require('../../config/key');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
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
    console.log(response.data);

    // Send the response data back to the client
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching scores:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
