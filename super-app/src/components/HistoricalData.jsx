import { useEffect, useState } from 'react';
import { getTotalAmountByCategory } from '../db/database';
import { set } from 'date-fns';
import { formatterEuro, getNameMonth } from '../utils/utils';

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
            <div className='table-historical'>
                <div className='header-table'>
                    <div>Mes</div>
                    <div>Super</div>
                    <div>Gasoil</div>
                    <div>Otros</div>
                    <div>Total</div>
                </div>
                <div className='table'>
                {results.map((result, index) => (
                    <div key={index}>
                        <div>{getNameMonth(result.Mes)} ( {result.Anno} )</div>
                        <div>{formatterEuro.format(result.Super)}</div>
                        <div>{formatterEuro.format(result.Gasoil)}</div>
                        <div>{formatterEuro.format(result.Otros)}</div>
                        <div>{formatterEuro.format(result.Total)}</div>
                    </div>
                ))}
                </div>
            </div>
            :
            <h1>No hay datos</h1>
        }
        </>
    )
}

export default HistoricalData