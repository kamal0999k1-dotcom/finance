export enum CalculatorType {
  SIP = 'SIP',
  LUMPSUM = 'Lumpsum',
  LOAN_EMI = 'Loan EMI',
  INFLATION = 'Inflation',
  RETIREMENT = 'Retirement Planner',
  SWP = 'SWP',
  SIP_SWP = 'SIP with SWP',
  STOCK_MARKET_SWP = 'Stock Market SWP',
  CAGR = 'CAGR',
  SALARY = 'Salary Growth',
  EMERGENCY_FUND = 'Emergency Fund',
  STOCK_GAIN_LOSS = 'Stock Gain/Loss',
}

export interface ChartData {
  name: string;
  value: number;
}

export interface LineChartData {
  year: number;
  invested: number;
  value: number;
}