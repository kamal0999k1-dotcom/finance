
import React from 'react';
import { CalculatorType } from '../types';

interface SidebarProps {
  activeCalculator: CalculatorType;
  setActiveCalculator: (calculator: CalculatorType) => void;
}

const calculatorOptions = Object.values(CalculatorType);

// FIX: Changed JSX.Element to React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
const iconMap: { [key in CalculatorType]: React.ReactElement } = {
    [CalculatorType.SIP]: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />,
    [CalculatorType.LUMPSUM]: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.826-2.25-2.226-2.25-3.655v-.006c0-.85.34-1.636.938-2.226l.29-.289m0 0 l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 5.219 12.768 5 12 5c-.725 0-1.45-.22-2.003.659-1.106-.826-2.25-2.226-2.25-3.655v-.006c0-.85.34-1.636.938-2.226l.29-.289m-1.414-1.414l-1.414 1.414" />,
    [CalculatorType.LOAN_EMI]: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />,
    [CalculatorType.SWP]: <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25" />,
    [CalculatorType.INFLATION]: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.75A.75.75 0 013 4.5h.75m0 0h.75A.75.75 0 014.5 6v.75m0 0v.75A.75.75 0 013.75 8.25h-.75m0 0h.75a.75.75 0 01.75.75v.75m0 0v.75a.75.75 0 01-.75.75h-.75m-6-9v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.75A.75.75 0 013 6v.75m0 0v.75a.75.75 0 01-.75.75h-.75m2.25-3v.75c0 .414.336.75.75.75h.75M15 12v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.75a.75.75 0 01.75.75v.75m0 0v.75a.75.75 0 01-.75.75h-.75m-6-9v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.75A.75.75 0 019 6v.75m0 0v.75a.75.75 0 01-.75.75h-.75M1.5 12v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.75a.75.75 0 01.75.75v.75m0 0v.75a.75.75 0 01-.75.75H2.25m9-13.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.75a.75.75 0 01.75.75v.75m0 0v.75a.75.75 0 01-.75.75h-.75" />,
    [CalculatorType.RETIREMENT]: <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m-3-1l-3 1m-3-1l-3 1m9-3.273V21" />,
    [CalculatorType.SIP_SWP]: <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.667 0l3.181-3.183m-4.991-2.695v4.992h-4.992" />,
    [CalculatorType.STOCK_MARKET_SWP]: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181" />,
    [CalculatorType.CAGR]: <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V5.25A2.25 2.25 0 0 0 18 3H6A2.25 2.25 0 0 0 3.75 5.25v12.75A2.25 2.25 0 0 0 6 20.25Z" />,
    [CalculatorType.SALARY]: <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5ZM6 6.75h.75v.75H6v-.75Zm.75 2.25h-.75v.75h.75v-.75Zm-.75 2.25h.75v.75H6v-.75Zm.75 2.25h-.75V15h.75v-.75Zm-.75 2.25h.75v.75H6v-.75Z" />,
    [CalculatorType.EMERGENCY_FUND]: <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />,
    [CalculatorType.STOCK_GAIN_LOSS]: <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />,
};


export const Sidebar: React.FC<SidebarProps> = ({ activeCalculator, setActiveCalculator }) => {
  return (
    <aside className="w-64 bg-slate-800 text-slate-200 flex flex-col p-4">
      <div className="flex items-center gap-3 mb-10 px-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-indigo-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 3h.008v.008H8.25v-.008zm0 3h.008v.008H8.25v-.008zm3-6h.008v.008H11.25v-.008zm0 3h.008v.008H11.25v-.008zm0 3h.008v.008H11.25v-.008zm3-6h.008v.008H14.25v-.008zm0 3h.008v.008H14.25v-.008zm0 3h.008v.008H14.25v-.008zM4.5 21V5.25A2.25 2.25 0 016.75 3h10.5a2.25 2.25 0 012.25 2.25V21M4.5 21H19.5" />
        </svg>
        <div>
          <h1 className="text-xl font-bold text-indigo-400 leading-tight">AARU Investment Pvt.ltd</h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">FinCalcs Pro</p>
        </div>
      </div>
      <nav className="flex flex-col gap-2">
        {calculatorOptions.map((calc) => (
          <button
            key={calc}
            onClick={() => setActiveCalculator(calc)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-150 ${
              activeCalculator === calc
                ? 'bg-indigo-600 text-white'
                : 'text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                {iconMap[calc]}
            </svg>
            <span>{calc}</span>
          </button>
        ))}
      </nav>
      <div className="mt-auto text-center text-xs text-slate-500">
          <p>World-Class Financial Calculator</p>
          <p className="mt-1 text-slate-600 font-semibold">© AARU Investment Pvt.ltd</p>
      </div>
    </aside>
  );
};
