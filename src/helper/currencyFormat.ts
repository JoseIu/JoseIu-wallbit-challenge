export const currencyFormat = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
    // maximumSignificantDigits: 2,
  }).format(value);
};
