
import React from 'react';

interface CalculatorCardProps {
  title: string;
  children: React.ReactNode;
}

const CalculatorCard: React.FC<CalculatorCardProps> = ({ title, children }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-slate-50 p-5 border-b border-slate-200">
        <h1 className="text-3xl font-extrabold text-indigo-600 mb-1">AARU Investment Pvt.ltd</h1>
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider">{title} Calculator</h2>
      </div>
      <div className="p-5 md:p-8">
        {children}
      </div>
    </div>
  );
};

export default CalculatorCard;
