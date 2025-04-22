import React, { useState } from 'react';
import '..Login/l';
import BtLogo from '../assets/BT.png';
// import { login } from '../../service/auth_service/AuthService.js';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError(null); // Clear previous errors
      const loginResponse = await login(email, password);

      console.log('Login successful:', loginResponse);

      // Store the access token in localStorage
      localStorage.setItem('accessToken', loginResponse.access_token);

      // Redirect to the dashboard
      window.location.href = '/management'
    } catch (err) {
      // Display error message to the user
      setError(err.message);
    }
  };

  return (
      <div className="login-container">
        <div className="logo">
          <img src={BtLogo} alt="logo" />
        </div>

        <h1>Hi, Welcome Back</h1>
        <p className="subtitle">Enter your credentials to continue</p>

        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}

          <div className="input-group">
            <label htmlFor="email">Email Address / Username</label>
            <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="password-field">
              <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
              />
              <span className="toggle-password" onClick={togglePasswordVisibility}>
              {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
              ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
              )}
            </span>
            </div>
          </div>

          <div className="remember-forgot">
            <div className="checkbox-container">
              <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
              />
              <label htmlFor="remember">Keep me logged in</label>
            </div>
            <a href="#" className="forgot-link">Forgot Password?</a>
          </div>

          <button type="submit" className="signin-button">Sign In</button>
        </form>
      </div>
  );
};

export default LoginPage;