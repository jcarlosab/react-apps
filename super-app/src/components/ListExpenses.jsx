import  { formatterEuro } from '../utils/utils';
import iconDelete from '../assets/delete.svg';

const ListExpenses = ({listAmount, category, handleDeleteAmount}) => {
    return (
        listAmount.length === 0 || listAmount.find((item) => item.category === category) === undefined ? (
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
                listAmount.map((result) => (
                    result.category === category &&
                    <div key={result.id}>
                    <div className="date">{result.date}</div>
                    <div className="import">{formatterEuro.format(result.amount)}</div>
                    <button
                        className="btn-delete"
                        onClick={() => handleDeleteAmount(result.id, result.amount, category)}
                    >
                        <img src={iconDelete} alt='delete'/>
                    </button>
                    </div>
                ))}
              </div>
            </div>
        )
    )
}

export default ListExpenses