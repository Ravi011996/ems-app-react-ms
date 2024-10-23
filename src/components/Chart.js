import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useExpenses } from '../contexts/ExpenseContext';
import "chartjs-adapter-date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ExpenseChart = () => {
  const { expenses, loading, error } = useExpenses();
  const [filteredExpenses, setFilteredExpenses] = useState(expenses);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (startDate && endDate) {
      const filtered = expenses.filter((expense) => {
        const expenseDate = new Date(expense.date);
        return (
          expenseDate >= new Date(startDate) && expenseDate <= new Date(endDate)
        );
      });
      setFilteredExpenses(filtered);
    } else {
      setFilteredExpenses(expenses);
    }
  }, [startDate, endDate, expenses]);

  if (loading) return <p>Loading expenses...</p>;
  if (error) return <p>Error: {error}</p>;
  // Aggregate expenses by category
  const aggregatedExpenses = filteredExpenses.reduce((acc, expense) => {
    const category = expense.category;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += expense.amount;
    return acc;
  }, {});

  // Prepare data for Chart.js
  const categories = Object.keys(aggregatedExpenses);
  const amounts = Object.values(aggregatedExpenses);

  const data = {
    labels: categories,
    datasets: [
      {
        label: "Amount",
        data: amounts,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: { display: true, text: "Expenses by Category" },
    },
  };

  return (
    <div className="container mt-4">
      {/* Date range filter */}
      <div className="row mb-3">
        <div className="col">
          <input
            type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            placeholder="Start date"
          />
        </div>
        <div className="col">
          <input
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            placeholder="End date"
          />
        </div>
      </div>

      {/* Render the Bar chart */}
      <div style={{ height: "400px", width: "100%" }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default ExpenseChart;
