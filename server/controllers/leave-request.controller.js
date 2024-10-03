// leave-request.controller.js
const leaveRequestService = require('../services/leave-request.service');

async function createLeaveRequest(req, res) {
    const leaveData = req.body;

    try {
        const result = await leaveRequestService.createLeaveRequest(leaveData);
        return res.status(201).json({
            message: 'Leave request created successfully',
            data: {
                id: result.insertId,
                ...leaveData,
                status: 'pending', // Default status
            },
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}

// New controller method to get all leave requests
async function getAllLeaveRequests(req, res) {
    try {
        const leaveRequests = await leaveRequestService.getAllLeaveRequests();
        return res.status(200).json(leaveRequests);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}

// New controller method to get a specific leave request by ID
async function getLeaveRequestById(req, res) {
    const id = req.params.id;

    try {
        const leaveRequest = await leaveRequestService.getLeaveRequestById(id);
        if (leaveRequest) {
            return res.status(200).json(leaveRequest);
        } else {
            return res.status(404).json({ message: 'Leave request not found' });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}

// New controller method to update the status of a leave request by ID
async function updateLeaveRequestStatus(req, res) {
  const id = req.params.id;
  const { status } = req.body; // Expecting { "status": "approved" }

  // Validate that the status is one of the allowed values
  const validStatuses = ['pending', 'approved', 'rejected'];
  
  if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
      const result = await leaveRequestService.updateLeaveRequestStatus(id, status);
      
      if (result.affectedRows > 0) { // Check if any rows were updated
          return res.status(200).json({
              message: 'Leave request status updated successfully',
              data: { id, status },
          });
      } else {
          return res.status(404).json({ message: 'Leave request not found' });
      }
      
  } catch (error) {
      return res.status(500).json({
          message: error.message,
      });
  }
}


module.exports = {
    createLeaveRequest,
    getAllLeaveRequests,
    getLeaveRequestById,
    updateLeaveRequestStatus
};