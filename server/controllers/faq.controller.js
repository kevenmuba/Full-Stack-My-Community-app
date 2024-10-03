// faq.controller.js
const faqService = require('../services/faq.service');

async function createFAQ(req, res) {
    const faqData = req.body;

    try {
        const result = await faqService.createFAQ(faqData);
        return res.status(201).json({
            message: 'FAQ created successfully',
            data: {
                id: result.insertId,
                ...faqData,
                created_at: new Date().toISOString(), // Assuming you want to return created_at as well
            },
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}

// New controller method to get all FAQs
async function getAllFAQs(req, res) {
    try {
        const faqs = await faqService.getAllFAQs();
        return res.status(200).json(faqs);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}

// New controller method to get a specific FAQ by ID
async function getFAQById(req, res) {
    const id = req.params.id;

    try {
        const faq = await faqService.getFAQById(id);
        if (faq) {
            return res.status(200).json(faq);
        } else {
            return res.status(404).json({ message: 'FAQ not found' });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}

// New controller method to update a specific FAQ by ID
async function updateFAQ(req, res) {
  const id = req.params.id;
  const updatedData = req.body;

  try {
      const result = await faqService.updateFAQ(id, updatedData);

      if (result.affectedRows > 0) { // Check if any rows were updated
          return res.status(200).json({
              message: 'FAQ updated successfully',
              data: { id, ...updatedData },
          });
      } else {
          return res.status(404).json({ message: 'FAQ not found' });
      }

  } catch (error) {
      return res.status(500).json({
          message: error.message,
      });
  }
}

// New controller method to delete a specific FAQ by ID
async function deleteFAQ(req, res) {
  const id = req.params.id;

  try {
      const result = await faqService.deleteFAQ(id);

      if (result.affectedRows > 0) { // Check if any rows were deleted
          return res.status(200).json({ message: 'FAQ deleted successfully' });
      } else {
          return res.status(404).json({ message: 'FAQ not found' });
      }

  } catch (error) {
      return res.status(500).json({
          message: error.message,
      });
  }
}



module.exports = {
    createFAQ,
    getAllFAQs,
    getFAQById,
    updateFAQ,
    deleteFAQ
};