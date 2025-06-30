import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBalance } from './BalanceContext';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Paper, Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const DepositMoney = () => {
  const navigate = useNavigate();
  const { depositMoney, currentUser } = useBalance();
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleBackClick = () => {
    navigate('/');
  };

  const handleDeposit = () => {
    const amountToDeposit = parseFloat(amount);
    if (isNaN(amountToDeposit) || amountToDeposit <= 0) {
      setError('Please enter a valid positive amount.');
      return;
    }
    if (!currentUser) {
      setError('No user logged in.');
      return;
    }
    depositMoney(currentUser, amountToDeposit);
    setAmount('');
    setError('');
    navigate('/view-balance');
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
            Deposit Money
          </Typography>
          <Typography mb={2} align="center">Enter the amount you want to deposit:</Typography>
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
            <Button variant="contained" color="success" onClick={handleDeposit}>Deposit</Button>
            <Button variant="outlined" color="secondary" onClick={handleBackClick} className="back-button">Back</Button>
          </Box>
          {error && <Typography color="error" align="center" mt={2}>{error}</Typography>}
        </Paper>
      </motion.div>
    </Box>
  );
};

export default DepositMoney;
