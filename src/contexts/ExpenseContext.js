import React, { createContext, useState, useContext, useEffect } from 'react';
import axiosInstance from '../services/axiosInstance';
import { useNavigate } from 'react-router-dom';

const ExpenseContext = createContext();

export const useExpenses = () => useContext(ExpenseContext);

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const {data} = await axiosInstance.get('/expenses');
      setExpenses(data.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const addExpense = async (newExpense) => {
    try {
      const response = await axiosInstance.post('/expenses', newExpense);
      setExpenses([...expenses, response.data]);
      navigate('/expense')
    } catch (err) {
      setError(err.message);
    }
  };

  const updateExpense = async (id, updatedExpense) => {
    try {
      const response = await axiosInstance.put(`/expenses/${id}`, updatedExpense);
      setExpenses(expenses.map(exp => (exp._id === id ? response.data : exp)));
      navigate('/expense')
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(`/expenses/${id}`);
      setExpenses(expenses.filter(exp => exp._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <ExpenseContext.Provider value={{ expenses, loading, error, fetchExpenses, addExpense, updateExpense, deleteExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
};
