
import React from 'react';

interface CalculatorCardProps {
  title: string;
  children: React.ReactNode;
}

const CalculatorCard: React.FC<CalculatorCardProps> = ({ title, children }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="bg-slate-50 p-4 border-b border-slate-100">
        <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">{title}</h2>
        <p className="text-sm font-semibold text-indigo-600">AARU Investment Pvt.ltd</p>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

export default CalculatorCard;
