import { useEffect, useState } from 'react'
import { formatterEuro, getNameMonth } from '../utils/utils'
import mockHistoricalResulst from '../mocks/historical-results.json'
import Loader from './Loader'

const HistoricalData = () => {
    const [results, setResults] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setResults(mockHistoricalResulst)
        setIsLoading(true)
    }, [])
    return (
        <>
        {
            isLoading 
            ?
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
            :
            <Loader/>
        }
        </>
    )
}

export default HistoricalData
