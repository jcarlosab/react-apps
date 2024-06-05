import { useEffect, useState } from 'react'
import { getTotalAmountByCategory } from '../db/database'
import { formatterEuro, getNameMonth } from '../utils/utils'

const HistoricalData = () => {
    const [results, setResults] = useState([])
    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getTotalAmountByCategory()
            setResults(data)
          } catch (error) {
            console.log(error)
          }
        }
        fetchData()
    }, [])
    return (
        <>
        {
            results.length > 0 
            ? 
            <div className='table'>
                <div className='table-row header'>
                    <div>Mes</div>
                    <div>Super</div>
                    <div>Gasoil</div>
                    <div>Otros</div>
                    <div>Total</div>
                </div>
                <div className='table-content'>
                    {results.map((result, index) => (
                        <div className='table-row' key={index}>
                            <div>{getNameMonth(result.Month)} ({result.Year})</div>
                            <div>{formatterEuro.format(result.Super)}</div>
                            <div>{formatterEuro.format(result.Gasoil)}</div>
                            <div>{formatterEuro.format(result.Otros)}</div>
                            <div className='import'>{formatterEuro.format(result.Total)}</div>
                        </div>
                    ))}
                </div>
            </div>
            :
            <div className='no-data'>No hay datos</div>
        }
        </>
    )
}

export default HistoricalData
