import React from 'react';
import ExpenseChart from '../../components/Chart';
import ExpensesList from '../../components/ExpensesList'

const Home = () => {
  return (
    <div className=" mt-4">
      <div className="row gy-5">
        {/* First column with 5 grid spaces */}
        <div className="col-md-5">
        <ExpenseChart />
        </div>

        {/* Second column with 7 grid spaces */}
        <div className="col-md-7">
        <ExpensesList />
        </div>
      </div>
    </div>
  );
};

export default Home;
