import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useExpense } from '../context/ExpenseContext';
import { CategoryType, CATEGORY_CONFIG } from '../types';

export const DonutChart: React.FC = () => {
  const { categoryBreakdown, totalSpent, activeCategoryFilter, setActiveCategoryFilter } = useExpense();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // SVG Donut calculation
  const size = 190;
  const strokeWidth = 26;
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;

  // Compute SVG stroke-dasharray and stroke-dashoffset for segments
  let accumulatedAngle = 0;
  const segments = categoryBreakdown.map((item, index) => {
    const fraction = totalSpent > 0 ? item.amount / totalSpent : 0;
    const strokeDasharray = `${fraction * circumference} ${circumference}`;
    const strokeDashoffset = -accumulatedAngle * circumference;
    accumulatedAngle += fraction;

    const isSelected = activeCategoryFilter === item.category;
    const isHovered = hoveredIndex === index;

    return {
      ...item,
      strokeDasharray,
      strokeDashoffset,
      isSelected,
      isHovered,
    };
  });

  return (
    <div className="glass-card" style={{
      display: 'flex',
      flexDirection: 'column',
      height: '380px',
      padding: '20px 24px',
    }}>
      {/* Card Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16px',
      }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff' }}>
            Where it goes
          </h2>
          <p style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
            Category breakdown
          </p>
        </div>

        {/* Category Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(20, 30, 52, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '10px',
              padding: '6px 12px',
              color: activeCategoryFilter === 'All' ? '#cbd5e1' : '#00f5a0',
              fontSize: '12px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            <span>{activeCategoryFilter === 'All' ? 'All categories' : activeCategoryFilter}</span>
            <ChevronDown size={14} color="#64748b" />
          </button>

          {dropdownOpen && (
            <div style={{
              position: 'absolute',
              top: '36px',
              right: 0,
              width: '150px',
              backgroundColor: '#0d1527',
              border: '1px solid rgba(56, 189, 248, 0.2)',
              borderRadius: '10px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.8)',
              padding: '4px',
              zIndex: 50,
            }}>
              <button
                onClick={() => {
                  setActiveCategoryFilter('All');
                  setDropdownOpen(false);
                }}
                style={{
                  width: '100%',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  border: 'none',
                  background: activeCategoryFilter === 'All' ? 'rgba(0, 245, 160, 0.15)' : 'transparent',
                  color: activeCategoryFilter === 'All' ? '#00f5a0' : '#cbd5e1',
                  fontSize: '12px',
                  textAlign: 'left',
                  cursor: 'pointer',
                }}
              >
                All categories
              </button>
              {(['Food', 'Transport', 'Shopping', 'Bills', 'Other'] as CategoryType[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategoryFilter(cat);
                    setDropdownOpen(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '6px 10px',
                    borderRadius: '6px',
                    border: 'none',
                    background: activeCategoryFilter === cat ? 'rgba(0, 245, 160, 0.15)' : 'transparent',
                    color: activeCategoryFilter === cat ? '#00f5a0' : '#cbd5e1',
                    fontSize: '12px',
                    textAlign: 'left',
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
          )}
        </div>
      </div>

      {/* Chart and Legend Row */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px',
      }}>
        {/* SVG Donut */}
        <div style={{ position: 'relative', width: `${size}px`, height: `${size}px`, flexShrink: 0 }}>
          <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
            {/* Background ring */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="rgba(255, 255, 255, 0.04)"
              strokeWidth={strokeWidth}
            />
            {/* Donut Segments */}
            {segments.map((seg, i) => (
              <circle
                key={seg.category}
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke={seg.color}
                strokeWidth={seg.isSelected || seg.isHovered ? strokeWidth + 4 : strokeWidth}
                strokeDasharray={seg.strokeDasharray}
                strokeDashoffset={seg.strokeDashoffset}
                strokeLinecap="round"
                style={{
                  cursor: 'pointer',
                  transition: 'stroke-width 0.2s ease, opacity 0.2s ease',
                  opacity:
                    activeCategoryFilter !== 'All' && !seg.isSelected
                      ? 0.35
                      : 1,
                  filter: seg.isSelected || seg.isHovered ? `drop-shadow(0 0 8px ${seg.color})` : 'none',
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => {
                  setActiveCategoryFilter(activeCategoryFilter === seg.category ? 'All' : seg.category);
                }}
              />
            ))}
          </svg>

          {/* Center Text */}
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            textAlign: 'center',
          }}>
            <span style={{
              fontSize: '20px',
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '-0.02em',
            }}>
              ₹{totalSpent.toLocaleString('en-IN')}
            </span>
            <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 500, marginTop: '1px' }}>
              Total spent
            </span>
          </div>
        </div>

        {/* Legend List */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          justifyContent: 'center',
        }}>
          {categoryBreakdown.map((item, idx) => {
            const isSelected = activeCategoryFilter === item.category;
            const isHovered = hoveredIndex === idx;

            return (
              <div
                key={item.category}
                onClick={() => {
                  setActiveCategoryFilter(isSelected ? 'All' : item.category);
                }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '6px 10px',
                  borderRadius: '8px',
                  backgroundColor: isSelected
                    ? 'rgba(23, 37, 62, 0.9)'
                    : isHovered
                    ? 'rgba(255, 255, 255, 0.03)'
                    : 'transparent',
                  border: isSelected ? `1px solid ${item.color}50` : '1px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  opacity: activeCategoryFilter !== 'All' && !isSelected ? 0.4 : 1,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: item.color,
                    boxShadow: `0 0 6px ${item.color}`,
                    flexShrink: 0,
                  }} />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#f8fafc' }}>
                      {item.category}
                    </div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                      ₹{item.amount.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: '13px', fontWeight: 600, color: '#94a3b8' }}>
                  {item.percentage}%
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
