// financial-report.controller.js
const financialReportService = require('../services/financial-report.service');

async function createFinancialReport(req, res) {
    const reportData = req.body;

    try {
        const result = await financialReportService.createFinancialReport(reportData);
        return res.status(201).json({
            message: 'Financial report created successfully',
            data: {
                id: result.insertId,
                ...reportData,
                created_at: new Date().toISOString(), // Assuming you want to return created_at as well
            },
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}

// New controller method to get all financial reports
async function getAllFinancialReports(req, res) {
    try {
        const reports = await financialReportService.getAllFinancialReports();
        return res.status(200).json(reports);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}

// New controller method to get a specific financial report by ID
async function getFinancialReportById(req, res) {
    const id = req.params.id;

    try {
        const report = await financialReportService.getFinancialReportById(id);
        if (report) {
            return res.status(200).json(report);
        } else {
            return res.status(404).json({ message: 'Financial report not found' });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}


// New controller method to update a specific financial report by ID
async function updateFinancialReport(req, res) {
  const id = req.params.id;
  const updatedData = req.body;

  try {
      const result = await financialReportService.updateFinancialReport(id, updatedData);

      if (result.affectedRows > 0) { // Check if any rows were updated
          return res.status(200).json({
              message: 'Financial report updated successfully',
              data: { id, ...updatedData },
          });
      } else {
          return res.status(404).json({ message: 'Financial report not found' });
      }

  } catch (error) {
      return res.status(500).json({
          message: error.message,
      });
  }
}

// New controller method to delete a specific financial report by ID
async function deleteFinancialReport(req, res) {
  const id = req.params.id;

  try {
      const result = await financialReportService.deleteFinancialReport(id);

      if (result.affectedRows > 0) { // Check if any rows were deleted
          return res.status(200).json({ message: 'Financial report deleted successfully' });
      } else {
          return res.status(404).json({ message: 'Financial report not found' });
      }

  } catch (error) {
      return res.status(500).json({
          message: error.message,
      });
  }
}

module.exports = {
    createFinancialReport,
    getAllFinancialReports,
    getFinancialReportById,
    updateFinancialReport,
    deleteFinancialReport
};