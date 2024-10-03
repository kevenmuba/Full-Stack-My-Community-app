// wages/wages.service.js
const db = require('../config/db.config'); // Importing the database configuration

async function createWage(wageData) {
    const { user_id, amount, pay_period_start, pay_period_end } = wageData;
    const query = `
        INSERT INTO wages (user_id, amount, pay_period_start, pay_period_end)
        VALUES (?, ?, ?, ?)
    `;
    const values = [user_id, amount, pay_period_start, pay_period_end];

    try {
        const result = await db.query(query, values);
        return result;
    } catch (error) {
        throw new Error('Error creating wage record: ' + error.message);
    }
}

// New function to get all wage records
async function getAllWages() {
  const query = 'SELECT * FROM wages';
  try {
      const results = await db.query(query);
      return results;
  } catch (error) {
      throw new Error('Error fetching wage records: ' + error.message);
  }
}

// New function to get a wage record by ID
async function getWageById(id) {
  const query = 'SELECT * FROM wages WHERE id = ?';
  try {
      const results = await db.query(query, [id]);
      return results.length > 0 ? results[0] : null; // Return the first result or null if not found
  } catch (error) {
      throw new Error('Error fetching wage record: ' + error.message);
  }
}
// New function to update a wage record by ID
async function updateWageById(id, wageData) {
    const { amount, pay_period_start, pay_period_end } = wageData;
    const query = `
        UPDATE wages 
        SET amount = ?, pay_period_start = ?, pay_period_end = ? 
        WHERE id = ?
    `;
    const values = [amount, pay_period_start, pay_period_end, id];

    try {
        const result = await db.query(query, values);
        return result; // Return the result of the update operation
    } catch (error) {
        throw new Error('Error updating wage record: ' + error.message);
    }
}

// New function to delete a wage record by ID
async function deleteWageById(id) {
    const query = 'DELETE FROM wages WHERE id = ?';
    
    try {
        const result = await db.query(query, [id]);
        return result; // Return the result of the delete operation
    } catch (error) {
        throw new Error('Error deleting wage record: ' + error.message);
    }
}

module.exports = {
    createWage,
    getAllWages,
    getWageById,
    updateWageById,
    deleteWageById,
};