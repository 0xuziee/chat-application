import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import '../../styles/Auth.scss';

const SignUpPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(value.endsWith('@qlu.ai') ? null : 'Please provide a valid work email');
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    const isValid = /[A-Za-z]/.test(value) && /\d/.test(value);
    setPasswordError(isValid ? 'Password strength: Strong' : 'Password strength: Weak');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (emailError || passwordError === 'Password strength: Weak') {
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', { username, email, password });
      signIn(response.data.token);
      navigate('/dashboard');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Registration failed');
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Sign Up</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
          className={error?.includes('Username') ? 'input-error' : ''}
        />
        {error?.includes('Username') && <p className="error-message">Username already taken</p>}
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
          required
          className={emailError ? 'input-error' : ''}
        />
        {emailError && <p className="error-message">{emailError}</p>}
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
          required
          className={passwordError === 'Password strength: Weak' ? 'input-error' : ''}
        />
        {passwordError && <p className={passwordError === 'Password strength: Weak' ? 'error-message' : 'success-message'}>{passwordError}</p>}
        <button type="submit">Sign Up</button>
        <div className="divider">
          <span>or</span>
        </div>
        <Link to="/signin" className="second-btn">Already have an account? Login</Link>
        {error && !error.includes('Username') && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default SignUpPage;
