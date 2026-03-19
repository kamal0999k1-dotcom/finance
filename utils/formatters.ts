
export const formatCurrency = (value: number): string => {
  if (isNaN(value) || !isFinite(value)) {
    return '₹ 0';
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatNumber = (value: number): string => {
  if (isNaN(value) || !isFinite(value)) {
    return '0';
  }
    return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(value);
};
