const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expense.controller');

router.post('/api/expenses', expenseController.createExpense);
router.get('/api/expenses', expenseController.getAllExpenses);
router.get('/api/expenses/:id', expenseController.getExpenseById);
router.put('/api/expenses/:id', expenseController.updateExpense);
router.delete('/api/expenses/:id', expenseController.deleteExpense);

module.exports = router;