// financial-report.route.js
const express = require('express');
const router = express.Router();
const financialReportController = require('../controllers/financial-report.controller');

// POST endpoint to create a new financial report
router.post('/api/financial_reports', financialReportController.createFinancialReport);

// GET endpoint to retrieve all financial reports
router.get('/api/financial_reports', financialReportController.getAllFinancialReports);

// GET endpoint to retrieve a specific financial report by ID
router.get('/api/financial_reports/:id', financialReportController.getFinancialReportById);

// PUT endpoint to update a specific financial report by ID
router.put('/api/financial_reports/:id', financialReportController.updateFinancialReport);

// DELETE endpoint to delete a specific financial report by ID
router.delete('/api/financial_reports/:id', financialReportController.deleteFinancialReport);

module.exports = router;