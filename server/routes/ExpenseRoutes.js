const express = require('express');
const router = express.Router();

const auth = require('../middleware/authMiddleware');
const {createNewExpense, getAllExpensesOfGroup} = require('../controllers/ExpensesController');

router.post('/create', auth, createNewExpense);

router.get('/:groupId', auth, getAllExpensesOfGroup);

module.exports = router;
