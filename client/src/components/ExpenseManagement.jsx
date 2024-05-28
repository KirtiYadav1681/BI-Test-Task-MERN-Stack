import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ExpenseManagement = () => {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [sharedWith, setSharedWith] = useState([]);
  const [members, setMembers] = useState([]);
  const { groupId } = useParams();
  const [groupName, setGroupName] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/expense/${groupId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setExpenses(response.data);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    const fetchGroupMembers = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/group/${groupId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setGroupName(response.data.name);
        setMembers(response.data.members);
      } catch (error) {
        console.error('Error fetching group members:', error);
      }
    };

    fetchExpenses();
    fetchGroupMembers();
  }, [groupId,token]);

  const handleAddExpense = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5555/expense/create',
        {
          groupId,
          description,
          amount,
          sharedWith,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      setExpenses([...expenses, response.data]);
      setDescription('');
      setAmount('');
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  return (
    <div className="container mx-auto px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Group Name: {groupName}</h1>
      <h2 className="text-2xl font-bold mb-4">Expense Management</h2>
      <form onSubmit={handleAddExpense} className="mb-8">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Expense Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Shared With:</label>
          <select
            multiple
            value={sharedWith}
            onChange={(e) => setSharedWith([...e.target.selectedOptions].map((option) => option.value))}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          >
            {members.map((member) => (
              <option key={member._id} value={member._id}>
                {member.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-600 transition duration-300"
        >
          Add Expense
        </button>
      </form>
      <div>
        <h3 className="text-2xl font-bold mb-4">Expenses</h3>
        <ul>
          {expenses.map((expense) => (
            <li key={expense._id} className="mb-2">
              {expense.description} - Rs. {expense.amount} (shared with: {expense.sharedWith.map((member) => member.name).join(', ')})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExpenseManagement;
