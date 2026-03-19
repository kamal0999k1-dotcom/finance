import React, { useState, useMemo } from 'react';
import CalculatorCard from '../common/CalculatorCard';
import InputField from '../common/InputField';
import { formatCurrency } from '../../utils/formatters';

const StockGainLossCalculator: React.FC = () => {
  const [buyPrice, setBuyPrice] = useState(100);
  const [sellPrice, setSellPrice] = useState(120);
  const [quantity, setQuantity] = useState(50);

  const { totalInvestment, totalSaleValue, profitOrLoss, returnPercentage } = useMemo(() => {
    const investment = buyPrice * quantity;
    const saleValue = sellPrice * quantity;
    const profit = saleValue - investment;
    const percentage = investment > 0 ? (profit / investment) * 100 : 0;
    
    return {
      totalInvestment: investment,
      totalSaleValue: saleValue,
      profitOrLoss: profit,
      returnPercentage: percentage,
    };
  }, [buyPrice, sellPrice, quantity]);

  const isProfit = profitOrLoss >= 0;

  return (
    <CalculatorCard title="Stock Gain/Loss">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          <InputField
            label="Buy Price (per share)"
            value={buyPrice}
            onChange={setBuyPrice}
            prefix="₹"
          />
          <InputField
            label="Sell Price (per share)"
            value={sellPrice}
            onChange={setSellPrice}
            prefix="₹"
          />
          <InputField
            label="Number of Shares"
            value={quantity}
            onChange={setQuantity}
          />
        </div>
        <div className="bg-slate-50 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-slate-800 text-center mb-4">Transaction Summary</h3>
            <div className="flex justify-between text-sm">
                <span className="text-slate-600">Total Investment</span>
                <span className="font-semibold text-slate-800">{formatCurrency(totalInvestment)}</span>
            </div>
            <div className="flex justify-between text-sm">
                <span className="text-slate-600">Total Sale Value</span>
                <span className="font-semibold text-slate-800">{formatCurrency(totalSaleValue)}</span>
            </div>
            <div className="border-t my-3"></div>
            <div className="text-center py-2">
                <p className="text-slate-600">{isProfit ? 'Total Profit' : 'Total Loss'}</p>
                <p className={`text-3xl font-bold my-1 ${isProfit ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(profitOrLoss)}
                </p>
                <p className={`text-lg font-semibold ${isProfit ? 'text-green-500' : 'text-red-500'}`}>
                   ({isProfit ? '+' : ''}{returnPercentage.toFixed(2)}%)
                </p>
            </div>
        </div>
      </div>
    </CalculatorCard>
  );
};

export default StockGainLossCalculator;