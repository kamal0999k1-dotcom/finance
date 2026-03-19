import React, { useState, useMemo } from 'react';
import CalculatorCard from '../common/CalculatorCard';
import InputField from '../common/InputField';
import SliderInput from '../common/SliderInput';
import InvestmentChart from '../common/InvestmentChart';
import { formatCurrency } from '../../utils/formatters';
import type { ChartData } from '../../types';

const EmergencyFundCalculator: React.FC = () => {
  const [monthlyExpenses, setMonthlyExpenses] = useState(50000);
  const [coverageMonths, setCoverageMonths] = useState(6);
  const [currentSavings, setCurrentSavings] = useState(100000);

  const { targetFund, pieData } = useMemo(() => {
    const target = monthlyExpenses * coverageMonths;
    const remaining = Math.max(0, target - currentSavings);
    const data: ChartData[] = [
      { name: 'Current Savings', value: currentSavings },
      { name: 'Amount Remaining', value: remaining },
    ];
    return { targetFund: target, pieData: data };
  }, [monthlyExpenses, coverageMonths, currentSavings]);

  const progress = targetFund > 0 ? (currentSavings / targetFund) * 100 : 100;

  return (
    <CalculatorCard title="Emergency Fund">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <InputField
            label="Monthly Essential Expenses"
            value={monthlyExpenses}
            onChange={setMonthlyExpenses}
            prefix="₹"
          />
          <SliderInput
            label="Months of Coverage"
            value={coverageMonths}
            onChange={setCoverageMonths}
            min={3} max={24} step={1}
            suffix=" Months"
          />
          <InputField
            label="Current Emergency Savings (Optional)"
            value={currentSavings}
            onChange={setCurrentSavings}
            prefix="₹"
          />
        </div>
        <div>
          <div className="bg-slate-50 rounded-lg p-6 text-center">
            <p className="text-lg text-slate-600">Recommended Emergency Fund</p>
            <p className="text-4xl font-bold text-indigo-600 my-2">{formatCurrency(targetFund)}</p>
            <p className="text-sm text-slate-500">
              To cover {coverageMonths} months of your essential expenses.
            </p>
            <div className="w-full bg-slate-200 rounded-full h-2.5 my-4">
              <div
                className="bg-green-500 h-2.5 rounded-full"
                style={{ width: `${Math.min(progress, 100)}%` }}
              ></div>
            </div>
            <p className="text-sm font-semibold text-slate-700">
                You are {progress.toFixed(0)}% of the way there!
            </p>
          </div>
        </div>
      </div>
      <InvestmentChart pieData={pieData} />
    </CalculatorCard>
  );
};

export default EmergencyFundCalculator;