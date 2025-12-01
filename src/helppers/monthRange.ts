//formatando a data para string
const formatDate = (date: Date) => {
  return date.toISOString().slice(0, 10);
};

export const monythRange = () => {
  const date = new Date();
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();

  const startOfMonth = new Date(currentYear, currentMonth, 1);
  const endOfMonth = new Date(currentYear, currentMonth + 1, 0);

  return {
    startOfMonth: formatDate(startOfMonth),
    endOfMonth: formatDate(endOfMonth),
  };
};

export const getMonthsRangeOfYear = () => {
    const year = new Date().getFullYear();

    const months = [];

    for (let month = 0; month < 12; month++) {
        const start = new Date(year, month, 1, 0, 0, 0, 0);
        const end = new Date(year, month + 1, 0, 23, 59, 59, 999);

        months.push({
            month: month + 1,
            start: formatDate(start),
            end: formatDate(end),
        });
    }

    return months;
}