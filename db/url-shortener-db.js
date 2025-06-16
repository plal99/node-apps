const mongoose = require('mongoose');

const urlConnection = mongoose.createConnection(process.env.MONGO_URI_URL_SHORTENER, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

urlConnection.on('connected', () => {
  console.log('URL SHORTENER DB connected successfully');
});

urlConnection.on('error', (err) => {
  console.error('URL SHORTENER DB connection error:', err);
});


const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        requried: true,
        unique: true
    },
    longUrl: {
        type: String,
        required: true,
    }
})

module.exports = urlConnection.model('Url', urlSchema);
// This schema defines the structure of the URL documents in the MongoDB database.