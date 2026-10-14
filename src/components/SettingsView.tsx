import React, { useState } from 'react';
import { ArrowLeft, RefreshCw, Check, User, Globe, Shield } from 'lucide-react';
import { useExpense } from '../context/ExpenseContext';

export const SettingsView: React.FC = () => {
  const { setActiveTab, resetToMockData } = useExpense();
  const [currency, setCurrency] = useState('INR');
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleReset = () => {
    resetToMockData();
    setResetSuccess(true);
    setTimeout(() => setResetSuccess(false), 2000);
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
            Settings & Preferences
          </h2>
          <p style={{ fontSize: '13px', color: '#64748b' }}>
            Manage your account currency and preferences
          </p>
        </div>
      </div>

      {/* Account Profile Card */}
      <div className="glass-card" style={{ padding: '24px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
          <img
            src="/avatar.jpg"
            alt="Mahesh Patil"
            style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #00f5a0' }}
          />
          <div>
            <div style={{ fontSize: '17px', fontWeight: 700, color: '#ffffff' }}>
              Mahesh Patil
            </div>
            <div style={{ fontSize: '13px', color: '#00f5a0' }}>
              mahipatil13 · Premium Pro Member
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>
              Account Holder
            </label>
            <input type="text" value="Mahesh Patil" readOnly className="input-field" style={{ opacity: 0.8 }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>
              Username
            </label>
            <input type="text" value="mahipatil13" readOnly className="input-field" style={{ opacity: 0.8 }} />
          </div>
        </div>
      </div>

      {/* Preferences Card */}
      <div className="glass-card" style={{ padding: '24px', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Globe size={18} color="#00f5a0" />
          <span>Currency & Regional</span>
        </h3>

        <div style={{ maxWidth: '300px' }}>
          <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>
            Base Currency
          </label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="input-field"
            style={{ colorScheme: 'dark' }}
          >
            <option value="INR">₹ Indian Rupee (INR)</option>
            <option value="USD">$ US Dollar (USD)</option>
            <option value="EUR">€ Euro (EUR)</option>
            <option value="GBP">£ British Pound (GBP)</option>
          </select>
        </div>
      </div>

      {/* Demo Reset Card */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Shield size={18} color="#38bdf8" />
          <span>Reference Data Synchronization</span>
        </h3>
        <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '16px', lineHeight: 1.5 }}>
          Restore the dashboard to the exact values and transactions shown in the reference design (₹12,450 spent, ₹20,000 budget, 38 transactions, October 2026).
        </p>
        <button
          onClick={handleReset}
          className="btn-secondary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          {resetSuccess ? (
            <>
              <Check size={16} color="#00f5a0" />
              <span style={{ color: '#00f5a0' }}>Restored Mock Data!</span>
            </>
          ) : (
            <>
              <RefreshCw size={16} />
              <span>Reset to Reference Mock Data</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
