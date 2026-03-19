import React, { useState, useMemo } from 'react';
import CalculatorCard from '../common/CalculatorCard';
import InputField from '../common/InputField';
import SliderInput from '../common/SliderInput';
import { calculateCAGR } from '../../utils/financialCalculations';

const CagrCalculator: React.FC = () => {
  const [initialValue, setInitialValue] = useState(100000);
  const [finalValue, setFinalValue] = useState(500000);
  const [timePeriod, setTimePeriod] = useState(5);

  const cagr = useMemo(() => {
    return calculateCAGR(initialValue, finalValue, timePeriod);
  }, [initialValue, finalValue, timePeriod]);

  return (
    <CalculatorCard title="CAGR (Compound Annual Growth Rate)">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <InputField
            label="Initial Investment"
            value={initialValue}
            onChange={setInitialValue}
            prefix="₹"
          />
          <InputField
            label="Final Value"
            value={finalValue}
            onChange={setFinalValue}
            prefix="₹"
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
            <p className="text-lg text-slate-600">Your investment grew at an annualized rate of</p>
            <p className="text-4xl md:text-5xl font-bold text-indigo-600 my-4">
              {cagr.toFixed(2)}%
            </p>
             <p className="text-sm text-slate-500">This calculator shows the geometric mean return, which provides a smoothed-out view of the investment's performance.</p>
        </div>
      </div>
    </CalculatorCard>
  );
};

export default CagrCalculator;