
import React, { useState, useMemo } from 'react';
import CalculatorCard from '../common/CalculatorCard';
import InputField from '../common/InputField';
import SliderInput from '../common/SliderInput';
import ResultDisplay from '../common/ResultDisplay';
import InvestmentChart from '../common/InvestmentChart';
import Switch from '../common/Switch';
import { calculateLumpSum } from '../../utils/financialCalculations';
import type { LineChartData } from '../../types';

const LumpsumCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState(100000);
  const [returnRate, setReturnRate] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);
  const [isInflationAdjusted, setIsInflationAdjusted] = useState(false);
  const [inflationRate, setInflationRate] = useState(6);


  const { futureValue, totalGains } = useMemo(() => {
    const fv = calculateLumpSum(principal, returnRate, timePeriod, isInflationAdjusted ? inflationRate : 0);
    const nominalFv = calculateLumpSum(principal, returnRate, timePeriod, 0);
    const tg = nominalFv - principal;
    return { futureValue: fv, totalGains: tg };
  }, [principal, returnRate, timePeriod, isInflationAdjusted, inflationRate]);

  const chartData = useMemo<LineChartData[]>(() => {
    const data: LineChartData[] = [];
    for (let i = 1; i <= timePeriod; i++) {
        const value = calculateLumpSum(principal, returnRate, i, isInflationAdjusted ? inflationRate : 0);
      data.push({ year: i, invested: principal, value: value });
    }
    return data;
  }, [principal, returnRate, timePeriod, isInflationAdjusted, inflationRate]);
  
  return (
    <CalculatorCard title="Lumpsum">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <InputField
            label="Total Investment"
            value={principal}
            onChange={setPrincipal}
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
                    { label: 'Total Investment', value: principal, isCurrency: true },
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

export default LumpsumCalculator;
