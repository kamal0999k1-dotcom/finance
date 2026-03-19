
import React from 'react';
import { formatCurrency } from '../../utils/formatters';

interface ResultDisplayProps {
  results: { label: string; value: string | number; isCurrency?: boolean }[];
  totalLabel: string;
  totalValue: number;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ results, totalLabel, totalValue }) => {
  return (
    <div className="bg-slate-50 rounded-lg p-6">
      <div className="space-y-4">
        {results.map((result, index) => (
          <div key={index} className="flex justify-between items-center text-slate-600">
            <span>{result.label}</span>
            <span className="font-semibold text-slate-800">
              {result.isCurrency && typeof result.value === 'number' ? formatCurrency(result.value) : result.value}
            </span>
          </div>
        ))}
        <div className="border-t border-slate-200 my-4"></div>
        <div className="flex justify-between items-center text-xl">
          <span className="font-bold text-slate-700">{totalLabel}</span>
          <span className="font-bold text-indigo-600">{formatCurrency(totalValue)}</span>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
