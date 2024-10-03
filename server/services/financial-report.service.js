// financial-report.service.js
const db = require('../config/db.config'); // Importing the database configuration

async function createFinancialReport(reportData) {
    const { report_type, total_income, total_expenses, net_profit, report_date } = reportData;
    const query = `
        INSERT INTO financial_reports (report_type, total_income, total_expenses, net_profit, report_date)
        VALUES (?, ?, ?, ?, ?)
    `;
    const values = [report_type, total_income, total_expenses, net_profit, report_date];

    try {
        const result = await db.query(query, values);
        return result; // Return the result of the insert operation
    } catch (error) {
        throw new Error('Error creating financial report: ' + error.message);
    }
}

// New function to get all financial reports
async function getAllFinancialReports() {
    const query = 'SELECT * FROM financial_reports';
    try {
        const results = await db.query(query);
        return results;
    } catch (error) {
        throw new Error('Error fetching financial reports: ' + error.message);
    }
}

// New function to get a financial report by ID
async function getFinancialReportById(id) {
    const query = 'SELECT * FROM financial_reports WHERE id = ?';
    try {
        const results = await db.query(query, [id]);
        return results.length > 0 ? results[0] : null; // Return the first result or null if not found
    } catch (error) {
        throw new Error('Error fetching financial report: ' + error.message);
    }
}

// New function to update a financial report by ID
async function updateFinancialReport(id, updatedData) {
  const { total_income, total_expenses, net_profit } = updatedData;
  const query = `
      UPDATE financial_reports 
      SET total_income = ?, total_expenses = ?, net_profit = ? 
      WHERE id = ?
  `;
  const values = [total_income, total_expenses, net_profit, id];

  try {
      const result = await db.query(query, values);
      return result; // Return the result of the update operation
  } catch (error) {
      throw new Error('Error updating financial report: ' + error.message);
  }
}

// New function to delete a financial report by ID
async function deleteFinancialReport(id) {
  const query = 'DELETE FROM financial_reports WHERE id = ?';
  
  try {
      const result = await db.query(query, [id]);
      return result; // Return the result of the delete operation
  } catch (error) {
      throw new Error('Error deleting financial report: ' + error.message);
  }
}

module.exports = {
    createFinancialReport,
    getAllFinancialReports,
    getFinancialReportById,
    updateFinancialReport,
    deleteFinancialReport
};