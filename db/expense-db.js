const mongoose = require('mongoose');

const expenseConnection = mongoose.createConnection(process.env.MONGO_URI_EXPENSES);

expenseConnection.on('connected', () => {
  console.log('Expenses DB connected successfully');
});

expenseConnection.on('error', (err) => {
  console.error('Expenses DB connection error:', err);
});

const expenseSchema = new mongoose.Schema({
    title: String,
    amount: Number,
    date: { type: Date, default: Date.now },
    category: String,
    description: String
})

module.exports = expenseSchema;