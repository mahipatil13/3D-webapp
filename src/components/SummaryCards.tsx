import React from 'react';
import { Wallet, Target, Sprout, FileText, ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { useExpense } from '../context/ExpenseContext';

export const SummaryCards: React.FC = () => {
  const { totalSpent, budget, remainingBudget, percentUsed, transactionCount } = useExpense();

  // Format currency in Indian standard format (₹)
  const formatCurrency = (val: number) => {
    return '₹' + Math.abs(val).toLocaleString('en-IN');
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
      gap: '20px',
      padding: '0 36px 24px 36px',
    }}>
      {/* 1. Total Spent */}
      <div className="glass-card" style={{ padding: '20px 22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            backgroundColor: 'rgba(0, 245, 160, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(0, 245, 160, 0.25)',
          }}>
            <Wallet size={18} color="#00f5a0" />
          </div>
          <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 500 }}>
            Total spent
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div style={{ fontSize: '28px', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em' }}>
            {formatCurrency(totalSpent)}
          </div>
          {/* Sparkline wave */}
          <svg width="74" height="28" viewBox="0 0 74 28" fill="none">
            <path
              d="M2 20C12 18 18 8 28 12C38 16 46 4 56 10C64 15 68 8 72 6"
              stroke="#00f5a0"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#00f5a0', fontWeight: 500 }}>
          <ArrowDownRight size={14} />
          <span>12% less than last month</span>
        </div>
      </div>

      {/* 2. Monthly Budget */}
      <div className="glass-card" style={{ padding: '20px 22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            backgroundColor: 'rgba(6, 182, 212, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(6, 182, 212, 0.25)',
          }}>
            <Target size={18} color="#06b6d4" />
          </div>
          <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 500 }}>
            Monthly budget
          </span>
        </div>

        <div style={{ fontSize: '28px', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: '12px' }}>
          {formatCurrency(budget)}
        </div>

        {/* Progress bar */}
        <div style={{
          width: '100%',
          height: '6px',
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '999px',
          overflow: 'hidden',
          marginBottom: '8px',
        }}>
          <div style={{
            width: `${Math.min(100, percentUsed)}%`,
            height: '100%',
            background: percentUsed > 90 ? 'linear-gradient(90deg, #ff7b25, #ef4444)' : 'linear-gradient(90deg, #00f5a0, #06b6d4)',
            borderRadius: '999px',
            boxShadow: '0 0 10px rgba(0, 245, 160, 0.5)',
            transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b' }}>
          <span>Set on 1 Oct 2026</span>
          <span style={{ color: '#94a3b8', fontWeight: 500 }}>{percentUsed}% used</span>
        </div>
      </div>

      {/* 3. Remaining */}
      <div className="glass-card" style={{ padding: '20px 22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            backgroundColor: 'rgba(16, 185, 129, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(16, 185, 129, 0.25)',
          }}>
            <Sprout size={18} color="#10b981" />
          </div>
          <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 500 }}>
            Remaining
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div style={{
            fontSize: '28px',
            fontWeight: 700,
            color: remainingBudget >= 0 ? '#ffffff' : '#f87171',
            letterSpacing: '-0.02em',
          }}>
            {formatCurrency(remainingBudget)}
          </div>
          {/* Sparkline wave */}
          <svg width="74" height="28" viewBox="0 0 74 28" fill="none">
            <path
              d="M2 14C12 18 20 22 30 16C40 10 48 24 58 14C66 6 70 8 72 4"
              stroke="#10b981"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#10b981', fontWeight: 500 }}>
          <ArrowUpRight size={14} />
          <span>{Math.max(0, 100 - percentUsed)}% left this month</span>
        </div>
      </div>

      {/* 4. Transactions */}
      <div className="glass-card" style={{ padding: '20px 22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            backgroundColor: 'rgba(59, 130, 246, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(59, 130, 246, 0.25)',
          }}>
            <FileText size={18} color="#3b82f6" />
          </div>
          <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 500 }}>
            Transactions
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div style={{ fontSize: '28px', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em' }}>
            {transactionCount}
          </div>
          {/* Sparkline wave */}
          <svg width="74" height="28" viewBox="0 0 74 28" fill="none">
            <path
              d="M2 22C14 20 22 10 32 16C42 22 50 8 60 12C68 15 70 6 72 4"
              stroke="#3b82f6"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#10b981', fontWeight: 500 }}>
          <ArrowUpRight size={14} />
          <span>8% more than last month</span>
        </div>
      </div>
    </div>
  );
};
