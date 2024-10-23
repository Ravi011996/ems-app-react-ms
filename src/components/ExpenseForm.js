import React, { useState } from "react";
import { useExpenses } from "../contexts/ExpenseContext";

const ExpenseForm = ({ expense }) => {
  const { addExpense, updateExpense } = useExpenses();
  const [title, setTitle] = useState(expense ? expense.title : "");
  const [amount, setAmount] = useState(expense ? expense.amount : "");
  const [category, setCategory] = useState(expense ? expense.category : "");
  const [date, setDate] = useState(expense ? expense.date : "");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newExpense = { title, amount, category, date };

    if (expense) {
      updateExpense(expense._id, newExpense);
    } else {
      addExpense(newExpense);
    }

    setTitle("");
    setAmount("");
    setCategory("");
    setDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="container text-start">
      <div className="row mb-3 ">
        <div className="col">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Expense title"
            required
          />
        </div>

        <div className="col">
          <label htmlFor="amount" className="form-label">
            Amount
          </label>
          <input
            type="number"
            className="form-control"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Expense amount"
            required
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <input
            type="text"
            className="form-control"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Expense category"
            required
          />
        </div>

        <div className="col">
          <label htmlFor="date" className="form-label">
            Date
          </label>
          <input
            type="date"
            className="form-control"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
      </div>

      <button type="submit" className="btn btn-primary w-100">
        {expense ? "Update Expense" : "Add Expense"}
      </button>
    </form>
  );
};

export default ExpenseForm;
