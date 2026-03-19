import React, { useState, useMemo } from 'react';
import CalculatorCard from '../common/CalculatorCard';
import InputField from '../common/InputField';
import SliderInput from '../common/SliderInput';
import ResultDisplay from '../common/ResultDisplay';
import SimpleLineChart from '../common/SimpleLineChart';
import { formatCurrency } from '../../utils/formatters';

interface SalaryData {
  year: number;
  salary: number;
  // FIX: Added index signature to satisfy the data prop type of SimpleLineChart, which expects objects that can be indexed by a string key.
  [key: string]: number;
}

const SalaryGrowthCalculator: React.FC = () => {
  const [currentSalary, setCurrentSalary] = useState(1000000);
  const [growthRate, setGrowthRate] = useState(10);
  const [timePeriod, setTimePeriod] = useState(10);

  const { finalSalary, totalEarnings, chartData } = useMemo(() => {
    let cumulativeEarnings = 0;
    const data: SalaryData[] = [{ year: 0, salary: currentSalary }];
    let lastSalary = currentSalary;

    for (let i = 1; i <= timePeriod; i++) {
        cumulativeEarnings += lastSalary;
        lastSalary = lastSalary * (1 + growthRate / 100);
        data.push({ year: i, salary: lastSalary });
    }
    // Add the final year's salary to total earnings
    cumulativeEarnings += lastSalary;

    return {
      finalSalary: lastSalary,
      totalEarnings: cumulativeEarnings,
      chartData: data,
    };
  }, [currentSalary, growthRate, timePeriod]);

  return (
    <CalculatorCard title="Salary Growth">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <InputField
            label="Current Annual Salary"
            value={currentSalary}
            onChange={setCurrentSalary}
            prefix="₹"
          />
          <SliderInput
            label="Annual Growth Rate"
            value={growthRate}
            onChange={setGrowthRate}
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
        </div>
        <div className="space-y-6">
          <ResultDisplay
            results={[
              { label: `Salary after ${timePeriod} years`, value: finalSalary, isCurrency: true },
            ]}
            totalLabel="Total Earnings"
            totalValue={totalEarnings}
          />
        </div>
      </div>
      <SimpleLineChart
        data={chartData}
        dataKey="salary"
        dataName="Annual Salary"
        yAxisFormatter={(value) => `₹${Number(value) / 100000}L`}
      />
    </CalculatorCard>
  );
};

export default SalaryGrowthCalculator;