import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBalance } from './BalanceContext';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Paper, Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const WithdrawMoney = () => {
  const navigate = useNavigate();
  const { withdrawMoney, currentUser } = useBalance();
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleBackClick = () => {
    navigate('/');
  };

  const handleWithdraw = () => {
    const amountToWithdraw = parseFloat(amount);
    if (isNaN(amountToWithdraw) || amountToWithdraw <= 0) {
      setError('Please enter a valid positive amount.');
      return;
    }
    if (!currentUser) {
      setError('No user logged in.');
      return;
    }
    const success = withdrawMoney(currentUser, amountToWithdraw);
    if (success) {
      setAmount('');
      setError('');
      navigate('/view-balance');
    } else {
      setError('Insufficient funds.');
    }
  };

  return (
    <Box minHeight="70vh" display="flex" alignItems="center" justifyContent="center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        style={{ width: '100%', minWidth: 600, maxWidth: 1000 }}
      >
        <Paper elevation={8} sx={{ p: 5, minWidth: 600, maxWidth: 1000, backdropFilter: 'blur(16px)', boxShadow: 12 }}>
          <Typography variant="h4" fontWeight={700} mb={2} align="center">
            Withdraw Money
          </Typography>
          <Typography mb={2} align="center">Enter the amount you want to withdraw:</Typography>
          <Box mb={3}>
            <TextField
              label="Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              variant="outlined"
              size="small"
              fullWidth
            />
          </Box>
          <Box display="flex" justifyContent="center" gap={2}>
            <Button variant="contained" color="warning" onClick={handleWithdraw}>Withdraw</Button>
            <Button variant="outlined" color="secondary" onClick={handleBackClick} className="back-button">Back</Button>
          </Box>
          {error && <Typography color="error" align="center" mt={2}>{error}</Typography>}
        </Paper>
      </motion.div>
    </Box>
  );
};

export default WithdrawMoney;
