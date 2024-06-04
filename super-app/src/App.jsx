import './App.css'
import { useEffect, useState } from 'react'
import Tabs from './components/Tabs'
import InputValue from './components/InputValue'
import ListExpenses from './components/ListExpenses'
import TotalImport from './components/TotalImport'
import HistoricalData from './components/HistoricalData'
import { getListAmount, addAmount, deleteAmount } from './db/database'

function App() {
  const [inputValue, setInputValue] = useState('')
  const [listAmount, setListAmount] = useState([])
  const [category, setCategory] = useState('')

  const handleAddAmount = async () => {
    if (!inputValue) return;
    const date = new Date();

    const item = {
      id: parseInt(Date.now() * Math.random()),
      date: date.toLocaleDateString(),
      amount: parseFloat(inputValue),
      month: date.getMonth(),
      year: date.getFullYear(),
      category: category
    }

    setListAmount((prev) => [...prev, item])
    try {
      await addAmount(item)
    } catch (error) {
      console.log(error)
    }

    setInputValue('')
  }

  const handleDeleteAmount = async (id) => {
    setListAmount((prev) => prev.filter((item)=> item.id !== id))
    try {
      await deleteAmount(id)
    } catch (error) {
      console.log(error)
    }
  }

  const handleInputChange = (event) => {
    const regex = /^[0-9]*\.?[0-9]*$/
    if (regex.test(event.target.value)) {
      setInputValue(event.target.value)
    }
  }

  useEffect(() => {
    setCategory('market')
    const fetchData = async () => {
      try {
        const data = await getListAmount()
        setListAmount(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])
  
  return (
    <div className='main'> 
      <Tabs category={category} setCategory={setCategory} />
      {
        category === 'historical' 
        ? 
          <HistoricalData/>
        :
        <>
          <InputValue inputValue={inputValue} handleInputChange={handleInputChange} handleAddAmount={handleAddAmount} />
          <ListExpenses category={category} listAmount={listAmount} handleDeleteAmount={handleDeleteAmount}/>
          <TotalImport category={category} listAmount={listAmount} />
        </>
      }
    </div>
  );
}

export default App
