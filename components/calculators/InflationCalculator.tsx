
import React, { useState, useMemo } from 'react';
import CalculatorCard from '../common/CalculatorCard';
import InputField from '../common/InputField';
import SliderInput from '../common/SliderInput';
import { calculateInflation } from '../../utils/financialCalculations';
import { formatCurrency } from '../../utils/formatters';

const InflationCalculator: React.FC = () => {
  const [currentValue, setCurrentValue] = useState(50000);
  const [inflationRate, setInflationRate] = useState(6);
  const [timePeriod, setTimePeriod] = useState(10);

  const futureValue = useMemo(() => {
    return calculateInflation(currentValue, inflationRate, timePeriod);
  }, [currentValue, inflationRate, timePeriod]);
  
  return (
    <CalculatorCard title="Inflation">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <InputField
            label="Today's Cost / Value"
            value={currentValue}
            onChange={setCurrentValue}
            prefix="₹"
          />
          <SliderInput
            label="Expected Inflation Rate (p.a.)"
            value={inflationRate}
            onChange={setInflationRate}
            min={1} max={20} step={0.5}
            suffix="%"
          />
          <SliderInput
            label="Time Period (Years)"
            value={timePeriod}
            onChange={setTimePeriod}
            min={1} max={50} step={1}
            suffix=" Yrs"
          />
        </div>
        <div className="text-center bg-slate-50 p-8 rounded-lg">
            <p className="text-lg text-slate-600">The value of {formatCurrency(currentValue)} today will be equivalent to</p>
            <p className="text-4xl md:text-5xl font-bold text-indigo-600 my-4">{formatCurrency(futureValue)}</p>
            <p className="text-lg text-slate-600">after {timePeriod} years with {inflationRate}% annual inflation.</p>
        </div>
      </div>
    </CalculatorCard>
  );
};

export default InflationCalculator;
