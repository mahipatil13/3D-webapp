import React, { useState } from 'react';
import { Target, Check, ArrowLeft, ShieldAlert } from 'lucide-react';
import { useExpense } from '../context/ExpenseContext';

export const BudgetsView: React.FC = () => {
  const { budget, setBudget, totalSpent, remainingBudget, percentUsed, setActiveTab } = useExpense();
  const [newBudgetStr, setNewBudgetStr] = useState(budget.toString());
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(newBudgetStr);
    if (!isNaN(val) && val > 0) {
      setBudget(val);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2000);
    }
  };

  return (
    <div style={{ padding: '0 36px 36px 36px', maxWidth: '800px' }}>
      {/* Top action row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
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
            Monthly Budget
          </h2>
          <p style={{ fontSize: '13px', color: '#64748b' }}>
            Configure your monthly spending goal and track your remaining runway
          </p>
        </div>
      </div>

      {/* Main Budget Card */}
      <div className="glass-card" style={{ padding: '28px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            backgroundColor: 'rgba(0, 245, 160, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(0, 245, 160, 0.3)',
          }}>
            <Target size={22} color="#00f5a0" />
          </div>
          <div>
            <div style={{ fontSize: '13px', color: '#94a3b8' }}>Current Monthly Target</div>
            <div style={{ fontSize: '32px', fontWeight: 800, color: '#ffffff' }}>
              ₹{budget.toLocaleString('en-IN')}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px' }}>
            <span style={{ color: '#94a3b8' }}>
              Used: <b style={{ color: '#ffffff' }}>₹{totalSpent.toLocaleString('en-IN')}</b> ({percentUsed}%)
            </span>
            <span style={{ color: remainingBudget >= 0 ? '#00f5a0' : '#ef4444' }}>
              Remaining: <b>₹{remainingBudget.toLocaleString('en-IN')}</b>
            </span>
          </div>
          <div style={{
            width: '100%',
            height: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '999px',
            overflow: 'hidden',
          }}>
            <div style={{
              width: `${Math.min(100, percentUsed)}%`,
              height: '100%',
              background: percentUsed > 90 ? 'linear-gradient(90deg, #ff7b25, #ef4444)' : 'linear-gradient(90deg, #00f5a0, #06b6d4)',
              borderRadius: '999px',
              transition: 'width 0.4s ease',
            }} />
          </div>
        </div>

        {/* Quick adjustments */}
        <form onSubmit={handleSave} style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#cbd5e1', marginBottom: '8px' }}>
            Update Budget Amount (₹)
          </label>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <span style={{ position: 'absolute', left: '14px', top: '10px', fontSize: '16px', color: '#00f5a0', fontWeight: 600 }}>
                ₹
              </span>
              <input
                type="number"
                value={newBudgetStr}
                onChange={(e) => setNewBudgetStr(e.target.value)}
                className="input-field"
                style={{ paddingLeft: '32px', fontSize: '16px', fontWeight: 600 }}
              />
            </div>
            <button type="submit" className="btn-primary" style={{ height: '42px' }}>
              {savedSuccess ? (
                <>
                  <Check size={16} />
                  <span>Saved!</span>
                </>
              ) : (
                <span>Update Budget</span>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Recommended tips */}
      <div className="glass-card" style={{ padding: '20px 24px', display: 'flex', gap: '16px', alignItems: 'center' }}>
        <ShieldAlert size={24} color="#00f5a0" style={{ flexShrink: 0 }} />
        <div style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.5 }}>
          <b>Budgeting Rule:</b> With ₹{remainingBudget.toLocaleString('en-IN')} remaining this month,
          your recommended safe daily spending limit is roughly{' '}
          <b style={{ color: '#ffffff' }}>₹{Math.max(0, Math.round(remainingBudget / 17)).toLocaleString('en-IN')}/day</b>.
        </div>
      </div>
    </div>
  );
};
