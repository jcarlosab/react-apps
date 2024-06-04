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
            <div className="table-expenses">
              <div className="header-table">
                <div>Fecha</div>
                <div>Importe</div>
                <div></div>
              </div>
              <div className="table">
                {
                filteredList.map((result) => (
                    <div key={result.id}>
                      <div className="date">{result.fdate}</div>
                      <div className="import">{formatterEuro.format(result.amount)}</div>
                      <button
                          className="btn-delete"
                          onClick={() => handleDeleteAmount(result.id)}
                      >
                          <img src={iconDelete} alt='delete'/>
                      </button>
                    </div>
                ))}
                <TotalImport category={category} listAmount={listAmount} />
              </div>
            </div>
        )
    )
}

export default ListExpenses
