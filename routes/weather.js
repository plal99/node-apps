require('dotenv').config();
const express = require("express");
const router = express.Router();
const axios = require('axios');
const PORT = process.env.PORT || 3000;
const apiKey = process.env.WEATHER_API_KEY;


router.get('/', (req, res) => {
  res.render('weather/index', { weather: null, error: null });
});


router.post('/', async (req, res) => {
    const city = req.body.city; // Default city if none provided
    if (!apiKey) {
        return res.render('weather/index', { weather: null, error: 'API key is missing' });
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await axios.get(url)
        const data = response.data;

        const weather = {
            city: data.name,
            country: data.sys.country,
            temperature: data.main.temp,
            description: data.weather[0].description,
            icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        }

        res.render('weather/index', { weather, error: null });
    } catch (error) {
        console.error(error);
        res.render('weather/index', { weather: null, error: 'Error fetching weather data' });
    }
});

module.exports = router;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });