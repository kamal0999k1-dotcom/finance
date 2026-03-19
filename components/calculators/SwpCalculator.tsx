
import React, { useState, useMemo } from 'react';
import CalculatorCard from '../common/CalculatorCard';
import InputField from '../common/InputField';
import SliderInput from '../common/SliderInput';
import Switch from '../common/Switch';
import { calculateSWP } from '../../utils/financialCalculations';
import { formatCurrency } from '../../utils/formatters';

const SwpCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState(10000000); // 1 Crore
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState(50000);
  const [returnRate, setReturnRate] = useState(8);
  const [isInflationAdjusted, setIsInflationAdjusted] = useState(false);
  const [inflationRate, setInflationRate] = useState(6);

  const months = useMemo(() => {
    return calculateSWP(principal, monthlyWithdrawal, returnRate, isInflationAdjusted ? inflationRate : 0);
  }, [principal, monthlyWithdrawal, returnRate, isInflationAdjusted, inflationRate]);

  const displayResult = () => {
    if (months === Infinity) {
      return (
        <>
            <p className="text-4xl md:text-5xl font-bold text-green-600 my-4">Forever</p>
            <p className="text-lg text-slate-600">Your withdrawals are less than or equal to your inflation-adjusted earnings. The corpus will not deplete.</p>
        </>
      );
    }
    if (isNaN(months) || months <= 0) {
        return (
            <>
                <p className="text-4xl md:text-5xl font-bold text-red-600 my-4">Invalid</p>
                <p className="text-lg text-slate-600">Please check your inputs. Monthly withdrawal may be too high for the corpus to sustain.</p>
            </>
        );
    }
    const years = Math.floor(months / 12);
    const remainingMonths = Math.round(months % 12);
    return (
        <>
            <p className="text-4xl md:text-5xl font-bold text-indigo-600 my-4">
                {years} years & {remainingMonths} months
            </p>
            <p className="text-lg text-slate-600">Is how long your investment of {formatCurrency(principal)} will last.</p>
        </>
    );
  };
  
  return (
    <CalculatorCard title="SWP (Systematic Withdrawal Plan)">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          <InputField
            label="Total Investment"
            value={principal}
            onChange={setPrincipal}
            prefix="₹"
          />
           <InputField
            label="Monthly Withdrawal"
            value={monthlyWithdrawal}
            onChange={setMonthlyWithdrawal}
            prefix="₹"
          />
          <SliderInput
            label="Expected Return Rate (p.a.)"
            value={returnRate}
            onChange={setReturnRate}
            min={1} max={20} step={0.5}
            suffix="%"
          />
          <Switch
            label="Adjust for Inflation"
            description="Calculates corpus duration based on real returns."
            checked={isInflationAdjusted}
            onChange={setIsInflationAdjusted}
          />
          {isInflationAdjusted && (
                <SliderInput
                label="Expected Inflation (p.a.)"
                value={inflationRate}
                onChange={setInflationRate}
                min={1} max={15} step={0.5}
                suffix="%"
            />
          )}
        </div>
        <div className="text-center bg-slate-50 p-8 rounded-lg h-full flex flex-col justify-center">
            <p className="text-lg text-slate-600">Your money will last for</p>
            {displayResult()}
        </div>
      </div>
    </CalculatorCard>
  );
};

export default SwpCalculator;
