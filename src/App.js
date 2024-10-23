import "./App.css";
import Navbar from "./layouts/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login, Register } from "./pages/auth/index";
import Home from "./pages/home/Home";
import { AuthProvider } from "./contexts/AuthContext";
import { ExpenseProvider } from './contexts/ExpenseContext'; // Assuming you have ExpenseProvider
import ExpenseForm from './components/ExpenseForm';

function App() {
  return (
    <div className="App text-start">
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/expense"
              element={
                <ExpenseProvider>
                  <Home />
                </ExpenseProvider>
              }
            />
            <Route
              path="/expense/add-expense"
              element={
                <ExpenseProvider>
                  <ExpenseForm />
                </ExpenseProvider>
              }
            />
            <Route
              path="/expense/edit-expense"
              element={
                <ExpenseProvider>
                  <ExpenseForm />
                </ExpenseProvider>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
