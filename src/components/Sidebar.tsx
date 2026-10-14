import React from 'react';
import { Home, ArrowLeftRight, Target, BarChart2, Settings, ChevronRight } from 'lucide-react';
import { useExpense } from '../context/ExpenseContext';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab } = useExpense();

  const navItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
    { id: 'budgets', label: 'Budgets', icon: Target },
    { id: 'insights', label: 'Insights', icon: BarChart2 },
  ];

  return (
    <aside style={{
      width: '240px',
      minWidth: '240px',
      height: '100vh',
      position: 'sticky',
      top: 0,
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 16px',
      borderRight: '1px solid rgba(255, 255, 255, 0.05)',
      backgroundColor: 'rgba(7, 11, 20, 0.85)',
      backdropFilter: 'blur(20px)',
      zIndex: 40,
    }}>
      {/* Brand / Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0 8px 36px 8px' }}>
        <div style={{ position: 'relative', width: '30px', height: '30px' }}>
          {/* Mosaic circles icon */}
          <div style={{
            position: 'absolute', width: '13px', height: '13px', borderRadius: '50%',
            backgroundColor: '#00f5a0', top: 0, left: 0, boxShadow: '0 0 10px rgba(0,245,160,0.5)'
          }} />
          <div style={{
            position: 'absolute', width: '13px', height: '13px', borderRadius: '50%',
            backgroundColor: '#ff7b25', top: 0, right: 0, boxShadow: '0 0 10px rgba(255,123,37,0.5)'
          }} />
          <div style={{
            position: 'absolute', width: '13px', height: '13px', borderRadius: '50%',
            backgroundColor: '#3b82f6', bottom: 0, left: 0, boxShadow: '0 0 10px rgba(59,130,246,0.5)'
          }} />
          <div style={{
            position: 'absolute', width: '13px', height: '13px', borderRadius: '50%',
            backgroundColor: '#06b6d4', bottom: 0, right: 0, boxShadow: '0 0 10px rgba(6,182,212,0.5)'
          }} />
        </div>
        <span style={{
          fontSize: '19px',
          fontWeight: 800,
          letterSpacing: '0.12em',
          color: '#ffffff',
          fontFamily: 'var(--font-sans)',
        }}>
          MOSAIC
        </span>
      </div>

      {/* Navigation List */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '11px 14px',
                borderRadius: '12px',
                border: 'none',
                background: isActive ? 'rgba(23, 37, 62, 0.9)' : 'transparent',
                color: isActive ? '#ffffff' : '#94a3b8',
                fontWeight: isActive ? 600 : 500,
                fontSize: '14px',
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
                position: 'relative',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = '#94a3b8';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {isActive && (
                <div style={{
                  position: 'absolute',
                  left: 0,
                  top: '6px',
                  bottom: '6px',
                  width: '3.5px',
                  borderRadius: '0 4px 4px 0',
                  backgroundColor: 'var(--accent-mint)',
                  boxShadow: '0 0 10px var(--accent-mint)',
                }} />
              )}
              <Icon size={18} color={isActive ? 'var(--accent-mint)' : 'currentColor'} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Quote badge in middle */}
      <div style={{ marginTop: 'auto', padding: '0 12px 24px 12px' }}>
        <div style={{
          width: '24px',
          height: '2px',
          backgroundColor: 'var(--accent-mint)',
          marginBottom: '10px',
          borderRadius: '2px',
          boxShadow: '0 0 8px rgba(0, 245, 160, 0.6)',
        }} />
        <p style={{
          fontSize: '12px',
          lineHeight: '1.45',
          color: '#64748b',
          fontWeight: 500,
        }}>
          Small steps<br />build big freedom.
        </p>
      </div>

      {/* User profile card */}
      <div
        onClick={() => setActiveTab('settings')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '10px',
          borderRadius: '14px',
          backgroundColor: 'rgba(16, 24, 44, 0.65)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          cursor: 'pointer',
          marginBottom: '10px',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.3)';
          e.currentTarget.style.backgroundColor = 'rgba(23, 37, 62, 0.8)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
          e.currentTarget.style.backgroundColor = 'rgba(16, 24, 44, 0.65)';
        }}
      >
        <img
          src="/avatar.jpg"
          alt="Mahesh Patil"
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '1.5px solid rgba(0, 245, 160, 0.5)',
          }}
          onError={(e) => {
            // Fallback initials
            (e.currentTarget as HTMLElement).style.display = 'none';
          }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#f8fafc', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            Mahesh Patil
          </div>
          <div style={{ fontSize: '11px', color: '#64748b' }}>
            mahipatil13
          </div>
        </div>
        <ChevronRight size={15} color="#64748b" />
      </div>

      {/* Settings */}
      <button
        onClick={() => setActiveTab('settings')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '9px 12px',
          borderRadius: '10px',
          border: 'none',
          background: activeTab === 'settings' ? 'rgba(23, 37, 62, 0.8)' : 'transparent',
          color: activeTab === 'settings' ? '#ffffff' : '#94a3b8',
          fontSize: '13px',
          cursor: 'pointer',
          width: '100%',
        }}
      >
        <Settings size={16} />
        <span>Settings</span>
      </button>
    </aside>
  );
};
