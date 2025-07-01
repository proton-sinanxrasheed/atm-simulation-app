import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBalance } from './BalanceContext';
import Button from '@mui/material/Button';
import { Paper, Box, Typography, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { motion } from 'framer-motion';
import type { SelectChangeEvent } from '@mui/material';

const PAGE_SIZE_OPTIONS = [5, 10, 20, 50, 100];

const TransactionHistory = () => {
  const navigate = useNavigate();
  const { getTransactionHistory } = useBalance();

  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({ key: 'date', direction: 'desc' });
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(PAGE_SIZE_OPTIONS[1]); // default 10

  const userTransactions = getTransactionHistory();

  // Filter by date range
  const filteredTransactions = userTransactions.filter(t => {
    const txDate = new Date(t.date);
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;
    if (from && txDate < from) return false;
    if (to && txDate > to) return false;
    return true;
  });

  // Sort
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    let aValue: any = a;
    let bValue: any = b;
    switch (sortConfig.key) {
      case 'type':
        aValue = a.type;
        bValue = b.type;
        break;
      case 'amount':
        aValue = a.amount;
        bValue = b.amount;
        break;
      case 'date':
        aValue = new Date(a.date).getTime();
        bValue = new Date(b.date).getTime();
        break;
      case 'time':
        aValue = new Date(a.date).getHours() * 60 + new Date(a.date).getMinutes();
        bValue = new Date(b.date).getHours() * 60 + new Date(b.date).getMinutes();
        break;
      case 'ampm':
        aValue = new Date(a.date).getHours() >= 12 ? 'PM' : 'AM';
        bValue = new Date(b.date).getHours() >= 12 ? 'PM' : 'AM';
        break;
      default:
        break;
    }
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage);
  const paginatedTransactions = sortedTransactions.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  // Get unique dates
  const uniqueDates = Array.from(new Set(userTransactions.map(t => new Date(t.date).toLocaleDateString())));
  const isDateSortable = uniqueDates.length > 1;

  // Get unique AM/PM values
  const uniqueAmPm = Array.from(new Set(userTransactions.map(t => (new Date(t.date).getHours() >= 12 ? 'PM' : 'AM'))));
  const isAmPmSortable = uniqueAmPm.length > 1;

  const handleSort = (key: string) => {
    setSortConfig(prev => {
      if (prev.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };

  const handleBackClick = () => {
    navigate('/');
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };

  const handleItemsPerPageChange = (event: SelectChangeEvent) => {
    setItemsPerPage(Number(event.target.value));
    setPage(1);
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
            Transaction History
          </Typography>
          {/* Date Range Filter */}
          <Box mb={3} display="flex" justifyContent="center" gap={2}>
            <TextField
              label="From Date"
              type="date"
              size="small"
              InputLabelProps={{ shrink: true }}
              value={fromDate}
              onChange={e => { setFromDate(e.target.value); setPage(1); }}
            />
            <TextField
              label="To Date"
              type="date"
              size="small"
              InputLabelProps={{ shrink: true }}
              value={toDate}
              onChange={e => { setToDate(e.target.value); setPage(1); }}
            />
          </Box>
          {sortedTransactions.length > 0 ? (
            <Box sx={{ overflowX: 'auto' }}>
              <table style={{ margin: '0 auto', borderCollapse: 'collapse', minWidth: '600px' }}>
                <thead>
                  <tr>
                    <th style={{ cursor: 'pointer', padding: '8px', borderBottom: '2px solid #333' }} onClick={() => handleSort('type')}>Type</th>
                    <th style={{ cursor: 'pointer', padding: '8px', borderBottom: '2px solid #333' }} onClick={() => handleSort('amount')}>Amount</th>
                    {isDateSortable ? (
                      <th style={{ cursor: 'pointer', padding: '8px', borderBottom: '2px solid #333' }} onClick={() => handleSort('date')}>Date</th>
                    ) : (
                      <th style={{ padding: '8px', borderBottom: '2px solid #333', color: '#888' }}>Date</th>
                    )}
                    <th style={{ cursor: 'pointer', padding: '8px', borderBottom: '2px solid #333' }} onClick={() => handleSort('time')}>Time</th>
                    {isAmPmSortable ? (
                      <th style={{ cursor: 'pointer', padding: '8px', borderBottom: '2px solid #333' }} onClick={() => handleSort('ampm')}>AM/PM</th>
                    ) : (
                      <th style={{ padding: '8px', borderBottom: '2px solid #333', color: '#888' }}>AM/PM</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {paginatedTransactions.map((transaction, index) => {
                    const dateObj = new Date(transaction.date);
                    const dateStr = dateObj.toLocaleDateString();
                    const timeStr = dateObj.toLocaleTimeString();
                    const ampm = dateObj.getHours() >= 12 ? 'PM' : 'AM';
                    return (
                      <tr key={index}>
                        <td style={{ padding: '8px', borderBottom: '1px solid #ccc' }}>{transaction.type === 'deposit' ? 'Deposited' : 'Withdrew'}</td>
                        <td style={{ padding: '8px', borderBottom: '1px solid #ccc' }}>${transaction.amount}</td>
                        <td style={{ padding: '8px', borderBottom: '1px solid #ccc' }}>{dateStr}</td>
                        <td style={{ padding: '8px', borderBottom: '1px solid #ccc' }}>{timeStr}</td>
                        <td style={{ padding: '8px', borderBottom: '1px solid #ccc' }}>{ampm}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Box>
          ) : (
            <Typography align="center" color="text.secondary">No transactions found.</Typography>
          )}
          {/* Pagination Controls */}
          <Box display="flex" justifyContent="center" alignItems="center" gap={2} mt={3}>
            {totalPages > 1 && (
              <>
                <Button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>Previous</Button>
                <Typography>{page} / {totalPages}</Typography>
                <Button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>Next</Button>
              </>
            )}
            <FormControl size="small" sx={{ minWidth: 120, ml: 2 }}>
              <InputLabel id="items-per-page-label">Rows per page</InputLabel>
              <Select
                labelId="items-per-page-label"
                value={itemsPerPage.toString()}
                label="Rows per page"
                onChange={handleItemsPerPageChange}
              >
                {PAGE_SIZE_OPTIONS.map(opt => (
                  <MenuItem key={opt} value={opt.toString()}>{opt}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box display="flex" justifyContent="center">
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleBackClick}
              className="back-button"
              style={{ margin: '10px' }}
            >
              Back
            </Button>
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default TransactionHistory;
