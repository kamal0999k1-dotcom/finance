
import React from 'react';
import { CalculatorType } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  TrendingUp, 
  Wallet, 
  CreditCard, 
  ArrowDownCircle, 
  Calendar, 
  PieChart, 
  RefreshCw, 
  BarChart3, 
  Percent, 
  Briefcase, 
  ShieldAlert, 
  ArrowUpRight,
  Calculator
} from 'lucide-react';

interface NavigationProps {
  activeCalculator: CalculatorType;
  setActiveCalculator: (calculator: CalculatorType) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

const calculatorOptions = Object.values(CalculatorType);

const iconMap: { [key in CalculatorType]: React.ReactNode } = {
  [CalculatorType.SIP]: <TrendingUp className="w-5 h-5" />,
  [CalculatorType.LUMPSUM]: <Wallet className="w-5 h-5" />,
  [CalculatorType.LOAN_EMI]: <CreditCard className="w-5 h-5" />,
  [CalculatorType.SWP]: <ArrowDownCircle className="w-5 h-5" />,
  [CalculatorType.INFLATION]: <Percent className="w-5 h-5" />,
  [CalculatorType.RETIREMENT]: <Calendar className="w-5 h-5" />,
  [CalculatorType.SIP_SWP]: <RefreshCw className="w-5 h-5" />,
  [CalculatorType.STOCK_MARKET_SWP]: <BarChart3 className="w-5 h-5" />,
  [CalculatorType.CAGR]: <PieChart className="w-5 h-5" />,
  [CalculatorType.SALARY]: <Briefcase className="w-5 h-5" />,
  [CalculatorType.EMERGENCY_FUND]: <ShieldAlert className="w-5 h-5" />,
  [CalculatorType.STOCK_GAIN_LOSS]: <ArrowUpRight className="w-5 h-5" />,
};

export const Navigation: React.FC<NavigationProps> = ({ 
  activeCalculator, 
  setActiveCalculator, 
  isMenuOpen, 
  setIsMenuOpen 
}) => {
  return (
    <>
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-1.5 rounded-lg">
            <Calculator className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-900 leading-none">FinCalcs Pro</h1>
            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">AARU Investment</p>
          </div>
        </div>
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors"
        >
          {isMenuOpen ? <X className="w-6 h-6 text-slate-600" /> : <Menu className="w-6 h-6 text-slate-600" />}
        </button>
      </header>

      {/* Drawer Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-30"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-4/5 max-w-[320px] bg-white z-40 shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-slate-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-indigo-600 p-2 rounded-xl">
                    <Calculator className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">Calculators</h2>
                </div>
                <p className="text-xs text-slate-500">Select a tool to start planning</p>
              </div>

              <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                {calculatorOptions.map((calc) => (
                  <button
                    key={calc}
                    onClick={() => setActiveCalculator(calc)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      activeCalculator === calc
                        ? 'bg-indigo-50 text-indigo-700 shadow-sm'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <div className={`${activeCalculator === calc ? 'text-indigo-600' : 'text-slate-400'}`}>
                      {iconMap[calc]}
                    </div>
                    <span>{calc}</span>
                    {activeCalculator === calc && (
                      <motion.div 
                        layoutId="active-indicator"
                        className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-600" 
                      />
                    )}
                  </button>
                ))}
              </nav>

              <div className="p-6 border-t border-slate-100 bg-slate-50">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center">
                  © AARU Investment Pvt.ltd
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Bottom Navigation (Quick Access) */}
      <div className="bg-white border-t border-slate-200 px-6 py-2 flex items-center justify-between fixed bottom-0 left-0 right-0 z-20">
        {[
          { type: CalculatorType.SIP, icon: <TrendingUp className="w-5 h-5" />, label: 'SIP' },
          { type: CalculatorType.LOAN_EMI, icon: <CreditCard className="w-5 h-5" />, label: 'Loan' },
          { type: CalculatorType.RETIREMENT, icon: <Calendar className="w-5 h-5" />, label: 'Retire' },
          { type: CalculatorType.STOCK_GAIN_LOSS, icon: <ArrowUpRight className="w-5 h-5" />, label: 'Stock' },
        ].map((item) => (
          <button
            key={item.type}
            onClick={() => setActiveCalculator(item.type)}
            className={`flex flex-col items-center gap-1 p-2 transition-colors ${
              activeCalculator === item.type ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {item.icon}
            <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
          </button>
        ))}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="flex flex-col items-center gap-1 p-2 text-slate-400 hover:text-slate-600"
        >
          <Menu className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">More</span>
        </button>
      </div>
    </>
  );
};
