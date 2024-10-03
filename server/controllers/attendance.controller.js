const attendanceService = require('../services/attendance.service');

exports.createAttendance = async (req, res) => {
  try {
    const { user_id, date, check_in, check_out, status } = req.body;

    // Validation
    if (!user_id || !date) {
      return res.status(400).json({ message: 'User ID and date are required' });
    }

    // Validate date format (YYYY-MM-DD)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({ message: 'Invalid date format. Use YYYY-MM-DD' });
    }

    // Validate time format (HH:MM:SS)
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
    if (check_in && !timeRegex.test(check_in)) {
      return res.status(400).json({ message: 'Invalid check-in time format. Use HH:MM:SS' });
    }
    if (check_out && !timeRegex.test(check_out)) {
      return res.status(400).json({ message: 'Invalid check-out time format. Use HH:MM:SS' });
    }

    // Validate status
    const validStatuses = ['present', 'absent', 'late', 'on_leave'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status. Use present, absent, late, or on_leave' });
    }

    const newAttendanceId = await attendanceService.createAttendance(user_id, date, check_in, check_out, status);
    const newAttendance = await attendanceService.getAttendanceById(newAttendanceId);

    res.status(201).json({
      message: 'Attendance record created successfully',
      data: newAttendance
    });
  } catch (error) {
    console.error('Error in createAttendance controller:', error);
    res.status(500).json({ message: 'Error creating attendance record', error: error.message });
  }
};

exports.getAllAttendance = async (req, res) => {
  try {
    const attendance = await attendanceService.getAllAttendance();
    res.status(200).json({
      message: 'Attendance records retrieved successfully',
      data: attendance
    });
  } catch (error) {
    console.error('Error in getAllAttendance controller:', error);
    res.status(500).json({ message: 'Error retrieving attendance records', error: error.message });
  }
};

exports.getAttendanceByUserId = async (req, res) => {
  try {
    const userId = req.params.user_id;

    // Validate user_id
    if (!userId || isNaN(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const attendance = await attendanceService.getAttendanceByUserId(userId);

    if (attendance.length === 0) {
      return res.status(404).json({ message: 'No attendance records found for this user' });
    }

    res.status(200).json({
      message: 'Attendance records for user retrieved successfully',
      user_id: userId,
      data: attendance
    });
  } catch (error) {
    console.error('Error in getAttendanceByUserId controller:', error);
    res.status(500).json({ message: 'Error retrieving attendance records for user', error: error.message });
  }
};

exports.updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const { check_in, check_out, status } = req.body;

    // Validate id
    if (!id || isNaN(id)) {
      return res.status(400).json({ message: 'Invalid attendance record ID' });
    }

    // Validate time format (HH:MM:SS)
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
    if (check_in && !timeRegex.test(check_in)) {
      return res.status(400).json({ message: 'Invalid check-in time format. Use HH:MM:SS' });
    }
    if (check_out && !timeRegex.test(check_out)) {
      return res.status(400).json({ message: 'Invalid check-out time format. Use HH:MM:SS' });
    }

    // Validate status
    const validStatuses = ['present', 'absent', 'late', 'on_leave'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status. Use present, absent, late, or on_leave' });
    }

    const updatedAttendance = await attendanceService.updateAttendance(id, check_in, check_out, status);
    res.status(200).json({
      message: 'Attendance record updated successfully',
      data: updatedAttendance
    });
  } catch (error) {
    console.error('Error in updateAttendance controller:', error);
    if (error.message === 'Attendance record not found') {
      res.status(404).json({ message: 'Attendance record not found' });
    } else {
      res.status(500).json({ message: 'Error updating attendance record', error: error.message });
    }
  }
};

exports.deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate id
    if (!id || isNaN(id)) {
      return res.status(400).json({ message: 'Invalid attendance record ID' });
    }

    const result = await attendanceService.deleteAttendance(id);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error in deleteAttendance controller:', error);
    if (error.message === 'Attendance record not found') {
      res.status(404).json({ message: 'Attendance record not found' });
    } else {
      res.status(500).json({ message: 'Error deleting attendance record', error: error.message });
    }
  }
};

