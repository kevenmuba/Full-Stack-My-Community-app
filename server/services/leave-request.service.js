// leave-request.service.js
const db = require('../config/db.config'); // Importing the database configuration

async function createLeaveRequest(leaveData) {
    const { user_id, start_date, end_date, reason } = leaveData;
    const query = `
        INSERT INTO leave_requests (user_id, start_date, end_date, reason)
        VALUES (?, ?, ?, ?)
    `;
    const values = [user_id, start_date, end_date, reason];

    try {
        const result = await db.query(query, values);
        return result; // Return the result of the insert operation
    } catch (error) {
        throw new Error('Error creating leave request: ' + error.message);
    }
}

// New function to get all leave requests
async function getAllLeaveRequests() {
    const query = 'SELECT * FROM leave_requests';
    try {
        const results = await db.query(query);
        return results;
    } catch (error) {
        throw new Error('Error fetching leave requests: ' + error.message);
    }
}

// New function to get a leave request by ID
async function getLeaveRequestById(id) {
    const query = 'SELECT * FROM leave_requests WHERE id = ?';
    try {
        const results = await db.query(query, [id]);
        return results.length > 0 ? results[0] : null; // Return the first result or null if not found
    } catch (error) {
        throw new Error('Error fetching leave request: ' + error.message);
    }
}

// New function to update the status of a leave request by ID
async function updateLeaveRequestStatus(id, status) {
  const query = `
      UPDATE leave_requests 
      SET status = ? 
      WHERE id = ?
  `;
  const values = [status, id];

  try {
      const result = await db.query(query, values);
      return result; // Return the result of the update operation
  } catch (error) {
      throw new Error('Error updating leave request status: ' + error.message);
  }
}

module.exports = {
    createLeaveRequest,
    getAllLeaveRequests,
    getLeaveRequestById,
    updateLeaveRequestStatus
};