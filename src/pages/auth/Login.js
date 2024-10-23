import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate,Link } from 'react-router-dom';


const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const {data} = await login(email, password);

    if (data.error) {
      setError(data.error);
    }else{
      localStorage.setItem('token', data.token);
      navigate('/expense');
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="card" style={{ width: '20rem' }}>
        <div className="card-body">
          <h5 className="card-title text-center">Login</h5>
          {error && <p className="text-danger text-center">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email or Username
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email or username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Sign In
            </button>
          </form>

          <div className="text-center mt-3">
            <p>
              Not a member? <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
