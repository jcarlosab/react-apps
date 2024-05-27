export const formatterEuro = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
});

export const getNameMonth = () => {
  const date = new Date();
  const month = date.getMonth();
  const nameMoths = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  return nameMoths[month];
};

// Get total amount of a category and month
export const getTotalCategory = (list, category) => {
    return list.reduce((acc, item) => {
      if (item.category === category) {
        return acc + parseFloat(item.amount);
      }
      return acc;
    }, 0);
}

export const getTotalMonth = (list) => {
  return list.reduce((acc, item) => acc + parseFloat(item.amount), 0);
}

export const getTotalYear = (list) => {
  return list.reduce((acc, item) => acc + item.amount, 0);
}

export const getPercentage = (total, amount) => {
  return (amount * 100) / total;
}

export const getPercentageColor = (percentage) => {
  if (percentage < 20) {
    return 'red';
  } else if (percentage < 50) {
    return 'orange';
  } else {
    return 'green';
  }
}
