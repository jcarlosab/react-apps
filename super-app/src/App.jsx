import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [listAmount, setListAmount] = useState([]);
  const [category, setCategory] = useState('');
  const [totalAmount, setTotalAmount] = useState({
    market: 0,
    fuel: 0,
    others: 0,
  });

  const formatterEuro = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  });

  const getMonth = () => {
    const date = new Date();
    const month = date.getMonth();
    const nameMoths = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];
    return nameMoths[month];
  };

  const handleAddAmount = () => {
    if (!inputValue) return;
    const date = new Date();
    const item = {
      id: listAmount.length + 1,
      date: date.toLocaleDateString(),
      amount: formatterEuro.format(inputValue),
      month: getMonth(),
      category: category
    };
    setListAmount([...listAmount, item]);
    setTotalAmount((prev) => ({
      ...prev,
      [category]: prev[category] + parseFloat(inputValue),
    }));
    setInputValue('');
  };

  const handleDeleteAmount = (id, amount, itemCategory) => {
    const newListAmount = listAmount.filter((item) => item.id !== id);
    setListAmount(newListAmount);
    setTotalAmount((prev) => ({
      ...prev,
      [itemCategory]: prev[itemCategory] - amount,
    }));
  };

  const handleInputChange = (event) => {
    const regex = /^[0-9]*\.?[0-9]*$/;
    if (regex.test(event.target.value)) {
      setInputValue(event.target.value);
    }
  }

  useEffect(() => {
    setCategory('market')
  }, [])

  return (
    <div>
      <div className="tabs">
        <div>
          <button onClick={() => setCategory('market')}>Super</button>
          <button onClick={() => setCategory('fuel')}>Gasoil</button>
          <button onClick={() => setCategory('others')}>Otros</button>
        </div>
        <button>Historico (TODO)</button>
      </div>

      <div className="add-value">
        <input
          className='input-numbers'
          type="text"
          value={inputValue}
          onKeyDown={(e) => e.key === 'Enter' && handleAddAmount()}
          onChange={handleInputChange}
          placeholder='0.00'
        />
        <button
          className="btn-add"
          onClick={handleAddAmount}
          disabled={!inputValue}
        >
          Añadir
        </button>
      </div>

      {listAmount.length === 0 || listAmount.find((item) => item.category === category) === undefined ? (
        <div className="no-data">No hay datos</div>
      ) : (
        <div className="list-expenses">
          <div className="expense">
            <div>Fecha</div>
            <div>Importe</div>
            <div>Acción</div>
          </div>
          {
          listAmount.map((result) => (
            result.category === category &&
            <div key={result.id} className="expense">
              <div className="date">{result.date}</div>
              <div className="import">{result.amount}</div>
              <button
                className="btn-delete"
                onClick={() => handleDeleteAmount(result.id, result.amount, category)}
              >
                Delete
              </button>
            </div>
            
          ))}
        </div>
      )}

      <div className="total-import">
        <div>Total {getMonth()}</div>
        { 
          category === 'market' && totalAmount.market > 0 && <div>{formatterEuro.format(totalAmount.market)}</div>
        }
        { 
          category === 'fuel' && totalAmount.fuel > 0 && <div>{formatterEuro.format(totalAmount.fuel)}</div>
        }
        { 
          category === 'others' && totalAmount.others > 0 && <div>{formatterEuro.format(totalAmount.others)}</div>
        }
      </div>

    </div>
  );
}

export default App;
