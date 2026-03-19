import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { CalculatorType } from './types';
import { motion, AnimatePresence } from 'motion/react';
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      {/* Navigation Header */}
      <Navigation 
        activeCalculator={activeCalculator} 
        setActiveCalculator={(calc) => {
          setActiveCalculator(calc);
          setIsMenuOpen(false);
        }}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative">
        <div className="max-w-2xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCalculator}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="p-4 pb-24"
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{activeCalculator}</h2>
                <p className="text-xs text-slate-500 mt-1">Plan your financial future with precision</p>
              </div>
              {renderCalculator()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default App;
