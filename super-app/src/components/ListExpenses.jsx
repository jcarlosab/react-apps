import  { formatterEuro } from '../utils/utils';
import iconDelete from '../assets/delete.svg';

const ListExpenses = ({listAmount, category, handleDeleteAmount}) => {
    return (
        listAmount.length === 0 || listAmount.find((item) => item.category === category) === undefined ? (
            <div className="no-data">No hay datos</div>
          ) : (
            <div className="list-expenses">
              <div className="expense">
                <div>Fecha</div>
                <div>Importe</div>
                <div></div>
              </div>
              {
              listAmount.map((result) => (
                result.category === category &&
                <div key={result.id} className="expense">
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
        )
    )
}

export default ListExpenses