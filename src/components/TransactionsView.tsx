import React, { useState } from 'react';
import { Search, Filter, Trash2, Plus, ArrowLeft } from 'lucide-react';
import { useExpense } from '../context/ExpenseContext';
import { CategoryType, CATEGORY_CONFIG } from '../types';

export const TransactionsView: React.FC = () => {
  const {
    currentMonthExpenses,
    searchQuery,
    setSearchQuery,
    activeCategoryFilter,
    setActiveCategoryFilter,
    deleteExpense,
    setIsAddModalOpen,
    setActiveTab,
  } = useExpense();

  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Filtered and sorted transactions
  const transactions = currentMonthExpenses
    .filter((tx) => {
      const matchCat = activeCategoryFilter === 'All' ? true : tx.category === activeCategoryFilter;
      const matchSearch =
        searchQuery.trim() === ''
          ? true
          : tx.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tx.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tx.amount.toString().includes(searchQuery);
      return matchCat && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'desc'
          ? b.date.localeCompare(a.date)
          : a.date.localeCompare(b.date);
      } else {
        return sortOrder === 'desc' ? b.amount - a.amount : a.amount - b.amount;
      }
    });

  const totalFiltered = transactions.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div style={{ padding: '0 36px 36px 36px' }}>
      {/* Top action row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '24px',
        flexWrap: 'wrap',
        gap: '16px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => setActiveTab('overview')}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '10px',
              padding: '8px 12px',
              color: '#94a3b8',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px',
            }}
          >
            <ArrowLeft size={16} />
            <span>Dashboard</span>
          </button>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#ffffff' }}>
              All Transactions
            </h2>
            <p style={{ fontSize: '13px', color: '#64748b' }}>
              Showing {transactions.length} transactions · Total: ₹{totalFiltered.toLocaleString('en-IN')}
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="btn-primary"
        >
          <Plus size={16} />
          <span>Add Expense</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card" style={{ padding: '16px 20px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          {/* Search Box */}
          <div style={{ flex: 1, minWidth: '220px', position: 'relative' }}>
            <Search size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '12px' }} />
            <input
              type="text"
              placeholder="Search by merchant, note, or amount..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field"
              style={{ paddingLeft: '36px' }}
            />
          </div>

          {/* Category Filter Chips */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setActiveCategoryFilter('All')}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: 'none',
                background: activeCategoryFilter === 'All' ? 'var(--accent-mint)' : 'rgba(255, 255, 255, 0.05)',
                color: activeCategoryFilter === 'All' ? '#060911' : '#94a3b8',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              All
            </button>
            {(['Food', 'Transport', 'Shopping', 'Bills', 'Other'] as CategoryType[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategoryFilter(cat)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '8px',
                  border: 'none',
                  background: activeCategoryFilter === cat ? CATEGORY_CONFIG[cat].color : 'rgba(255, 255, 255, 0.05)',
                  color: activeCategoryFilter === cat ? '#ffffff' : '#94a3b8',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: CATEGORY_CONFIG[cat].color }} />
                <span>{cat}</span>
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12px', color: '#64748b' }}>Sort:</span>
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [sb, so] = e.target.value.split('-') as [any, any];
                setSortBy(sb);
                setSortOrder(so);
              }}
              className="input-field"
              style={{ width: 'auto', padding: '6px 10px', fontSize: '12px' }}
            >
              <option value="date-desc">Newest Date</option>
              <option value="date-asc">Oldest Date</option>
              <option value="amount-desc">Highest Amount</option>
              <option value="amount-asc">Lowest Amount</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
              color: '#64748b',
              fontSize: '12px',
              textTransform: 'uppercase',
            }}>
              <th style={{ padding: '14px 20px' }}>Date</th>
              <th style={{ padding: '14px 20px' }}>Description</th>
              <th style={{ padding: '14px 20px' }}>Category</th>
              <th style={{ padding: '14px 20px' }}>Method</th>
              <th style={{ padding: '14px 20px', textAlign: 'right' }}>Amount</th>
              <th style={{ padding: '14px 20px', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '48px 0', color: '#64748b', fontSize: '14px' }}>
                  No matching transactions found.
                </td>
              </tr>
            ) : (
              transactions.map((tx) => (
                <tr
                  key={tx.id}
                  style={{
                    borderBottom: '1px solid rgba(255, 255, 255, 0.03)',
                    transition: 'background-color 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <td style={{ padding: '14px 20px', fontSize: '13px', color: '#94a3b8' }}>{tx.date}</td>
                  <td style={{ padding: '14px 20px', fontSize: '14px', fontWeight: 600, color: '#f8fafc' }}>
                    {tx.description}
                  </td>
                  <td style={{ padding: '14px 20px' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(255, 255, 255, 0.04)',
                      border: `1px solid ${CATEGORY_CONFIG[tx.category]?.color || '#94a3b8'}40`,
                      fontSize: '12px',
                      color: '#ffffff',
                    }}>
                      <span style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: CATEGORY_CONFIG[tx.category]?.color || '#94a3b8',
                      }} />
                      {tx.category}
                    </span>
                  </td>
                  <td style={{ padding: '14px 20px', fontSize: '13px', color: '#64748b' }}>
                    {tx.paymentMethod || 'UPI'}
                  </td>
                  <td style={{ padding: '14px 20px', fontSize: '14px', fontWeight: 700, color: '#ffffff', textAlign: 'right' }}>
                    - ₹{tx.amount.toLocaleString('en-IN')}
                  </td>
                  <td style={{ padding: '14px 20px', textAlign: 'center' }}>
                    <button
                      onClick={() => deleteExpense(tx.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#ef4444',
                        cursor: 'pointer',
                        padding: '6px',
                        borderRadius: '6px',
                      }}
                      title="Delete expense"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
