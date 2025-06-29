import React from 'react';

interface DashboardProps {
  onSignOut: () => void;
  name: string;
}

const Dashboard: React.FC<DashboardProps> = ({ onSignOut, name }) => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Dashboard</h1>
      <p>Hello {name}!</p>
      <p>Welcome to your dashboard!</p>
      <button onClick={onSignOut} style={{ margin: '10px', padding: '10px 20px', fontSize: '16px' }}>Sign Out</button>
    </div>
  );
};

export default Dashboard;
