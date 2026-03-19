import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area } from 'recharts';
import { formatCurrency } from '../../utils/formatters';

interface SimpleLineChartProps {
  data: { year: number; [key: string]: number }[];
  dataKey: string;
  dataName: string;
  yAxisFormatter: (value: number | string) => string;
}

const CustomTooltip = ({ active, payload, label, dataName }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-lg">
        <p className="font-bold text-slate-700">{`Year ${label}`}</p>
        <p style={{ color: '#4f46e5' }}>{`${dataName}: ${formatCurrency(payload[0].value)}`}</p>
      </div>
    );
  }
  return null;
};

const SimpleLineChart: React.FC<SimpleLineChartProps> = ({ data, dataKey, dataName, yAxisFormatter }) => {
  return (
    <div className="w-full h-80 bg-slate-50/50 p-4 rounded-lg mt-8">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 20, left: 30, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
          <XAxis dataKey="year" tick={{ fill: '#64748b' }} />
          <YAxis tickFormatter={yAxisFormatter} tick={{ fill: '#64748b' }} />
          <Tooltip content={<CustomTooltip dataName={dataName} />} />
          <Legend />
          <Area type="monotone" dataKey={dataKey} name={dataName} stroke="#4f46e5" fill="#818cf8" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SimpleLineChart;