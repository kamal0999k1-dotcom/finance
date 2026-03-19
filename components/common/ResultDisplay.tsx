
import React from 'react';
import { formatCurrency } from '../../utils/formatters';

interface ResultDisplayProps {
  results: { label: string; value: string | number; isCurrency?: boolean }[];
  totalLabel: string;
  totalValue: number;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ results, totalLabel, totalValue }) => {
  return (
    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
      <div className="space-y-3">
        {results.map((result, index) => (
          <div key={index} className="flex justify-between items-center text-xs text-slate-500">
            <span>{result.label}</span>
            <span className="font-bold text-slate-700">
              {result.isCurrency && typeof result.value === 'number' ? formatCurrency(result.value) : result.value}
            </span>
          </div>
        ))}
        <div className="border-t border-slate-200/50 pt-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{totalLabel}</span>
            <span className="text-lg font-black text-indigo-600">{formatCurrency(totalValue)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
