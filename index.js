require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Mount routes
app.use('/todo', require('./routes/todo'));
app.use('/url-shortener', require('./routes/url-shortener'));
app.use('/weather', require('./routes/weather'));
app.use('/notes', require('./routes/notes'));
app.use('/expense', require('./routes/expense'));

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});