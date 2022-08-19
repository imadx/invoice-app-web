export const getFormattedCurrency = (
  value: string | number,
  currency: "SGD" | "SGD",
): string => {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(+value);
};
