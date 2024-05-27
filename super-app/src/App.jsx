import './App.css';
import { useEffect, useState } from 'react';
import { getNameMonth } from './utils/utils';
import { loadFromLocalStorage, saveToLocalStorage } from './utils/localStorage';
import Tabs from './components/Tabs';
import InputValue from './components/InputValue';
import ListExpenses from './components/ListExpenses';
import TotalImport from './components/TotalImport';
import HistoricalData from './components/HistoricalData';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [listAmount, setListAmount] = useState([]);
  const [category, setCategory] = useState('');
  const [totalAmount, setTotalAmount] = useState({
    market: 0,
    fuel: 0,
    others: 0,
  });

  const handleAddAmount = () => {
    if (!inputValue) return;
    const date = new Date();

    const item = {
      id: listAmount.length + 1,
      date: date.toLocaleDateString(),
      amount: inputValue,
      month: getNameMonth(),
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
    if (loadFromLocalStorage('listAmount') !== null && loadFromLocalStorage('listAmount').length !== 0) {
      setTotalAmount(loadFromLocalStorage('totalAmount'));
      setListAmount(loadFromLocalStorage('listAmount'));
    }
    setCategory('market')
  }, [])

  useEffect(() => {
    saveToLocalStorage('listAmount', listAmount);
    saveToLocalStorage('totalAmount', totalAmount);
  }, [listAmount, totalAmount]);

  return (
    <div> 
      <Tabs category={category} setCategory={setCategory} />
      {
        category === 'historical' 
        ? 
          <HistoricalData/>
        :
        <>
          <InputValue inputValue={inputValue} handleInputChange={handleInputChange} handleAddAmount={handleAddAmount} />
          <ListExpenses category={category} listAmount={listAmount} handleDeleteAmount={handleDeleteAmount}/>
          <TotalImport category={category} totalAmount={totalAmount} />
        </>
      }
    </div>
  );
}

export default App;
