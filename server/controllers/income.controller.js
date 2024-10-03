const incomeService = require('../services/income.service');

exports.createIncome = async (req, res) => {
  try {
    const { source, amount, date } = req.body;

    // Validation
    if (!source || !amount || !date) {
      return res.status(400).json({ message: 'Source, amount, and date are required' });
    }

    // Validate source
    if (typeof source !== 'string' || source.length > 100) {
      return res.status(400).json({ message: 'Invalid source. Must be a string with max length of 100 characters' });
    }

    // Validate amount
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount. Must be a positive number' });
    }

    // Validate date format (YYYY-MM-DD)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({ message: 'Invalid date format. Use YYYY-MM-DD' });
    }

    const newIncomeId = await incomeService.createIncome(source, amount, date);
    const newIncome = await incomeService.getIncomeById(newIncomeId);

    res.status(201).json({
      message: 'Income record created successfully',
      data: newIncome
    });
  } catch (error) {
    console.error('Error in createIncome controller:', error);
    res.status(500).json({ message: 'Error creating income record', error: error.message });
  }
};

exports.getAllIncome = async (req, res) => {
  try {
    const income = await incomeService.getAllIncome();
    res.status(200).json({
      message: 'Income records retrieved successfully',
      data: income
    });
  } catch (error) {
    console.error('Error in getAllIncome controller:', error);
    res.status(500).json({ message: 'Error retrieving income records', error: error.message });
  }
};

exports.getIncomeById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate id
    if (!id || isNaN(id)) {
      return res.status(400).json({ message: 'Invalid income record ID' });
    }

    const income = await incomeService.getIncomeById(id);

    if (!income) {
      return res.status(404).json({ message: 'Income record not found' });
    }

    res.status(200).json({
      message: 'Income record retrieved successfully',
      data: income
    });
  } catch (error) {
    console.error('Error in getIncomeById controller:', error);
    res.status(500).json({ message: 'Error retrieving income record', error: error.message });
  }
};

exports.updateIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const { source, amount, date } = req.body;

    // Validate id
    if (!id || isNaN(id)) {
      return res.status(400).json({ message: 'Invalid income record ID' });
    }

    // Validate required fields
    if (!source || !amount || !date) {
      return res.status(400).json({ message: 'Source, amount, and date are required' });
    }

    // Validate source
    if (typeof source !== 'string' || source.length > 100) {
      return res.status(400).json({ message: 'Invalid source. Must be a string with max length of 100 characters' });
    }

    // Validate amount
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount. Must be a positive number' });
    }

    // Validate date format (YYYY-MM-DD)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({ message: 'Invalid date format. Use YYYY-MM-DD' });
    }

    const updatedIncome = await incomeService.updateIncome(id, source, amount, date);
    res.status(200).json({
      message: 'Income record updated successfully',
      data: updatedIncome
    });
  } catch (error) {
    console.error('Error in updateIncome controller:', error);
    if (error.message === 'Income record not found') {
      res.status(404).json({ message: 'Income record not found' });
    } else {
      res.status(500).json({ message: 'Error updating income record', error: error.message });
    }
  }
};

exports.deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate id
    if (!id || isNaN(id)) {
      return res.status(400).json({ message: 'Invalid income record ID' });
    }

    const result = await incomeService.deleteIncome(id);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error in deleteIncome controller:', error);
    if (error.message === 'Income record not found') {
      res.status(404).json({ message: 'Income record not found' });
    } else {
      res.status(500).json({ message: 'Error deleting income record', error: error.message });
    }
  }
};

