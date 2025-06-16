require('dotenv').config();
const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const { nanoid } = require('nanoid');
const Url = require('../db/url-shortener-db');


router.get('/', async(req, res) => {
    const urls = await Url.find();
    const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
    res.render('url-shortener/index', { urls, today, request: req });
});

router.post('/shorten', async(req, res) => {
    const longUrl = req.body.longUrl;
    const shortId = nanoid(7);

    await Url.create({ shortId, longUrl });
    res.redirect('/url-shortener');
});

router.get('/:shortId', async(req, res) => {
    const url = await Url.findOne({ shortId: req.params.shortId });
    if (url) {
        res.redirect(url.longUrl);
    } else {
        res.status(404).send('URL not found');
    }
});

router.post('/delete/:id', async (req, res) => {
  try {
    console.log(req.params);
    await Url.findByIdAndDelete(req.params.id);
    console.log(`Deleted URL with ID: ${req.params.id}`);
    res.redirect('/url-shortener');
  } catch (err) {
    console.error('Error deleting URL:', err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;

// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));