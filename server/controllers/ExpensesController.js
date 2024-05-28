const Group = require('../models/Group');
const Expense = require('../models/Expense');

module.exports.createNewExpense = async (req, res) => {
    const { groupId, description, amount, sharedWith } = req.body;
    try {
      const group = await Group.findById(groupId);
      if (!group) {
        return res.status(404).json({ error: 'Group not found' });
      }
  
      const expense = new Expense({
        groupId,
        userId: req.user._id,
        description,
        amount,
        sharedWith,
      });
  
      await expense.save();
      res.status(201).json(expense);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

module.exports.getAllExpensesOfGroup = async (req, res) => {
    const { groupId } = req.params;
    try {
      const expenses = await Expense.find({ groupId }).populate('userId', 'name email').populate('sharedWith', 'name email');
      res.status(200).json(expenses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}