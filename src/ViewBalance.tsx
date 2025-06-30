import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBalance } from './BalanceContext';
import Button from '@mui/material/Button';
import { Paper, Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const ViewBalance = () => {
  const navigate = useNavigate();
  const { balances, currentUser } = useBalance();

  const handleBackClick = () => {
    navigate('/');
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
            View Balance
          </Typography>
          {currentUser && (
            <Typography align="center" mb={3}>
              Your current balance is: <b>${balances[currentUser] || 0}</b>
            </Typography>
          )}
          <Box display="flex" justifyContent="center">
            <Button variant="outlined" color="secondary" onClick={handleBackClick} className="back-button" style={{ margin: '10px' }}>Back</Button>
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default ViewBalance;
