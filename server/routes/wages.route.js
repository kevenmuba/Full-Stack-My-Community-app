// wages.route.js
const express = require('express');
const router = express.Router();
const wagesController = require('../controllers/wages.controller');

// POST endpoint to create a new wage record
router.post('/api/wages', wagesController.createWageRecord);
// GET endpoint to retrieve all wage records
router.get('/api/wages', wagesController.getAllWageRecords);

// GET endpoint to retrieve a specific wage record by ID
router.get('/api/wages/:id', wagesController.getWageRecordById);

// PUT endpoint to update a specific wage record by ID
router.put('/api/wages/:id', wagesController.updateWageRecord);

// DELETE endpoint to delete a specific wage record by ID
router.delete('/api/wages/:id', wagesController.deleteWageRecord);

module.exports = router;