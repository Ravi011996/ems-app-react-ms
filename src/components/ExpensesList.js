import React from 'react';
import { useExpenses } from '../contexts/ExpenseContext';
import { useNavigate } from 'react-router-dom';

const ExpensesList = () => {
  const { expenses, loading, error, deleteExpense,updateExpense} = useExpenses();
  const navigate = useNavigate();

  if (loading) return <p>Loading expenses...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleAddExpense = () => {
    navigate('/expense/add-expense'); 
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h3>List</h3>
        <button className="btn btn-success" onClick={handleAddExpense}>
          <i className="bi bi-plus-lg"></i> Add Expense
        </button>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">SN</th>
            <th scope="col">Title</th>
            <th scope="col">Amount</th>
            <th scope="col">Category</th>
            <th scope="col">Date</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={expense._id}>
              <th scope="row">{index + 1}</th>
              <td>{expense.title}</td>
              <td>${expense.amount}</td>
              <td>{expense.category}</td>
              <td>{new Date(expense.date).toLocaleDateString()}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => updateExpense(expense._id)}
                >
                  <i className="bi bi-pencil-fill"></i> 
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteExpense(expense._id)}
                >
                  <i className="bi bi-trash-fill"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpensesList;
