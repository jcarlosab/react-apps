import  { formatterEuro, getNameMonth } from '../utils/utils';

const TotalImport = ({ category, listAmount }) => {
    const date = new Date()
    const month = date.getMonth()

    const totalAmount = listAmount.reduce((acc, item) => {
        if (item.categoria === category) {
            acc[category] += item.importe;
        }
        return acc;
    }, { market: 0, fuel: 0, others: 0 })

    const totalCategory = category === 'market' ? totalAmount.market : category === 'fuel' ? totalAmount.fuel : category === 'others' ? totalAmount.others : 0;
    return (
        totalCategory === 0 ? null :
        <div className='total-import'>Gasto en {getNameMonth(month)}:  {formatterEuro.format(totalCategory)}</div>   
    )
}

export default TotalImport