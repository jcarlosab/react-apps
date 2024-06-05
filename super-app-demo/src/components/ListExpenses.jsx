import  { formatterEuro } from '../utils/utils'
import iconDelete from '../assets/delete.svg'
import TotalImport from './TotalImport'

const ListExpenses = ({listAmount, category, handleDeleteAmount}) => {

    const filteredList = listAmount
      .filter((result) => result.category === category)
      .filter((result) => result.month === new Date().getMonth())
      .filter((result) => result.year === new Date().getFullYear())
      .reverse()

    return (
      filteredList.length === 0 ? (
            <div className="no-data">No hay datos</div>
          ) : (
            <div className="table">
              <div className="table-row header">
                <div>Fecha</div>
                <div>Importe</div>
                <div></div>
              </div>
              <div className='table-content'>
                {
                filteredList.map((result) => (
                    <div className='table-row' key={result.id}>
                      <div className="date">{result.fdate}</div>
                      <div className="import">{formatterEuro.format(result.amount)}</div>
                      <div>
                        <button
                            className="btn-delete"
                            onClick={() => handleDeleteAmount(result.id)}
                        >
                            <img src={iconDelete} alt='delete'/>
                        </button>
                      </div>
                    </div>
                ))}
                <TotalImport category={category} listAmount={listAmount} />
                </div>
            </div>
        )
    )
}

export default ListExpenses
