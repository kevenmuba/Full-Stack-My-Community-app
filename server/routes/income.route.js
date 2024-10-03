const express = require('express');
const router = express.Router();
const incomeController = require('../controllers/income.controller');

router.post('/api/income', incomeController.createIncome);

router.get('/api/income', incomeController.getAllIncome);
router.get('/api/income/:id', incomeController.getIncomeById);
router.put('/api/income/:id', incomeController.updateIncome);
router.delete('/api/income/:id', incomeController.deleteIncome);


module.exports = router;