import { useEffect, useState } from 'react'
import { getTotalAmountByCategory } from '../db/database'
import { formatterEuro, getNameMonth, groupByYear } from '../utils/utils'
import Chart from 'chart.js/auto'
import { CategoryScale } from 'chart.js'
import Loader from './Loader'
import iconAdd from '../assets/add.svg'
import iconRemove from '../assets/remove.svg'
import LineChart from './LineChart'

const HistoricalData = () => {
    const [results, setResults] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0)
    Chart.register(CategoryScale);

    const handleClick = (index) => {
        setActiveIndex(activeIndex === index ? null : index)
    }

    useEffect(() => {
        const fetchData = async () => {
          try {
            setIsLoading(true)
            const data = await getTotalAmountByCategory()
            setResults(groupByYear(data))  
          } catch (error) {
            console.log(error)
          } finally {
            setIsLoading(false)
          }
        }
        fetchData()
    }, [])

    return (
        <>
        {
            isLoading 
            ?
            <Loader />
            :
            results.length > 0 
            ?
            <div className="accordion">
                {results.map((result, index) => (
                    <div key={index} className={"accordion-item " + (activeIndex === index ? 'active' : 'inactive')}>
                        <div className="accordion-header" onClick={() => handleClick(index)}>
                            <div className='bold-700'>{result.Year}</div>
                            <img src={activeIndex === index ? iconRemove : iconAdd} alt='icon action'/>
                        </div>
                        <div className="accordion-content">
                            <div className='table-historical'>
                                <div className='table-row header'>
                                    <div>Mes</div>
                                    <div>Super</div>
                                    <div>Gasoil</div>
                                    <div>Otros</div>
                                    <div>Total</div>
                                </div>
                                <div className='table-content'>
                                    {result.data.map((data, index) => (
                                        <div className='table-row' key={index}>
                                            <div>{getNameMonth(data.Month)}</div>
                                            <div>{formatterEuro.format(data.Super)}</div>
                                            <div>{formatterEuro.format(data.Gasoil)}</div>
                                            <div>{formatterEuro.format(data.Otros)}</div>
                                            <div className='import'>{formatterEuro.format(data.Total)}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <LineChart monthData={ result }/>
                        </div>
                    </div>
                ))}
                
            </div>
            :
            <div className='no-data'>No hay datos</div>    
        }
        </>
    )
}

export default HistoricalData
