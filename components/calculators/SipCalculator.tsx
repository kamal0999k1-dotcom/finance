
import React, { useState, useMemo } from 'react';
import CalculatorCard from '../common/CalculatorCard';
import InputField from '../common/InputField';
import SliderInput from '../common/SliderInput';
import ResultDisplay from '../common/ResultDisplay';
import InvestmentChart from '../common/InvestmentChart';
import Switch from '../common/Switch';
import { calculateSIP } from '../../utils/financialCalculations';
import type { LineChartData } from '../../types';

const SipCalculator: React.FC = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [returnRate, setReturnRate] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);
  const [isInflationAdjusted, setIsInflationAdjusted] = useState(false);
  const [inflationRate, setInflationRate] = useState(6);

  const { futureValue, totalInvestment, totalGains } = useMemo(() => {
    const fv = calculateSIP(monthlyInvestment, returnRate, timePeriod, isInflationAdjusted ? inflationRate : 0);
    const ti = monthlyInvestment * timePeriod * 12;
    // Gains calculation needs to be based on the nominal future value, not the inflation-adjusted one.
    const nominalFv = calculateSIP(monthlyInvestment, returnRate, timePeriod, 0);
    const tg = nominalFv - ti;
    return { futureValue: fv, totalInvestment: ti, totalGains: tg };
  }, [monthlyInvestment, returnRate, timePeriod, isInflationAdjusted, inflationRate]);

  const chartData = useMemo<LineChartData[]>(() => {
    const data: LineChartData[] = [];
    for (let i = 1; i <= timePeriod; i++) {
        const value = calculateSIP(monthlyInvestment, returnRate, i, isInflationAdjusted ? inflationRate : 0);
        const invested = monthlyInvestment * i * 12;
      data.push({ year: i, invested: invested, value: value });
    }
    return data;
  }, [monthlyInvestment, returnRate, timePeriod, isInflationAdjusted, inflationRate]);
  
  return (
    <CalculatorCard title="SIP (Systematic Investment Plan)">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <InputField
            label="Monthly Investment"
            value={monthlyInvestment}
            onChange={setMonthlyInvestment}
            prefix="₹"
          />
          <SliderInput
            label="Expected Return Rate (p.a.)"
            value={returnRate}
            onChange={setReturnRate}
            min={1} max={30} step={0.5}
            suffix="%"
          />
          <SliderInput
            label="Time Period (Years)"
            value={timePeriod}
            onChange={setTimePeriod}
            min={1} max={40} step={1}
            suffix=" Yrs"
          />
           <Switch
                label="Adjust for Inflation"
                description="Shows future value in today's money."
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
        <div className="space-y-6">
            <ResultDisplay
                results={[
                    { label: 'Total Investment', value: totalInvestment, isCurrency: true },
                    { label: 'Total Gains (Nominal)', value: totalGains, isCurrency: true },
                ]}
                totalLabel={isInflationAdjusted ? "Future Value (in Today's Money)" : "Future Value"}
                totalValue={futureValue}
            />
        </div>
      </div>
      <InvestmentChart lineData={chartData} />
    </CalculatorCard>
  );
};

export default SipCalculator;
