export const calculatePercent = (total, percentOf) => {
  const hundredOfTotal = total / 100;
  return `${percentOf / hundredOfTotal}%`;
};
