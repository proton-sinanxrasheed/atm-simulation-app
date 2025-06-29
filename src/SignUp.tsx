import React, { useState } from 'react';

interface SignUpProps {
  onBack: () => void;
  onSignUpSuccess: (name: string) => void;
}

const SignUp: React.FC<SignUpProps> = ({ onBack, onSignUpSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !username || !password) {
      setError('All fields are required');
      return;
    }
    if (localStorage.getItem(username)) {
      setError('Username already exists');
      return;
    }
    const user = { username, password, name };
    localStorage.setItem(username, JSON.stringify(user));
    onSignUpSuccess(name);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <h1>ATM Simulation App</h1>
      </div>
      <h3>Sign Up</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form style={{ marginTop: '20px' }} onSubmit={handleSubmit}>
        <div style={{ margin: '10px' }}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ marginLeft: '10px' }}
            required
          />
        </div>
        <div style={{ margin: '10px' }}>
          <label htmlFor="username">Create Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ marginLeft: '10px' }}
            required
          />
        </div>
        <div style={{ margin: '10px' }}>
          <label htmlFor="password">Create Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginLeft: '10px' }}
            required
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <button onClick={onBack} style={{ margin: '10px', padding: '10px 20px', fontSize: '16px' }}>Back</button>
          <button type="submit" style={{ margin: '10px', padding: '10px 20px', fontSize: '16px' }}>Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
