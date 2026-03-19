
import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area } from 'recharts';
import type { ChartData, LineChartData } from '../../types';
import { formatCurrency } from '../../utils/formatters';

interface InvestmentChartProps {
  pieData?: ChartData[];
  lineData?: LineChartData[];
}

const COLORS = ['#4f46e5', '#818cf8']; // Indigo-600, Indigo-400

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    if(payload.length === 2){ // Line chart
        return (
          <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-lg">
            <p className="font-bold text-slate-700">{`Year ${label}`}</p>
            <p style={{ color: '#4f46e5' }}>{`Total Value: ${formatCurrency(payload[1].value)}`}</p>
            <p style={{ color: '#818cf8' }}>{`Invested: ${formatCurrency(payload[0].value)}`}</p>
          </div>
        );
    } else { // Pie Chart
        return (
            <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-lg">
                <p className="font-bold text-slate-700">{`${payload[0].name}: ${formatCurrency(payload[0].value)}`}</p>
            </div>
        );
    }
  }
  return null;
};


const InvestmentChart: React.FC<InvestmentChartProps> = ({ pieData, lineData }) => {
  return (
    <div className="w-full h-64 sm:h-80 bg-slate-50/50 p-2 sm:p-4 rounded-xl mt-6 border border-slate-100">
       <ResponsiveContainer width="100%" height="100%">
        {pieData ? (
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius="80%"
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
            >
              {pieData.map((_entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: '10px' }} />
          </PieChart>
        ) : lineData ? (
          <AreaChart data={lineData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" vertical={false} />
            <XAxis 
              dataKey="year" 
              tick={{ fill: '#64748b', fontSize: 10 }} 
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              tickFormatter={(value) => `₹${Number(value) >= 100000 ? (Number(value) / 100000).toFixed(1) + 'L' : (Number(value) / 1000).toFixed(0) + 'K'}`} 
              tick={{ fill: '#64748b', fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
            <Area type="monotone" dataKey="invested" stackId="1" stroke="#818cf8" fill="#c7d2fe" fillOpacity={0.6} />
            <Area type="monotone" dataKey="value" stackId="1" stroke="#4f46e5" fill="#818cf8" fillOpacity={0.8} />
          </AreaChart>
        ) : null}
      </ResponsiveContainer>
    </div>
  );
};

export default InvestmentChart;
