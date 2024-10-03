// faq.route.js
const express = require('express');
const router = express.Router();
const faqController = require('../controllers/faq.controller');

// POST endpoint to create a new FAQ entry
router.post('/api/faqs', faqController.createFAQ);
// GET endpoint to retrieve all FAQs
router.get('/api/faqs', faqController.getAllFAQs);

// GET endpoint to retrieve a specific FAQ by ID
router.get('/api/faqs/:id', faqController.getFAQById);
// PUT endpoint to update a specific FAQ by ID
router.put('/api/faqs/:id', faqController.updateFAQ);

// DELETE endpoint to delete a specific FAQ by ID
router.delete('/api/faqs/:id', faqController.deleteFAQ);


module.exports = router;