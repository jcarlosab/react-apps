export const formatterEuro = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
})

const months = [
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
]

export const getAllMonths = () => {
  return months
}

export const getNameMonth = (month) => {
  const nameMoths = months
  return nameMoths[month]
}

export const groupByYear = (data) => {
  const groupedData = {};

  data.forEach(item => {
      const year = item.Year

      if (!groupedData[year]) {
          groupedData[year] = {
              Year: year,
              data: []
          };
      }

      const monthData = {
          Month: item.Month,
          Super: item.Super,
          Gasoil: item.Gasoil,
          Otros: item.Otros,
          Total: item.Total
      };

      groupedData[year].data.push(monthData)
  })

  return Object.values(groupedData)
}
