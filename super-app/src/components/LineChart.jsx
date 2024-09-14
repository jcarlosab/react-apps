import { Line } from 'react-chartjs-2'
import { getNameMonth } from '../utils/utils'

// eslint-disable-next-line react/prop-types
const LineChart = ({ monthData }) => {

    let labelsMonth = []
    let dataAmount = []
    monthData.data.forEach(element => {
        labelsMonth.push(getNameMonth(element.Month))
        dataAmount.push(element.Total)
    })

    const chartData = {
        labels: labelsMonth,
        // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
        datasets: [
            {
              label: 'Gastos',
              data: dataAmount,
              backgroundColor: [
                'rgba(255, 255, 255, 0.6)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
              ],
              borderWidth: 2,
            }
        ]
    }

    const chartOptions = {
        plugins: {
          title: {
            display: true,
            text: "Gráfica de gasto anual"
          }
        }
    }

    return (
        <div className="chart-container">
            <Line data={chartData} options={chartOptions} />
        </div>
    )
}

export default LineChart