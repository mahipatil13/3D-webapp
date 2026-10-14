import React, { useState } from 'react';
import { ArrowRight, MoreVertical, Trash2, Edit2, ShoppingBag, Utensils, Car, Zap, Film, MoreHorizontal } from 'lucide-react';
import { useExpense } from '../context/ExpenseContext';
import { Expense, CategoryType } from '../types';

export const RecentTransactions: React.FC = () => {
  const { filteredTransactions, setActiveTab, deleteExpense } = useExpense();
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Take top 5 for the dashboard view
  const displayItems = filteredTransactions.slice(0, 5);

  const getCategoryIcon = (cat: CategoryType) => {
    switch (cat) {
      case 'Food':
        return <Utensils size={14} color="#ffffff" />;
      case 'Transport':
        return <Car size={14} color="#ffffff" />;
      case 'Shopping':
        return <ShoppingBag size={14} color="#ffffff" />;
      case 'Bills':
        return <Zap size={14} color="#ffffff" />;
      case 'Entertainment':
        return <Film size={14} color="#ffffff" />;
      default:
        return <MoreHorizontal size={14} color="#ffffff" />;
    }
  };

  const getCategoryColor = (cat: CategoryType) => {
    switch (cat) {
      case 'Food': return '#ff7b25';
      case 'Transport': return '#3b82f6';
      case 'Shopping': return '#00f5a0';
      case 'Bills': return '#eab308';
      case 'Entertainment': return '#ec4899';
      default: return '#a855f7';
    }
  };

  // Format date nicely e.g. "12 Oct 2026"
  const formatDate = (dateStr: string) => {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const day = parts[2];
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const month = monthNames[parseInt(parts[1], 10) - 1] || parts[1];
      const year = parts[0];
      return `${day} ${month} ${year}`;
    }
    return dateStr;
  };

  return (
    <div className="glass-card" style={{
      display: 'flex',
      flexDirection: 'column',
      height: '340px',
      padding: '20px 24px',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16px',
      }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff' }}>
          Recent transactions
        </h2>

        <button
          onClick={() => setActiveTab('transactions')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'none',
            border: 'none',
            color: '#94a3b8',
            fontSize: '13px',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#00f5a0')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
        >
          <span>View all</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Table Content */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <th style={{ padding: '0 8px 10px 0', fontWeight: 500 }}>Date</th>
              <th style={{ padding: '0 8px 10px 8px', fontWeight: 500 }}>Description</th>
              <th style={{ padding: '0 8px 10px 8px', fontWeight: 500 }}>Category</th>
              <th style={{ padding: '0 8px 10px 8px', fontWeight: 500, textAlign: 'right' }}>Amount</th>
              <th style={{ padding: '0 0 10px 8px', width: '30px' }}></th>
            </tr>
          </thead>
          <tbody>
            {displayItems.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '36px 0', color: '#64748b', fontSize: '13px' }}>
                  No transactions found for this selection.
                </td>
              </tr>
            ) : (
              displayItems.map((tx) => {
                const color = getCategoryColor(tx.category);
                const isMenuOpen = activeMenuId === tx.id;

                return (
                  <tr
                    key={tx.id}
                    style={{
                      borderBottom: '1px solid rgba(255, 255, 255, 0.03)',
                      transition: 'background-color 0.15s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    {/* Date */}
                    <td style={{ padding: '10px 8px 10px 0', fontSize: '12px', color: '#94a3b8', whiteSpace: 'nowrap' }}>
                      {formatDate(tx.date)}
                    </td>

                    {/* Description */}
                    <td style={{ padding: '10px 8px', fontSize: '13px', fontWeight: 500, color: '#f8fafc' }}>
                      {tx.description}
                    </td>

                    {/* Category with icon badge */}
                    <td style={{ padding: '10px 8px' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                          width: '22px',
                          height: '22px',
                          borderRadius: '6px',
                          backgroundColor: color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: `0 0 8px ${color}50`,
                        }}>
                          {getCategoryIcon(tx.category)}
                        </div>
                        <span style={{ fontSize: '12px', color: '#cbd5e1' }}>
                          {tx.category}
                        </span>
                      </div>
                    </td>

                    {/* Amount */}
                    <td style={{
                      padding: '10px 8px',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#ffffff',
                      textAlign: 'right',
                      whiteSpace: 'nowrap',
                    }}>
                      - ₹{tx.amount.toLocaleString('en-IN')}
                    </td>

                    {/* Action Menu */}
                    <td style={{ padding: '10px 0 10px 8px', textAlign: 'right', position: 'relative' }}>
                      <button
                        onClick={() => setActiveMenuId(isMenuOpen ? null : tx.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#64748b',
                          cursor: 'pointer',
                          padding: '4px',
                          borderRadius: '4px',
                        }}
                      >
                        <MoreVertical size={15} />
                      </button>

                      {isMenuOpen && (
                        <div style={{
                          position: 'absolute',
                          right: '0',
                          top: '32px',
                          backgroundColor: '#0d1527',
                          border: '1px solid rgba(56, 189, 248, 0.2)',
                          borderRadius: '8px',
                          boxShadow: '0 8px 24px rgba(0,0,0,0.8)',
                          zIndex: 50,
                          padding: '4px',
                          minWidth: '110px',
                        }}>
                          <button
                            onClick={() => {
                              deleteExpense(tx.id);
                              setActiveMenuId(null);
                            }}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              width: '100%',
                              padding: '6px 8px',
                              borderRadius: '4px',
                              border: 'none',
                              background: 'transparent',
                              color: '#ef4444',
                              fontSize: '12px',
                              cursor: 'pointer',
                              textAlign: 'left',
                            }}
                          >
                            <Trash2 size={13} />
                            <span>Delete</span>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
