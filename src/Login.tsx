import React from 'react';

interface LoginProps {
  onBack: () => void;
}

const Login: React.FC<LoginProps> = ({ onBack }) => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <h1>ATM Simulation App</h1>
      </div>
      <h3>Login</h3>
      <form style={{ marginTop: '20px' }}>
        <div style={{ margin: '10px' }}>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" style={{ marginLeft: '10px' }} />
        </div>
        <div style={{ margin: '10px' }}>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" style={{ marginLeft: '10px' }} />
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
