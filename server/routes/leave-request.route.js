// leave-request.route.js
const express = require('express');
const router = express.Router();
const leaveRequestController = require('../controllers/leave-request.controller');

// POST endpoint to create a new leave request
router.post('/api/leave_requests', leaveRequestController.createLeaveRequest);

// GET endpoint to retrieve all leave requests
router.get('/api/leave_requests', leaveRequestController.getAllLeaveRequests);

// GET endpoint to retrieve a specific leave request by ID
router.get('/api/leave_requests/:id', leaveRequestController.getLeaveRequestById);
// PUT endpoint to update the status of a specific leave request by ID
router.put('/api/leave_requests/:id', leaveRequestController.updateLeaveRequestStatus);


module.exports = router;