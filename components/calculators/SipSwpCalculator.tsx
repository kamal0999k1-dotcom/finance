
import React, { useState, useMemo } from 'react';
import CalculatorCard from '../common/CalculatorCard';
import InputField from '../common/InputField';
import SliderInput from '../common/SliderInput';
import Switch from '../common/Switch';
import { calculateSIP, calculateSWP } from '../../utils/financialCalculations';
import { formatCurrency } from '../../utils/formatters';

const SipSwpCalculator: React.FC = () => {
  // SIP phase state
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [investmentPeriod, setInvestmentPeriod] = useState(20);
  const [sipReturnRate, setSipReturnRate] = useState(12);

  // SWP phase state
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState(50000);
  const [swpReturnRate, setSwpReturnRate] = useState(7);

  // Inflation state
  const [isInflationAdjusted, setIsInflationAdjusted] = useState(false);
  const [inflationRate, setInflationRate] = useState(6);


  const { corpus, months } = useMemo(() => {
    const calculatedCorpus = calculateSIP(monthlyInvestment, sipReturnRate, investmentPeriod, isInflationAdjusted ? inflationRate : 0);
    const withdrawalMonths = calculateSWP(calculatedCorpus, monthlyWithdrawal, swpReturnRate, isInflationAdjusted ? inflationRate : 0);
    return { corpus: calculatedCorpus, months: withdrawalMonths };
  }, [monthlyInvestment, investmentPeriod, sipReturnRate, monthlyWithdrawal, swpReturnRate, isInflationAdjusted, inflationRate]);

  const displayResult = () => {
    if (months === Infinity) {
      return (
        <>
            <p className="text-3xl md:text-4xl font-bold text-green-600 my-2">Forever</p>
            <p className="text-md text-slate-600">Your withdrawals are less than your inflation-adjusted earnings. The corpus won't deplete.</p>
        </>
      );
    }
    if (isNaN(months) || months <= 0) {
        return (
            <>
                <p className="text-3xl md:text-4xl font-bold text-red-600 my-2">Depleted Immediately</p>
                <p className="text-md text-slate-600">Your monthly withdrawal is too high for the accumulated corpus.</p>
            </>
        );
    }
    const years = Math.floor(months / 12);
    const remainingMonths = Math.round(months % 12);
    return (
        <>
            <p className="text-3xl md:text-4xl font-bold text-indigo-600 my-2">
                {years} years & {remainingMonths} months
            </p>
            <p className="text-md text-slate-600">is how long your money will last.</p>
        </>
    );
  };

  return (
    <CalculatorCard title="SIP with SWP">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input section */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-700 border-b pb-2 mb-4">Investment Phase (SIP)</h3>
            <div className="space-y-4">
              <InputField
                label="Monthly Investment"
                value={monthlyInvestment}
                onChange={setMonthlyInvestment}
                prefix="₹"
              />
              <SliderInput
                label="Investment Period (Years)"
                value={investmentPeriod}
                onChange={setInvestmentPeriod}
                min={1} max={40} step={1}
                suffix=" Yrs"
              />
              <SliderInput
                label="Expected Return Rate (p.a.)"
                value={sipReturnRate}
                onChange={setSipReturnRate}
                min={1} max={30} step={0.5}
                suffix="%"
              />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-700 border-b pb-2 mb-4 mt-6">Withdrawal Phase (SWP)</h3>
            <div className="space-y-4">
               <InputField
                label="Monthly Withdrawal"
                value={monthlyWithdrawal}
                onChange={setMonthlyWithdrawal}
                prefix="₹"
              />
              <SliderInput
                label="Expected Return Rate (p.a.)"
                value={swpReturnRate}
                onChange={setSwpReturnRate}
                min={1} max={20} step={0.5}
                suffix="%"
              />
            </div>
          </div>
           <div className="pt-4 border-t">
                <Switch
                    label="Adjust for Inflation"
                    description="Applies inflation to both investment and withdrawal phases."
                    checked={isInflationAdjusted}
                    onChange={setIsInflationAdjusted}
                />
                {isInflationAdjusted && (
                    <div className="mt-4">
                        <SliderInput
                            label="Expected Inflation (p.a.)"
                            value={inflationRate}
                            onChange={setInflationRate}
                            min={1} max={15} step={0.5}
                            suffix="%"
                        />
                    </div>
                )}
           </div>
        </div>

        {/* Result section */}
        <div className="text-center bg-slate-50 p-8 rounded-lg h-full flex flex-col justify-center space-y-6">
            <div>
              <p className="text-lg text-slate-600">{isInflationAdjusted ? "Corpus in Today's Money" : "Corpus Accumulated"}</p>
              <p className="text-4xl md:text-5xl font-bold text-indigo-600 my-2">{formatCurrency(corpus)}</p>
            </div>
            <div className="border-t border-slate-200 w-3/4 mx-auto pt-6">
               <p className="text-lg text-slate-600">This corpus will last for</p>
               {displayResult()}
            </div>
        </div>
      </div>
    </CalculatorCard>
  );
};

export default SipSwpCalculator;
