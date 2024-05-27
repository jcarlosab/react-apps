import { loadFromLocalStorage } from '../utils/localStorage';
import { getNameMonth, getTotalCategory, getTotalMonth } from '../utils/utils';

const HistoricalData = () => {
    const data = loadFromLocalStorage('listAmount');
    console.log(data);
    return (
        <div className='table-historical'>
            <div className='header-table'>
                <div>Mes</div>
                <div>Super</div>
                <div>Gasoil</div>
                <div>Otros</div>
                <div>Total</div>
            </div>
            {
                <div className='table'>
                    <div>
                        <div>{getNameMonth()}</div>
                        <div>{getTotalCategory(data, 'market')}</div>
                        <div>{getTotalCategory(data, 'fuel')}</div>
                        <div>{getTotalCategory(data, 'others')}</div>
                        <div>{getTotalMonth(data)}</div>
                    </div>
                </div>
            }
            
        </div>
    )
}

export default HistoricalData