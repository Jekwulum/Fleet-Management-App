export function generateMonthArray() {
  const months = [];
  const date = new Date();

  for (let i = 0; i < 12; i++) {
    date.setMonth(i);
    months.push(date.toLocaleString('default', { month: 'long' }));
  }

  return months;
}
