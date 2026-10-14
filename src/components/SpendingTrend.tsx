import React, { useState } from 'react';
import { useExpense } from '../context/ExpenseContext';

export const SpendingTrend: React.FC = () => {
  const { trendData } = useExpense();
  const [hoveredMonth, setHoveredMonth] = useState<string | null>(null);

  // Chart Dimensions
  const height = 210;
  const width = 500;
  const padding = { top: 20, right: 20, bottom: 35, left: 45 };

  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const maxVal = 26000;
  const yTicks = [
    { label: '₹25k', val: 25000 },
    { label: '₹20k', val: 20000 },
    { label: '₹15k', val: 15000 },
    { label: '₹10k', val: 10000 },
    { label: '₹5k', val: 5000 },
    { label: '0', val: 0 },
  ];

  // Bar calculations
  const groupWidth = chartW / trendData.length;
  const barWidth = 14;
  const gap = 4;

  // Generate line path for total spent
  const points = trendData.map((d, i) => {
    const x = padding.left + i * groupWidth + groupWidth / 2;
    const y = padding.top + chartH - (d.totalSpent / maxVal) * chartH;
    return { x, y, ...d };
  });

  const linePath = points.reduce((acc, curr, idx) => {
    return idx === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
  }, '');

  return (
    <div className="glass-card" style={{
      display: 'flex',
      flexDirection: 'column',
      height: '340px',
      padding: '20px 24px',
    }}>
      {/* Header & Legend */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '10px',
        flexWrap: 'wrap',
        gap: '10px',
      }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff' }}>
            Spending trend
          </h2>
          <p style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
            Last 6 months
          </p>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '12px', color: '#94a3b8' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#00f5a0' }} />
            <span>Income</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#38bdf8' }} />
            <span>Expense</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '14px', height: '2px', backgroundColor: '#ff7b25', borderRadius: '2px' }} />
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#ff7b25', marginLeft: '-10px' }} />
            <span>Total spent</span>
          </div>
        </div>
      </div>

      {/* SVG Chart */}
      <div style={{ flex: 1, position: 'relative', width: '100%', minHeight: 0 }}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          style={{ width: '100%', height: '100%', overflow: 'visible' }}
          preserveAspectRatio="none"
        >
          {/* Y-axis gridlines and labels */}
          {yTicks.map((tick) => {
            const yPos = padding.top + chartH - (tick.val / maxVal) * chartH;
            return (
              <g key={tick.label}>
                <line
                  x1={padding.left}
                  y1={yPos}
                  x2={width - padding.right}
                  y2={yPos}
                  stroke="rgba(255, 255, 255, 0.05)"
                  strokeDasharray={tick.val === 0 ? 'none' : '3 3'}
                />
                <text
                  x={padding.left - 10}
                  y={yPos + 4}
                  fill="#64748b"
                  fontSize="11"
                  textAnchor="end"
                  fontFamily="var(--font-sans)"
                >
                  {tick.label}
                </text>
              </g>
            );
          })}

          {/* Monthly Bars */}
          {trendData.map((d, i) => {
            const groupX = padding.left + i * groupWidth;
            const centerX = groupX + groupWidth / 2;

            const incomeH = (d.income / maxVal) * chartH;
            const expenseH = (d.expense / maxVal) * chartH;

            const incomeY = padding.top + chartH - incomeH;
            const expenseY = padding.top + chartH - expenseH;

            const isHovered = hoveredMonth === d.month;

            return (
              <g
                key={d.month}
                onMouseEnter={() => setHoveredMonth(d.month)}
                onMouseLeave={() => setHoveredMonth(null)}
                style={{ cursor: 'pointer' }}
              >
                {/* Background column highlight on hover */}
                {isHovered && (
                  <rect
                    x={groupX + 4}
                    y={padding.top}
                    width={groupWidth - 8}
                    height={chartH}
                    fill="rgba(255, 255, 255, 0.03)"
                    rx="6"
                  />
                )}

                {/* Income Bar (Green) */}
                <rect
                  x={centerX - barWidth - gap / 2}
                  y={incomeY}
                  width={barWidth}
                  height={incomeH}
                  rx="3"
                  fill="#00f5a0"
                  opacity={isHovered ? 1 : 0.9}
                  style={{ transition: 'opacity 0.2s' }}
                />

                {/* Expense Bar (Cyan / Blue) */}
                <rect
                  x={centerX + gap / 2}
                  y={expenseY}
                  width={barWidth}
                  height={expenseH}
                  rx="3"
                  fill="#38bdf8"
                  opacity={isHovered ? 1 : 0.9}
                  style={{ transition: 'opacity 0.2s' }}
                />

                {/* Month X-axis label */}
                <text
                  x={centerX}
                  y={height - 10}
                  fill={isHovered ? '#ffffff' : '#94a3b8'}
                  fontSize="12"
                  fontWeight={isHovered ? '600' : '400'}
                  textAnchor="middle"
                  fontFamily="var(--font-sans)"
                >
                  {d.label}
                </text>
              </g>
            );
          })}

          {/* Orange Total Spent Line */}
          <path
            d={linePath}
            fill="none"
            stroke="#ff7b25"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ filter: 'drop-shadow(0 0 6px rgba(255, 123, 37, 0.5))' }}
          />

          {/* Total Spent Nodes */}
          {points.map((p) => {
            const isHovered = hoveredMonth === p.month;
            return (
              <circle
                key={p.month}
                cx={p.x}
                cy={p.y}
                r={isHovered ? 6 : 4}
                fill="#ff7b25"
                stroke="#060911"
                strokeWidth="2"
                style={{
                  transition: 'r 0.15s ease',
                  cursor: 'pointer',
                  filter: 'drop-shadow(0 0 8px rgba(255, 123, 37, 0.8))',
                }}
              />
            );
          })}
        </svg>

        {/* Hover Tooltip */}
        {hoveredMonth && (
          (() => {
            const d = trendData.find((item) => item.month === hoveredMonth);
            if (!d) return null;
            return (
              <div style={{
                position: 'absolute',
                top: '10px',
                right: '15px',
                backgroundColor: '#0d1527',
                border: '1px solid rgba(56, 189, 248, 0.25)',
                borderRadius: '10px',
                padding: '8px 12px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
                fontSize: '11px',
                zIndex: 20,
              }}>
                <div style={{ fontWeight: 600, color: '#ffffff', marginBottom: '4px' }}>
                  {d.label} 2026
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', color: '#00f5a0' }}>
                  <span>Income:</span>
                  <b>₹{d.income.toLocaleString('en-IN')}</b>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', color: '#38bdf8' }}>
                  <span>Expense:</span>
                  <b>₹{d.expense.toLocaleString('en-IN')}</b>
                </div>
              </div>
            );
          })()
        )}
      </div>
    </div>
  );
};
