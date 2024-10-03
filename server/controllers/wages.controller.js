// wages/wages.controller.js
const wagesService = require('../services/wages.service');

async function createWageRecord(req, res) {
    const wageData = req.body;

    try {
        const result = await wagesService.createWage(wageData);
        return res.status(201).json({
            message: 'Wage record created successfully',
            data: result,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}

async function getAllWageRecords(req, res) {
  try {
      const wages = await wagesService.getAllWages();
      return res.status(200).json(wages);
  } catch (error) {
      return res.status(500).json({
          message: error.message,
      });
  }
}

// New controller method to get a wage record by ID
async function getWageRecordById(req, res) {
  const id = req.params.id;

  try {
      const wage = await wagesService.getWageById(id);
      if (wage) {
          return res.status(200).json(wage);
      } else {
          return res.status(404).json({ message: 'Wage record not found' });
      }
  } catch (error) {
      return res.status(500).json({
          message: error.message,
      });
  }
}
// Existing methods...

// New controller method to update a wage record by ID
async function updateWageRecord(req, res) {
    const id = req.params.id;
    const wageData = req.body;

    try {
        const result = await wagesService.updateWageById(id, wageData);
        
        if (result.affectedRows > 0) { // Check if any rows were updated
            return res.status(200).json({
                message: 'Wage record updated successfully',
                data: { id, ...wageData },
            });
        } else {
            return res.status(404).json({ message: 'Wage record not found' });
        }
        
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}

// New controller method to delete a wage record by ID
async function deleteWageRecord(req, res) {
    const id = req.params.id;

    try {
        const result = await wagesService.deleteWageById(id);
        
        if (result.affectedRows > 0) { // Check if any rows were deleted
            return res.status(200).json({ message: 'Wage record deleted successfully' });
        } else {
            return res.status(404).json({ message: 'Wage record not found' });
        }
        
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}

module.exports = {
    createWageRecord,
    getAllWageRecords,
    getWageRecordById,
    updateWageRecord,
    deleteWageRecord,
};