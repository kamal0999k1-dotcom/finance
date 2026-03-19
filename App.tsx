import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { CalculatorType } from './types';
import SipCalculator from './components/calculators/SipCalculator';
import LoanEmiCalculator from './components/calculators/LoanEmiCalculator';
import LumpsumCalculator from './components/calculators/LumpsumCalculator';
import InflationCalculator from './components/calculators/InflationCalculator';
import RetirementPlanner from './components/calculators/RetirementPlanner';
import SwpCalculator from './components/calculators/SwpCalculator';
import SipSwpCalculator from './components/calculators/SipSwpCalculator';
import StockMarketSwpCalculator from './components/calculators/StockMarketSwpCalculator';
import CagrCalculator from './components/calculators/CagrCalculator';
import SalaryGrowthCalculator from './components/calculators/SalaryGrowthCalculator';
import EmergencyFundCalculator from './components/calculators/EmergencyFundCalculator';
import StockGainLossCalculator from './components/calculators/StockGainLossCalculator';

const App: React.FC = () => {
  const [activeCalculator, setActiveCalculator] = useState<CalculatorType>(CalculatorType.SIP);

  const renderCalculator = () => {
    switch (activeCalculator) {
      case CalculatorType.SIP:
        return <SipCalculator />;
      case CalculatorType.LUMPSUM:
        return <LumpsumCalculator />;
      case CalculatorType.LOAN_EMI:
        return <LoanEmiCalculator />;
      case CalculatorType.INFLATION:
        return <InflationCalculator />;
      case CalculatorType.RETIREMENT:
        return <RetirementPlanner />;
      case CalculatorType.SWP:
        return <SwpCalculator />;
      case CalculatorType.SIP_SWP:
        return <SipSwpCalculator />;
      case CalculatorType.STOCK_MARKET_SWP:
        return <StockMarketSwpCalculator />;
      case CalculatorType.CAGR:
        return <CagrCalculator />;
      case CalculatorType.SALARY:
        return <SalaryGrowthCalculator />;
      case CalculatorType.EMERGENCY_FUND:
        return <EmergencyFundCalculator />;
      case CalculatorType.STOCK_GAIN_LOSS:
        return <StockGainLossCalculator />;
        
      default:
        return <SipCalculator />;
    }
  };

  return (
    <div className="flex min-h-screen font-sans">
      <Sidebar activeCalculator={activeCalculator} setActiveCalculator={setActiveCalculator} />
      <main className="flex-1 p-4 sm:p-6 md:p-10 bg-slate-100">
        <div className="w-full max-w-7xl mx-auto">
          {renderCalculator()}
        </div>
      </main>
    </div>
  );
};

export default App;