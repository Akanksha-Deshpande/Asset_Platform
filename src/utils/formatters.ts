export const formatCurrency = (value: number) =>
  `£${value.toLocaleString()}`;

export const formatPercentage = (value: number) =>
  `${value.toFixed(1)}%`;