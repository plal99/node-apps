require('dotenv').config();
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const expenseSchema = require('../db/expense-db');

// Home page of Expense Tracker
router.get('/', async (req, res) => {
  const expenses = await Expense.find().sort({ date: -1 });
  res.render('expense/index', { expenses });
});

// Add expense
router.post('/', async (req, res) => {
  const { title, amount, category, description } = req.body;
  await new Expense({ title, amount, category, description }).save();
  res.redirect('/expense');
});

// Delete expense
router.post('/delete/:id', async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.redirect('/expense');
});

module.exports = router;
