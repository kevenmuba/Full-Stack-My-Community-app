const db = require('../config/db.config');

exports.createAttendance = async (userId, date, checkIn, checkOut, status) => {
  const query = `
    INSERT INTO attendance (user_id, date, check_in, check_out, status) 
    VALUES (?, ?, ?, ?, ?)
  `;
  try {
    const result = await db.query(query, [userId, date, checkIn, checkOut, status]);
    return result.insertId;
  } catch (error) {
    console.error('Error in createAttendance service:', error);
    throw error;
  }
};

exports.getAttendanceById = async (attendanceId) => {
  const query = 'SELECT * FROM attendance WHERE id = ?';
  try {
    const [attendance] = await db.query(query, [attendanceId]);
    return attendance;
  } catch (error) {
    console.error('Error in getAttendanceById service:', error);
    throw error;
  }
};

exports.getAllAttendance = async () => {
  const query = 'SELECT * FROM attendance ORDER BY date DESC, user_id';
  try {
    const attendance = await db.query(query);
    return attendance;
  } catch (error) {
    console.error('Error in getAllAttendance service:', error);
    throw error;
  }
};

exports.getAttendanceByUserId = async (userId) => {
  const query = 'SELECT * FROM attendance WHERE user_id = ? ORDER BY date DESC';
  try {
    const attendance = await db.query(query, [userId]);
    return attendance;
  } catch (error) {
    console.error('Error in getAttendanceByUserId service:', error);
    throw error;
  }
};


exports.updateAttendance = async (id, checkIn, checkOut, status) => {
  const query = `
    UPDATE attendance 
    SET check_in = ?, check_out = ?, status = ?
    WHERE id = ?
  `;
  try {
    const result = await db.query(query, [checkIn, checkOut, status, id]);
    if (result.affectedRows === 0) {
      throw new Error('Attendance record not found');
    }
    return await this.getAttendanceById(id);
  } catch (error) {
    console.error('Error in updateAttendance service:', error);
    throw error;
  }
};

exports.deleteAttendance = async (id) => {
  const query = 'DELETE FROM attendance WHERE id = ?';
  try {
    const result = await db.query(query, [id]);
    if (result.affectedRows === 0) {
      throw new Error('Attendance record not found');
    }
    return { message: 'Attendance record deleted successfully' };
  } catch (error) {
    console.error('Error in deleteAttendance service:', error);
    throw error;
  }
};


