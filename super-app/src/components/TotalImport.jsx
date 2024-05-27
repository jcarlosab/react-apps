import  { formatterEuro, getNameMonth } from '../utils/utils';

const TotalImport = ({ category, totalAmount }) => {
    const valor = category === 'market' ? totalAmount.market : category === 'fuel' ? totalAmount.fuel : category === 'others' ? totalAmount.others : 0;
    console.log(valor !== 0)
    return (
        valor === 0 ? null :
        <div className="total-import">
            <div>Total {getNameMonth()}</div>
            <div>{formatterEuro.format(valor)}</div>   
        </div>
    )
}

export default TotalImport