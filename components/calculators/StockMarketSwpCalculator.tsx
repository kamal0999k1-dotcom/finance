import React, { useState, useMemo } from 'react';
import CalculatorCard from '../common/CalculatorCard';
import InputField from '../common/InputField';
import SliderInput from '../common/SliderInput';
import Switch from '../common/Switch';
import PortfolioChart, { PortfolioChartData } from '../common/PortfolioChart';
import { formatCurrency } from '../../utils/formatters';

const StockMarketSwpCalculator: React.FC = () => {
    const [principal, setPrincipal] = useState(10000000);
    const [withdrawalRate, setWithdrawalRate] = useState(4);
    const [portfolioReturn, setPortfolioReturn] = useState(10);
    const [investmentHorizon, setInvestmentHorizon] = useState(30);
    const [increaseWithInflation, setIncreaseWithInflation] = useState(true);
    const [inflationRate, setInflationRate] = useState(6);

    const { chartData, totalWithdrawn, finalBalance, depletedInYears } = useMemo(() => {
        let balance = principal;
        const annualWithdrawalInitial = principal * (withdrawalRate / 100);
        const data: PortfolioChartData[] = [{ year: 0, balance: balance }];
        let cumulativeWithdrawn = 0;
        let depletedYear = 0;

        for (let year = 1; year <= investmentHorizon; year++) {
            if (balance <= 0) {
                if (depletedYear === 0) depletedYear = year - 1;
                data.push({ year, balance: 0 });
                continue;
            }

            const currentYearWithdrawal = increaseWithInflation
                ? annualWithdrawalInitial * Math.pow(1 + inflationRate / 100, year - 1)
                : annualWithdrawalInitial;
            
            const withdrawalAmount = Math.min(balance, currentYearWithdrawal);
            balance -= withdrawalAmount;
            cumulativeWithdrawn += withdrawalAmount;
            
            const growth = balance * (portfolioReturn / 100);
            balance += growth;

            data.push({ year, balance: Math.max(0, balance) });

            if (balance <= 0 && depletedYear === 0) {
              depletedYear = year;
            }
        }

        return {
            chartData: data,
            totalWithdrawn: cumulativeWithdrawn,
            finalBalance: balance > 0 ? balance : 0,
            depletedInYears: depletedYear,
        };
    }, [principal, withdrawalRate, portfolioReturn, investmentHorizon, increaseWithInflation, inflationRate]);
    
    const initialMonthlyWithdrawal = principal * (withdrawalRate / 100) / 12;

    const renderResult = () => {
      if (depletedInYears > 0 && depletedInYears < investmentHorizon) {
        return (
          <>
            <p className="text-lg text-slate-600">Your portfolio is projected to be depleted in</p>
            <p className="text-4xl md:text-5xl font-bold text-amber-600 my-2">{depletedInYears} years</p>
            <p className="text-slate-500 text-sm">Consider reducing your withdrawal rate or seeking higher returns.</p>
          </>
        )
      }
      return (
        <>
          <p className="text-lg text-slate-600">After {investmentHorizon} years, your portfolio is projected to have a final balance of</p>
          <p className="text-4xl md:text-5xl font-bold text-green-600 my-2">{formatCurrency(finalBalance)}</p>
        </>
      )
    }

    return (
        <CalculatorCard title="Stock Market SWP (Safe Withdrawal)">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <InputField
                        label="Total Investment (Corpus)"
                        value={principal}
                        onChange={setPrincipal}
                        prefix="₹"
                    />
                    <SliderInput
                        label="Initial Withdrawal Rate (p.a.)"
                        value={withdrawalRate}
                        onChange={setWithdrawalRate}
                        min={1} max={10} step={0.1}
                        suffix="%"
                    />
                    <SliderInput
                        label="Expected Portfolio Return (p.a.)"
                        value={portfolioReturn}
                        onChange={setPortfolioReturn}
                        min={1} max={25} step={0.5}
                        suffix="%"
                    />
                    <SliderInput
                        label="Investment Horizon (Years)"
                        value={investmentHorizon}
                        onChange={setInvestmentHorizon}
                        min={1} max={50} step={1}
                        suffix=" Yrs"
                    />
                    <Switch
                        label="Increase Withdrawals with Inflation"
                        description="Annual withdrawal amount increases to keep pace with inflation."
                        checked={increaseWithInflation}
                        onChange={setIncreaseWithInflation}
                    />
                    {increaseWithInflation && (
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
                    <div className="bg-slate-50 rounded-lg p-6">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-slate-600">
                                <span>Initial Monthly Withdrawal</span>
                                <span className="font-semibold text-slate-800">{formatCurrency(initialMonthlyWithdrawal)}</span>
                            </div>
                            <div className="flex justify-between items-center text-slate-600">
                                <span>Total Withdrawn ({investmentHorizon} yrs)</span>
                                <span className="font-semibold text-slate-800">{formatCurrency(totalWithdrawn)}</span>
                            </div>
                            <div className="border-t border-slate-200 my-4"></div>
                            <div className="text-center">
                                {renderResult()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <PortfolioChart data={chartData} />
        </CalculatorCard>
    );
};

export default StockMarketSwpCalculator;
