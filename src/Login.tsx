import React, { useState } from 'react';

interface LoginProps {
  onBack: () => void;
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onBack, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userData = localStorage.getItem(username);
    if (!userData) {
      setError('User not found');
      return;
    }
    const user = JSON.parse(userData);
    if (user.password !== password) {
      setError('Incorrect password');
      return;
    }
    onLoginSuccess();
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <h1>ATM Simulation App</h1>
      </div>
      <h3>Login</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form style={{ marginTop: '20px' }} onSubmit={handleSubmit}>
        <div style={{ margin: '10px' }}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ marginLeft: '10px' }}
          />
        </div>
        <div style={{ margin: '10px' }}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginLeft: '10px' }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <button onClick={onBack} style={{ margin: '10px', padding: '10px 20px', fontSize: '16px' }}>Back</button>
          <button type="submit" style={{ margin: '10px', padding: '10px 20px', fontSize: '16px' }}>Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
