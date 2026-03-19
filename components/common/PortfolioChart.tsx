import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { formatCurrency } from '../../utils/formatters';

export interface PortfolioChartData {
  year: number;
  balance: number;
}

interface PortfolioChartProps {
  data: PortfolioChartData[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-lg">
        <p className="font-bold text-slate-700">{`Year ${label}`}</p>
        <p style={{ color: '#4f46e5' }}>{`Portfolio Balance: ${formatCurrency(payload[0].value)}`}</p>
      </div>
    );
  }
  return null;
};

const PortfolioChart: React.FC<PortfolioChartProps> = ({ data }) => {
  return (
    <div className="w-full h-80 bg-slate-50/50 p-4 rounded-lg mt-8">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, left: 30, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
          <XAxis dataKey="year" tick={{ fill: '#64748b' }} />
          <YAxis tickFormatter={(value) => `₹${Number(value) / 100000}L`} tick={{ fill: '#64748b' }} domain={['dataMin', 'dataMax']} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line type="monotone" dataKey="balance" name="Portfolio Balance" stroke="#4f46e5" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PortfolioChart;
