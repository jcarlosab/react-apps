import { loadFromLocalStorage } from '../utils/localStorage';
import { getNameMonth, getTotalCategory, getTotalMonth } from '../utils/utils';

const HistoricalData = () => {
    const data = loadFromLocalStorage('listAmount');
    console.log(data);
    return (
        <div className='historical'>
            <div className='data-historical'>
                <div>Mes</div>
                <div>Super</div>
                <div>Gasoil</div>
                <div>Otros</div>
                <div>Total</div>
            </div>
            
            {
                <div className='data-historical'>
                    <div>{getNameMonth()}</div>
                    <div>{getTotalCategory(data, 'market')}</div>
                    <div>{getTotalCategory(data, 'fuel')}</div>
                    <div>{getTotalCategory(data, 'others')}</div>
                    <div>{getTotalMonth(data)}</div>
                </div>
            }
            
        </div>
    )
}

export default HistoricalData