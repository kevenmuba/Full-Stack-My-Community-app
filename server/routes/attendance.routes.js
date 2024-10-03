const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendance.controller');

router.post('/api/attendance', attendanceController.createAttendance);
router.get('/api/attendance', attendanceController.getAllAttendance);
router.get('/api/attendance/user/:user_id', attendanceController.getAttendanceByUserId);
router.put('/api/attendance/:id', attendanceController.updateAttendance);
router.delete('/api/attendance/:id', attendanceController.deleteAttendance);

module.exports = router;