const db = require('../config/db.config');

exports.createExpense = async (category, amount, date, description) => {
  const query = 'INSERT INTO expenses (category, amount, date, description) VALUES (?, ?, ?, ?)';
  try {
    const result = await db.query(query, [category, amount, date, description]);
    return result.insertId;
  } catch (error) {
    console.error('Error in createExpense service:', error);
    throw error;
  }
};

exports.getExpenseById = async (expenseId) => {
  const query = 'SELECT * FROM expenses WHERE id = ?';
  try {
    const [expense] = await db.query(query, [expenseId]);
    return expense;
  } catch (error) {
    console.error('Error in getExpenseById service:', error);
    throw error;
  }
};

exports.getAllExpenses = async () => {
  const query = 'SELECT * FROM expenses ORDER BY date DESC';
  try {
    const expenses = await db.query(query);
    return expenses;
  } catch (error) {
    console.error('Error in getAllExpenses service:', error);
    throw error;
  }
};

// Note: We already have getExpenseById, but I'll include it here for completeness
exports.getExpenseById = async (expenseId) => {
  const query = 'SELECT * FROM expenses WHERE id = ?';
  try {
    const [expense] = await db.query(query, [expenseId]);
    return expense;
  } catch (error) {
    console.error('Error in getExpenseById service:', error);
    throw error;
  }
};

exports.updateExpense = async (id, category, amount, date, description) => {
  const query = 'UPDATE expenses SET category = ?, amount = ?, date = ?, description = ? WHERE id = ?';
  try {
    const result = await db.query(query, [category, amount, date, description, id]);
    if (result.affectedRows === 0) {
      throw new Error('Expense record not found');
    }
    return await this.getExpenseById(id);
  } catch (error) {
    console.error('Error in updateExpense service:', error);
    throw error;
  }
};

exports.deleteExpense = async (id) => {
  const query = 'DELETE FROM expenses WHERE id = ?';
  try {
    const result = await db.query(query, [id]);
    if (result.affectedRows === 0) {
      throw new Error('Expense record not found');
    }
    return { message: 'Expense record deleted successfully' };
  } catch (error) {
    console.error('Error in deleteExpense service:', error);
    throw error;
  }
};