import React, { useState } from 'react';
import { useBalance } from './BalanceContext';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Paper, Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

interface LoginProps {
  onBack: () => void;
  onLoginSuccess: (name: string) => void;
}

const Login: React.FC<LoginProps> = ({ onBack, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setCurrentUser } = useBalance();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('All fields are required');
      return;
    }
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
    setCurrentUser(username);
    onLoginSuccess(user.name);
  };

  return (
    <Box minHeight="70vh" display="flex" alignItems="center" justifyContent="center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{ width: '100%', maxWidth: 800 }}
      >
        <Paper elevation={8} sx={{ p: 5, backdropFilter: 'blur(16px)', boxShadow: 12 }}>
          <Typography variant="h4" fontWeight={700} mb={2} align="center">
            Login
          </Typography>
          {error && <Typography color="error" align="center">{error}</Typography>}
          <form style={{ marginTop: '20px' }} onSubmit={handleSubmit}>
            <Box mb={2}>
              <TextField
                label="Username"
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                variant="outlined"
                size="small"
                fullWidth
              />
            </Box>
            <Box mb={3}>
              <TextField
                label="Password"
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                variant="outlined"
                size="small"
                fullWidth
              />
            </Box>
            <Box display="flex" justifyContent="center" gap={2}>
              <Button variant="outlined" color="secondary" onClick={onBack} className="back-button">Back</Button>
              <Button variant="contained" color="primary" type="submit">Login</Button>
            </Box>
          </form>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default Login;
