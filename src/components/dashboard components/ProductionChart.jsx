
import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// ---- Custom Tooltip (plain JS) ----
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const first = payload[0];
    const raw = first?.payload;
    const originalDate = raw?.originalDate ?? raw?.date;

    return (
      <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3">
        <p className="text-sm font-medium text-slate-900">
          {originalDate
            ? new Date(originalDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })
            : ''}
        </p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
            {entry.name === 'Efficiency' ? '%' : 'h'}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function ProductionChart({ data }) {
  // Keep original date for tooltip
  const chartData = data.map((item) => ({
    ...item,
    originalDate: item.date,
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  }));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-1">Production Trends</h2>
        <p className="text-sm text-slate-500">Last 30 days performance overview</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorEfficiency" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorDowntime" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />

          <XAxis dataKey="date" stroke="#64748b" style={{ fontSize: '12px' }} />

          <YAxis
            stroke="#64748b"
            style={{ fontSize: '12px' }}
            yAxisId="left"
            label={{
              value: 'Efficiency (%)',
              angle: -90,
              position: 'insideLeft',
              offset: 10,
              style: { fontSize: '12px', fill: '#64748b' },
            }}
          />

          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#64748b"
            style={{ fontSize: '12px' }}
            label={{
              value: 'Downtime (h)',
              angle: 90,
              position: 'insideRight',
              offset: 10,
              style: { fontSize: '12px', fill: '#64748b' },
            }}
          />

          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="line" />

          <Area
            yAxisId="left"
            type="monotone"
            dataKey="efficiency"
            stroke="#3b82f6"
            strokeWidth={2}
            fill="url(#colorEfficiency)"
            name="Efficiency"
            isAnimationActive={true}
          />
          <Area
            yAxisId="right"
            type="monotone"
            dataKey="downtime"
            stroke="#f97316"
            strokeWidth={2}
            fill="url(#colorDowntime)"
            name="Downtime"
            isAnimationActive={true}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
