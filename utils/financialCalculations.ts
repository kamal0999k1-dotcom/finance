
export const calculateSIP = (monthlyInvestment: number, rate: number, years: number, inflationRate: number = 0) => {
  const realAnnualRate = (((1 + rate / 100) / (1 + inflationRate / 100)) - 1) * 100;
  const usedRate = inflationRate > 0 ? realAnnualRate : rate;
  const monthlyRate = usedRate / 12 / 100;
  const months = years * 12;

  if (monthlyRate === 0 && usedRate === 0) {
    return monthlyInvestment * months;
  }
   // A very small monthly rate can cause precision issues, treat as 0 growth if rate is negligible but not zero.
  if (Math.abs(monthlyRate) < 1e-9) {
    return monthlyInvestment * months;
  }

  const futureValue = monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
  return futureValue;
};

export const calculateLumpSum = (principal: number, rate: number, years: number, inflationRate: number = 0) => {
    const realAnnualRate = (((1 + rate / 100) / (1 + inflationRate / 100)) - 1) * 100;
    const usedRate = inflationRate > 0 ? realAnnualRate : rate;
    const yearlyRate = usedRate / 100;
    const futureValue = principal * Math.pow(1 + yearlyRate, years);
    return futureValue;
}

export const calculateEMI = (principal: number, rate: number, years: number) => {
  const monthlyRate = rate / 12 / 100;
  const months = years * 12;
  if (monthlyRate === 0) {
      return principal / months;
  }
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  return emi;
};

export const calculateInflation = (currentValue: number, rate: number, years: number) => {
    const inflationRate = rate / 100;
    const futureValue = currentValue * Math.pow(1 + inflationRate, years);
    return futureValue;
}

export const calculateSWP = (principal: number, monthlyWithdrawal: number, rate: number, inflationRate: number = 0) => {
    const realAnnualRate = (((1 + rate / 100) / (1 + inflationRate / 100)) - 1) * 100;
    const usedRate = inflationRate > 0 ? realAnnualRate : rate;
    const monthlyRate = usedRate / 12 / 100;

    if (monthlyWithdrawal <= principal * monthlyRate) {
        return Infinity; // The corpus will never deplete
    }
    
    // Formula to calculate number of periods (months) for an annuity
    const months = Math.log((monthlyWithdrawal) / (monthlyWithdrawal - principal * monthlyRate)) / Math.log(1 + monthlyRate);
    
    return months;
};

export const calculateCAGR = (initialValue: number, finalValue: number, years: number) => {
    if (initialValue <= 0 || finalValue < 0 || years <= 0) {
        return 0;
    }
    const cagr = (Math.pow(finalValue / initialValue, 1 / years) - 1) * 100;
    return cagr;
};