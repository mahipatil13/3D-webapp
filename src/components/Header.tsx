import React, { useState } from 'react';
import { Bell, Calendar, ChevronDown, Plus } from 'lucide-react';
import { useExpense } from '../context/ExpenseContext';

const MONTH_OPTIONS = [
  { value: '2026-10', label: 'October 2026' },
  { value: '2026-09', label: 'September 2026' },
  { value: '2026-08', label: 'August 2026' },
  { value: '2026-07', label: 'July 2026' },
  { value: '2026-06', label: 'June 2026' },
  { value: '2026-05', label: 'May 2026' },
];

export const Header: React.FC = () => {
  const { currentMonth, setCurrentMonth, setIsAddModalOpen, setActiveTab } = useExpense();
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const selectedMonthLabel = MONTH_OPTIONS.find((m) => m.value === currentMonth)?.label || 'October 2026';

  return (
    <header style={{
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      padding: '28px 36px 20px 36px',
      position: 'relative',
      zIndex: 20,
      flexWrap: 'wrap',
      gap: '20px',
    }}>
      {/* Title & Greeting */}
      <div>
        <div style={{
          fontSize: '13px',
          fontWeight: 500,
          color: '#94a3b8',
          marginBottom: '4px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          Good morning, Mahesh <span>👋</span>
        </div>
        <h1 style={{
          fontSize: '36px',
          fontWeight: 700,
          color: '#ffffff',
          letterSpacing: '-0.02em',
          lineHeight: 1.15,
        }}>
          Your money,{' '}
          <span style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontWeight: 400,
            background: 'linear-gradient(135deg, #00f5a0 0%, #06b6d4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            paddingRight: '6px',
            textShadow: '0 0 30px rgba(0, 245, 160, 0.4)',
          }}>
            in motion.
          </span>
        </h1>
        <p style={{
          fontSize: '13px',
          color: '#64748b',
          marginTop: '6px',
          fontWeight: 400,
        }}>
          Track your spending, reach your goals, and build the life you want.
        </p>
      </div>

      {/* Header Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', position: 'relative' }}>
        {/* Notification Bell */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'rgba(20, 30, 52, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              color: '#94a3b8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              position: 'relative',
              transition: 'all 0.2s ease',
            }}
            title="Notifications"
          >
            <Bell size={18} />
            <span style={{
              position: 'absolute',
              top: '9px',
              right: '9px',
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-mint)',
              boxShadow: '0 0 6px var(--accent-mint)',
            }} />
          </button>

          {/* Quick Notification Popover */}
          {notificationsOpen && (
            <div style={{
              position: 'absolute',
              top: '48px',
              right: 0,
              width: '280px',
              backgroundColor: '#0d1527',
              border: '1px solid rgba(56, 189, 248, 0.2)',
              borderRadius: '14px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.7)',
              padding: '14px',
              zIndex: 100,
              animation: 'fadeIn 0.15s ease-out',
            }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#f8fafc', marginBottom: '8px' }}>
                Notifications
              </div>
              <div style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.4, padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                ✨ Great job! You are ₹7,550 under your monthly budget.
              </div>
              <div style={{ fontSize: '12px', color: '#64748b', padding: '6px 0 0 0' }}>
                💡 Tip: Review your dining expenses this week.
              </div>
            </div>
          )}
        </div>

        {/* User Mini Avatar */}
        <div
          onClick={() => setActiveTab('settings')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(20, 30, 52, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '4px 10px 4px 5px',
            borderRadius: '24px',
            cursor: 'pointer',
          }}
        >
          <img
            src="/avatar.jpg"
            alt="Mahesh Patil"
            style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
          />
          <span style={{ fontSize: '13px', fontWeight: 500, color: '#f8fafc' }}>Mahesh Patil</span>
          <ChevronDown size={14} color="#64748b" />
        </div>

        {/* Month Selector Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowMonthDropdown(!showMonthDropdown)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(16, 24, 44, 0.75)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              padding: '9px 14px',
              color: '#f8fafc',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'border-color 0.2s',
            }}
          >
            <Calendar size={15} color="#00f5a0" />
            <span>{selectedMonthLabel}</span>
            <ChevronDown size={14} color="#94a3b8" />
          </button>

          {showMonthDropdown && (
            <div style={{
              position: 'absolute',
              top: '46px',
              right: 0,
              minWidth: '180px',
              backgroundColor: '#0d1527',
              border: '1px solid rgba(56, 189, 248, 0.2)',
              borderRadius: '12px',
              boxShadow: '0 12px 36px rgba(0,0,0,0.7)',
              padding: '6px',
              zIndex: 100,
            }}>
              {MONTH_OPTIONS.map((m) => (
                <button
                  key={m.value}
                  onClick={() => {
                    setCurrentMonth(m.value);
                    setShowMonthDropdown(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: 'none',
                    background: currentMonth === m.value ? 'rgba(0, 245, 160, 0.15)' : 'transparent',
                    color: currentMonth === m.value ? '#00f5a0' : '#cbd5e1',
                    fontSize: '13px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>{m.label}</span>
                  {currentMonth === m.value && <span style={{ fontSize: '10px' }}>●</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Add Expense Button */}
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="btn-primary"
          style={{ padding: '9px 18px', fontSize: '13px', borderRadius: '12px' }}
        >
          <Plus size={16} strokeWidth={2.5} />
          <span>Add expense</span>
        </button>
      </div>
    </header>
  );
};
