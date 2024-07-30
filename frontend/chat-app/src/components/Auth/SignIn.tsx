import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from '../../hooks/useAuth';
import '../../styles/Auth.scss';

const SignInPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const validateEmail = (email: string): boolean => {
    return email.endsWith('@qlu.ai');
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setEmailError(null);
    setPasswordError(null);

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid) {
      setEmailError('Email must end with @qlu.ai');
    }

    if (!isPasswordValid) {
      setPasswordError('Password must be at least 6 characters long');
    }

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/signin', { email, password },{ withCredentials: true });
      console.log(response.data);
      localStorage.setItem('userId', response.data.userId.toString());
      signIn(response.data.token);
      
     navigate('/dashboard');
     window.location.reload();
      console.log('navigating to dashboard');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Sign in failed');
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Sign In</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className={emailError ? 'input-error' : ''}
        />
        {emailError && <p className="error-message">{emailError}</p>}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className={passwordError ? 'input-error' : ''}
        />
        {passwordError && <p className="error-message">{passwordError}</p>}
        <button type="submit">Sign In</button>
        <div className="divider">
          <span>or</span>
        </div>
        <Link to="/signup" className="second-btn">Create a new account</Link>
        {error && !emailError && !passwordError && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default SignInPage;
