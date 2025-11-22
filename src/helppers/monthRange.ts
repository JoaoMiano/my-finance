export const monythRange = () => {
    // Data atual
    const date = new Date();
    const currentMonth = date.getMonth(); // 0 a 11
    const currentYear = date.getFullYear();

    // Intervalo do mês atual
    const startOfMonth = new Date(currentYear, currentMonth, 1, 0, 0, 0, 0);
    const endOfMonth = new Date(currentYear, currentMonth + 1, 0, 23, 59, 59, 999);
    return { startOfMonth, endOfMonth };
}

export const getMonthsRangeOfYear = () => {
    const year = new Date().getFullYear();

    const months = [];

    for (let month = 0; month < 12; month++) {
        const start = new Date(year, month, 1, 0, 0, 0, 0);
        const end = new Date(year, month + 1, 0, 23, 59, 59, 999);

        months.push({
            month: month + 1,
            start,
            end,
        });
    }

    return months;
}