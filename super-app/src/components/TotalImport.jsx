import  { formatterEuro, getNameMonth } from '../utils/utils';

const TotalImport = ({ category, totalAmount }) => {
    const valor = category === 'market' ? totalAmount.market : category === 'fuel' ? totalAmount.fuel : category === 'others' ? totalAmount.others : 0;
    console.log(valor !== 0)
    return (
        valor === 0 ? null :
            <div className='total-import'>Gasto actual ({getNameMonth()}):  {formatterEuro.format(valor)}</div>   
        )
}

export default TotalImport