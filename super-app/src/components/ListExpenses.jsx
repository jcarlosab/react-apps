import  { formatterEuro } from '../utils/utils';
import iconDelete from '../assets/delete.svg';
import TotalImport from './TotalImport';

const ListExpenses = ({listAmount, category, handleDeleteAmount}) => {
    return (
      listAmount
      .find((result) => result.categoria === category) === undefined ? (
            <div className="no-data">No hay datos</div>
          ) : (
            <div className="table-expenses">
              <div className="header-table">
                <div>Fecha</div>
                <div>Importe</div>
                <div></div>
              </div>
              <div className="table">
                <TotalImport category={category} listAmount={listAmount} />
                {
                listAmount
                .filter((result) => result.categoria === category)
                .filter((result) => result.mes === new Date().getMonth())
                .filter((result) => result.año === new Date().getFullYear())
                .map((result) => (
                    <div key={result.id}>
                      <div className="date">{result.fecha}</div>
                      <div className="import">{formatterEuro.format(result.importe)}</div>
                      <button
                          className="btn-delete"
                          onClick={() => handleDeleteAmount(result.id)}
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