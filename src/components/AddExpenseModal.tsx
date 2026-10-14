import React, { useState } from 'react';
import { X, Plus, Check } from 'lucide-react';
import { useExpense } from '../context/ExpenseContext';
import { CategoryType, CATEGORY_CONFIG } from '../types';

export const AddExpenseModal: React.FC = () => {
  const { isAddModalOpen, setIsAddModalOpen, addExpense, currentMonth } = useExpense();

  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<CategoryType>('Food');
  const [date, setDate] = useState(() => {
    const today = new Date().toISOString().split('T')[0];
    return today.startsWith(currentMonth) ? today : `${currentMonth}-15`;
  });
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isAddModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    const numAmount = parseFloat(amount);
    if (!amount || isNaN(numAmount) || numAmount <= 0) {
      newErrors.amount = 'Please enter a valid amount greater than 0';
    }
    if (!description.trim()) {
      newErrors.description = 'Please enter a description (e.g. Grocery, Lunch)';
    }
    if (!date) {
      newErrors.date = 'Please select a date';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Add expense
    addExpense({
      amount: numAmount,
      description: description.trim(),
      category,
      date,
      paymentMethod,
    });

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setIsAddModalOpen(false);
      setAmount('');
      setDescription('');
      setCategory('Food');
    }, 600);
  };

  return (
    <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '24px 28px 18px 28px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        }}>
          <div>
            <h3 style={{ fontSize: '19px', fontWeight: 700, color: '#ffffff' }}>
              Add New Expense
            </h3>
            <p style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
              Track your daily spending with instant category updates
            </p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(false)}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#94a3b8',
              cursor: 'pointer',
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} style={{ padding: '24px 28px' }}>
          {/* Amount Field */}
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#cbd5e1', marginBottom: '8px' }}>
              Amount (₹) *
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '14px', top: '10px', fontSize: '16px', color: '#00f5a0', fontWeight: 600 }}>
                ₹
              </span>
              <input
                type="number"
                step="any"
                placeholder="420"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  if (errors.amount) setErrors((prev) => ({ ...prev, amount: '' }));
                }}
                className="input-field"
                style={{ paddingLeft: '32px', fontSize: '16px', fontWeight: 600 }}
                autoFocus
              />
            </div>
            {errors.amount && (
              <span style={{ fontSize: '11px', color: '#ef4444', marginTop: '4px', display: 'block' }}>
                {errors.amount}
              </span>
            )}
          </div>

          {/* Description Field */}
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#cbd5e1', marginBottom: '8px' }}>
              Description *
            </label>
            <input
              type="text"
              placeholder="e.g. Zomato, Uber, Grocery"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (errors.description) setErrors((prev) => ({ ...prev, description: '' }));
              }}
              className="input-field"
            />
            {errors.description && (
              <span style={{ fontSize: '11px', color: '#ef4444', marginTop: '4px', display: 'block' }}>
                {errors.description}
              </span>
            )}
          </div>

          {/* Category Selector */}
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#cbd5e1', marginBottom: '8px' }}>
              Category *
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {(['Food', 'Transport', 'Shopping', 'Bills', 'Other'] as CategoryType[]).map((cat) => {
                const isSelected = category === cat;
                const meta = CATEGORY_CONFIG[cat];
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      border: isSelected ? `1.5px solid ${meta.color}` : '1px solid rgba(255, 255, 255, 0.08)',
                      background: isSelected ? 'rgba(23, 37, 62, 0.9)' : 'rgba(12, 18, 34, 0.6)',
                      boxShadow: isSelected ? `0 0 12px ${meta.color}40` : 'none',
                      color: isSelected ? '#ffffff' : '#94a3b8',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: 600,
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <span style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: meta.color,
                      boxShadow: `0 0 6px ${meta.color}`,
                    }} />
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Date & Payment Method Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '24px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#cbd5e1', marginBottom: '8px' }}>
                Date *
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="input-field"
                style={{ colorScheme: 'dark' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#cbd5e1', marginBottom: '8px' }}>
                Payment Method
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="input-field"
                style={{ colorScheme: 'dark' }}
              >
                <option value="UPI">UPI</option>
                <option value="Card">Credit/Debit Card</option>
                <option value="NetBanking">NetBanking</option>
                <option value="Cash">Cash</option>
                <option value="Subscription">Subscription</option>
              </select>
            </div>
          </div>

          {/* Submit Action */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px' }}>
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="btn-secondary"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn-primary"
              style={{ minWidth: '130px' }}
            >
              {showSuccess ? (
                <>
                  <Check size={16} />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <Plus size={16} />
                  <span>Save Expense</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
