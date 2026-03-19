
import React, { useState, useMemo } from 'react';
import CalculatorCard from '../common/CalculatorCard';
import SliderInput from '../common/SliderInput';
import InputField from '../common/InputField';
import { calculateInflation, calculateSIP } from '../../utils/financialCalculations';
import { formatCurrency, formatNumber } from '../../utils/formatters';

const RetirementPlanner: React.FC = () => {
    const [currentAge, setCurrentAge] = useState(30);
    const [retirementAge, setRetirementAge] = useState(60);
    const [monthlyExpenses, setMonthlyExpenses] = useState(50000);
    const [expectedInflation, setExpectedInflation] = useState(6);
    const [returnPreRetirement, setReturnPreRetirement] = useState(12);
    const [returnPostRetirement, setReturnPostRetirement] = useState(7);
    const [lifeExpectancy, setLifeExpectancy] = useState(85);

    const {
        yearsToRetire,
        monthlyExpensesAtRetirement,
        retirementCorpus,
        requiredSip,
        sipFutureValue,
        shortfall
    } = useMemo(() => {
        const ytr = retirementAge - currentAge > 0 ? retirementAge - currentAge : 0;

        const meatRetirement = calculateInflation(monthlyExpenses, expectedInflation, ytr);
        
        const yearsPostRetirement = lifeExpectancy - retirementAge;
        const ratePostRetirementMonthly = (returnPostRetirement / 100) / 12;
        const inflationMonthly = (expectedInflation / 100) / 12;
        // Real rate of return post-retirement
        const realRateMonthly = ((1 + ratePostRetirementMonthly) / (1 + inflationMonthly)) - 1;

        let corpus = 0;
        if(realRateMonthly > 0){
             corpus = (meatRetirement * 12 / realRateMonthly) * (1 - (1 / Math.pow(1 + realRateMonthly, yearsPostRetirement)));
        } else {
             corpus = meatRetirement * 12 * yearsPostRetirement; // Fallback for negative real return
        }
        
        // Now calculate required SIP to reach corpus
        const monthlyRatePre = returnPreRetirement / 12 / 100;
        const monthsPre = ytr * 12;

        let reqSip = 0;
        if (monthlyRatePre > 0) {
            reqSip = corpus / (((Math.pow(1 + monthlyRatePre, monthsPre) - 1) / monthlyRatePre) * (1 + monthlyRatePre));
        }

        const fvSip = calculateSIP(reqSip, returnPreRetirement, ytr);

        return {
            yearsToRetire: ytr,
            monthlyExpensesAtRetirement: meatRetirement,
            retirementCorpus: corpus,
            requiredSip: reqSip,
            sipFutureValue: fvSip,
            shortfall: corpus - fvSip,
        };

    }, [currentAge, retirementAge, monthlyExpenses, expectedInflation, returnPreRetirement, returnPostRetirement, lifeExpectancy]);

    return (
        <CalculatorCard title="Retirement Planner">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Inputs Column */}
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <h3 className="sm:col-span-2 text-lg font-semibold text-slate-700 border-b pb-2 mb-2">Personal & Financial Details</h3>
                    <SliderInput label="Current Age" value={currentAge} onChange={setCurrentAge} min={18} max={100} step={1} suffix=" Yrs" />
                    <SliderInput label="Retirement Age" value={retirementAge} onChange={setRetirementAge} min={currentAge + 1} max={100} step={1} suffix=" Yrs" />
                    <InputField label="Current Monthly Expenses" value={monthlyExpenses} onChange={setMonthlyExpenses} prefix="₹" />
                    <SliderInput label="Life Expectancy" value={lifeExpectancy} onChange={setLifeExpectancy} min={retirementAge + 1} max={100} step={1} suffix=" Yrs" />
                    
                    <h3 className="sm:col-span-2 text-lg font-semibold text-slate-700 border-b pb-2 mb-2 mt-4">Assumptions</h3>
                    <SliderInput label="Expected Inflation (p.a.)" value={expectedInflation} onChange={setExpectedInflation} min={1} max={15} step={0.5} suffix="%" />
                    <SliderInput label="Returns Pre-Retirement (p.a.)" value={returnPreRetirement} onChange={setReturnPreRetirement} min={1} max={25} step={0.5} suffix="%" />
                    <SliderInput label="Returns Post-Retirement (p.a.)" value={returnPostRetirement} onChange={setReturnPostRetirement} min={1} max={15} step={0.5} suffix="%" />
                </div>

                {/* Results Column */}
                <div className="bg-slate-50 rounded-lg p-6 space-y-4">
                    <h3 className="text-xl font-bold text-slate-800 text-center mb-4">Your Retirement Plan</h3>
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Years to Retire</span>
                        <span className="font-semibold text-slate-800">{formatNumber(yearsToRetire)} years</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Expenses at Retirement</span>
                        <span className="font-semibold text-slate-800">{formatCurrency(monthlyExpensesAtRetirement)}/month</span>
                    </div>
                    <div className="border-t my-3"></div>
                    <div className="text-center py-2">
                        <p className="text-slate-600">You will need a corpus of</p>
                        <p className="text-3xl font-bold text-indigo-600 my-1">{formatCurrency(retirementCorpus)}</p>
                    </div>
                     <div className="text-center py-2 bg-indigo-50 border border-indigo-200 rounded-lg">
                        <p className="text-slate-600">Required Monthly Investment (SIP)</p>
                        <p className="text-3xl font-bold text-indigo-700 my-1">{formatCurrency(requiredSip)}</p>
                    </div>
                </div>
            </div>
        </CalculatorCard>
    );
};

export default RetirementPlanner;
