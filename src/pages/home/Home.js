import React from "react";
import ExpensesList from "../../components/ExpensesList";
import {ExpenseProvider} from '../../contexts/ExpenseContext'

const Home = () => {
  return (
    <ExpenseProvider>
      <ExpensesList />
    </ExpenseProvider>
  );
};

export default Home;
