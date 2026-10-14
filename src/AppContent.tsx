import React from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { SummaryCards } from './components/SummaryCards';
import { SpendingOrbit } from './components/SpendingOrbit';
import { DonutChart } from './components/DonutChart';
import { SpendingTrend } from './components/SpendingTrend';
import { RecentTransactions } from './components/RecentTransactions';
import { AddExpenseModal } from './components/AddExpenseModal';
import { TransactionsView } from './components/TransactionsView';
import { BudgetsView } from './components/BudgetsView';
import { SettingsView } from './components/SettingsView';
import { useExpense } from './context/ExpenseContext';

export const AppContent: React.FC = () => {
  const { activeTab } = useExpense();

  return (
    <div className="app-container">
      {/* Ambient background light curves matching reference image */}
      <div className="ambient-glow-curve-1" />
      <div className="ambient-glow-curve-2" />

      {/* Futuristic neon curved sweep SVG in the background */}
      <svg
        style={{
          position: 'fixed',
          inset: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.6,
        }}
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M 120 -50 C 350 200, 700 80, 1100 -20 C 1300 -80, 1500 120, 1600 350"
          stroke="url(#neonCyanGrad)"
          strokeWidth="1.8"
          strokeOpacity="0.45"
        />
        <path
          d="M -100 650 C 150 450, 200 900, 500 850 C 750 810, 1100 950, 1450 720"
          stroke="url(#neonTealGrad)"
          strokeWidth="1.6"
          strokeOpacity="0.35"
        />
        <path
          d="M -80 300 C -10 420, 80 600, -20 820"
          stroke="url(#neonOrangeGrad)"
          strokeWidth="2.2"
          strokeOpacity="0.38"
        />
        <defs>
          <linearGradient id="neonCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f5a0" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#06b6d4" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="neonTealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#00f5a0" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="neonOrangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff7b25" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>

      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main style={{
        flex: 1,
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        zIndex: 10,
      }}>
        <Header />

        {/* Tab Router */}
        {activeTab === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingBottom: '36px' }}>
            {/* 4 Summary Cards */}
            <SummaryCards />

            {/* Middle Row: Spending Orbit 3D + Where it goes Donut */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1.25fr 1fr',
              gap: '20px',
              padding: '0 36px',
            }}>
              <SpendingOrbit />
              <DonutChart />
            </div>

            {/* Bottom Row: Spending Trend + Recent Transactions */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px',
              padding: '0 36px',
            }}>
              <SpendingTrend />
              <RecentTransactions />
            </div>

            {/* Subtle Footer matching reference */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 36px 0 36px',
              color: '#64748b',
              fontSize: '12px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--accent-mint)' }}>🌿</span>
                <span>Better choices. A brighter tomorrow.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent-mint)' }} />
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)' }} />
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)' }} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'transactions' && <TransactionsView />}

        {activeTab === 'budgets' && <BudgetsView />}

        {activeTab === 'insights' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '0 36px 36px 36px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#ffffff' }}>
              Financial Insights
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px' }}>
              <SpendingOrbit />
              <DonutChart />
            </div>
            <SpendingTrend />
          </div>
        )}

        {activeTab === 'settings' && <SettingsView />}
      </main>

      {/* Add Expense Modal */}
      <AddExpenseModal />
    </div>
  );
};
