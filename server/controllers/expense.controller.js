const expenseService = require('../services/expense.service');

exports.createExpense = async (req, res) => {
  try {
    const { category, amount, date, description } = req.body;

    // Validation
    if (!category || !amount || !date) {
      return res.status(400).json({ message: 'Category, amount, and date are required' });
    }

    // Validate category
    if (typeof category !== 'string' || category.length > 100) {
      return res.status(400).json({ message: 'Invalid category. Must be a string with max length of 100 characters' });
    }

    // Validate amount
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount. Must be a positive number' });
    }

    // Validate date format (YYYY-MM-DD)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({ message: 'Invalid date format. Use YYYY-MM-DD' });
    }

    // Validate description (optional)
    if (description && typeof description !== 'string') {
      return res.status(400).json({ message: 'Invalid description. Must be a string' });
    }

    const newExpenseId = await expenseService.createExpense(category, amount, date, description);
    const newExpense = await expenseService.getExpenseById(newExpenseId);

    res.status(201).json({
      message: 'Expense record created successfully',
      data: newExpense
    });
  } catch (error) {
    console.error('Error in createExpense controller:', error);
    res.status(500).json({ message: 'Error creating expense record', error: error.message });
  }
};

exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await expenseService.getAllExpenses();
    res.status(200).json({
      message: 'Expense records retrieved successfully',
      data: expenses
    });
  } catch (error) {
    console.error('Error in getAllExpenses controller:', error);
    res.status(500).json({ message: 'Error retrieving expense records', error: error.message });
  }
};

exports.getExpenseById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate id
    if (!id || isNaN(id)) {
      return res.status(400).json({ message: 'Invalid expense record ID' });
    }

    const expense = await expenseService.getExpenseById(id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense record not found' });
    }

    res.status(200).json({
      message: 'Expense record retrieved successfully',
      data: expense
    });
  } catch (error) {
    console.error('Error in getExpenseById controller:', error);
    res.status(500).json({ message: 'Error retrieving expense record', error: error.message });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, amount, date, description } = req.body;

    // Validate id
    if (!id || isNaN(id)) {
      return res.status(400).json({ message: 'Invalid expense record ID' });
    }

    // Validate required fields
    if (!category || !amount || !date) {
      return res.status(400).json({ message: 'Category, amount, and date are required' });
    }

    // Validate category
    if (typeof category !== 'string' || category.length > 100) {
      return res.status(400).json({ message: 'Invalid category. Must be a string with max length of 100 characters' });
    }

    // Validate amount
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount. Must be a positive number' });
    }

    // Validate date format (YYYY-MM-DD)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({ message: 'Invalid date format. Use YYYY-MM-DD' });
    }

    // Validate description (optional)
    if (description && typeof description !== 'string') {
      return res.status(400).json({ message: 'Invalid description. Must be a string' });
    }

    const updatedExpense = await expenseService.updateExpense(id, category, amount, date, description);
    res.status(200).json({
      message: 'Expense record updated successfully',
      data: updatedExpense
    });
  } catch (error) {
    console.error('Error in updateExpense controller:', error);
    if (error.message === 'Expense record not found') {
      res.status(404).json({ message: 'Expense record not found' });
    } else {
      res.status(500).json({ message: 'Error updating expense record', error: error.message });
    }
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate id
    if (!id || isNaN(id)) {
      return res.status(400).json({ message: 'Invalid expense record ID' });
    }

    const result = await expenseService.deleteExpense(id);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error in deleteExpense controller:', error);
    if (error.message === 'Expense record not found') {
      res.status(404).json({ message: 'Expense record not found' });
    } else {
      res.status(500).json({ message: 'Error deleting expense record', error: error.message });
    }
  }
};