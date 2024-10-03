// faq.service.js
const db = require('../config/db.config'); // Importing the database configuration

async function createFAQ(faqData) {
    const { question, answer, category } = faqData;
    const query = `
        INSERT INTO faqs (question, answer, category)
        VALUES (?, ?, ?)
    `;
    const values = [question, answer, category];

    try {
        const result = await db.query(query, values);
        return result; // Return the result of the insert operation
    } catch (error) {
        throw new Error('Error creating FAQ: ' + error.message);
    }
}

// New function to get all FAQs
async function getAllFAQs() {
    const query = 'SELECT * FROM faqs';
    try {
        const results = await db.query(query);
        return results;
    } catch (error) {
        throw new Error('Error fetching FAQs: ' + error.message);
    }
}

// New function to get an FAQ by ID
async function getFAQById(id) {
    const query = 'SELECT * FROM faqs WHERE id = ?';
    try {
        const results = await db.query(query, [id]);
        return results.length > 0 ? results[0] : null; // Return the first result or null if not found
    } catch (error) {
        throw new Error('Error fetching FAQ: ' + error.message);
    }
}

// New function to update an FAQ by ID
async function updateFAQ(id, updatedData) {
  const { question, answer, category } = updatedData;
  const query = `
      UPDATE faqs 
      SET question = ?, answer = ?, category = ? 
      WHERE id = ?
  `;
  const values = [question, answer, category, id];

  try {
      const result = await db.query(query, values);
      return result; // Return the result of the update operation
  } catch (error) {
      throw new Error('Error updating FAQ: ' + error.message);
  }
}

// New function to delete an FAQ by ID
async function deleteFAQ(id) {
  const query = 'DELETE FROM faqs WHERE id = ?';
  
  try {
      const result = await db.query(query, [id]);
      return result; // Return the result of the delete operation
  } catch (error) {
      throw new Error('Error deleting FAQ: ' + error.message);
  }
}

module.exports = {
    createFAQ,
    getAllFAQs,
    getFAQById,
    updateFAQ,
    deleteFAQ
};