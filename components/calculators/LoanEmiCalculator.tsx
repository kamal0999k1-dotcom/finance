
import React, { useState, useMemo } from 'react';
import CalculatorCard from '../common/CalculatorCard';
import InputField from '../common/InputField';
import SliderInput from '../common/SliderInput';
import ResultDisplay from '../common/ResultDisplay';
import InvestmentChart from '../common/InvestmentChart';
import { calculateEMI } from '../../utils/financialCalculations';
import type { ChartData } from '../../types';

const LoanEmiCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState(1000000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);

  const { emi, totalPayable, totalInterest } = useMemo(() => {
    const calculatedEmi = calculateEMI(principal, rate, years);
    const total = calculatedEmi * years * 12;
    const interest = total - principal;
    return { emi: calculatedEmi, totalPayable: total, totalInterest: interest };
  }, [principal, rate, years]);
  
  const chartData = useMemo<ChartData[]>(() => {
    return [
      { name: 'Principal Amount', value: principal },
      { name: 'Total Interest', value: totalInterest },
    ];
  }, [principal, totalInterest]);

  return (
    <CalculatorCard title="Loan EMI">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <InputField
            label="Loan Amount"
            value={principal}
            onChange={setPrincipal}
            prefix="₹"
          />
          <SliderInput
            label="Interest Rate (p.a.)"
            value={rate}
            onChange={setRate}
            min={1} max={20} step={0.1}
            suffix="%"
          />
          <SliderInput
            label="Loan Tenure (Years)"
            value={years}
            onChange={setYears}
            min={1} max={30} step={1}
            suffix=" Yrs"
          />
        </div>
        <div>
          <ResultDisplay
            results={[
              { label: 'Principal Amount', value: principal, isCurrency: true },
              { label: 'Total Interest', value: totalInterest, isCurrency: true },
              { label: 'Total Payable', value: totalPayable, isCurrency: true },
            ]}
            totalLabel="Monthly EMI"
            totalValue={emi}
          />
        </div>
      </div>
      <InvestmentChart pieData={chartData} />
    </CalculatorCard>
  );
};

export default LoanEmiCalculator;
