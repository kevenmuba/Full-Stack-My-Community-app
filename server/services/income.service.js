const db = require('../config/db.config');

exports.createIncome = async (source, amount, date) => {
  const query = 'INSERT INTO income (source, amount, date) VALUES (?, ?, ?)';
  try {
    const result = await db.query(query, [source, amount, date]);
    return result.insertId;
  } catch (error) {
    console.error('Error in createIncome service:', error);
    throw error;
  }
};

exports.getIncomeById = async (incomeId) => {
  const query = 'SELECT * FROM income WHERE id = ?';
  try {
    const [income] = await db.query(query, [incomeId]);
    return income;
  } catch (error) {
    console.error('Error in getIncomeById service:', error);
    throw error;
  }
};

exports.getAllIncome = async () => {
  const query = 'SELECT * FROM income ORDER BY date DESC';
  try {
    const income = await db.query(query);
    return income;
  } catch (error) {
    console.error('Error in getAllIncome service:', error);
    throw error;
  }
};
exports.updateIncome = async (id, source, amount, date) => {
  const query = 'UPDATE income SET source = ?, amount = ?, date = ? WHERE id = ?';
  try {
    const result = await db.query(query, [source, amount, date, id]);
    if (result.affectedRows === 0) {
      throw new Error('Income record not found');
    }
    return await this.getIncomeById(id);
  } catch (error) {
    console.error('Error in updateIncome service:', error);
    throw error;
  }
};

exports.deleteIncome = async (id) => {
  const query = 'DELETE FROM income WHERE id = ?';
  try {
    const result = await db.query(query, [id]);
    if (result.affectedRows === 0) {
      throw new Error('Income record not found');
    }
    return { message: 'Income record deleted successfully' };
  } catch (error) {
    console.error('Error in deleteIncome service:', error);
    throw error;
  }
};



