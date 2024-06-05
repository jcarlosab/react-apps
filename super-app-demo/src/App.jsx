import './App.css'
import { useEffect, useState } from 'react'
import Tabs from './components/Tabs'
import InputValue from './components/InputValue'
import ListExpenses from './components/ListExpenses'
import HistoricalData from './components/HistoricalData'
import mockListResulst from './mocks/list-results.json'
import Loader from './components/Loader'

function App() {
  const [inputValue, setInputValue] = useState('')
  const [listAmount, setListAmount] = useState([])
  const [category, setCategory] = useState('market')
  const [isLoading, setIsLoading] = useState(false)

  const handleAddAmount = () => {
    if (!inputValue) return;
    const date = new Date();

    const item = {
      id: parseInt(Date.now() * Math.random()),
      fdate: date.toLocaleDateString(),
      amount: parseFloat(inputValue),
      month: date.getMonth(),
      year: date.getFullYear(),
      category: category
    }

    setListAmount((prev) => {
      const updatedList = [...prev, item]
      return updatedList
    })

    setInputValue('')
  }

  const handleDeleteAmount = (id) => {
    setListAmount((prev) => prev.filter((item)=> item.id !== id))
  }

  const handleInputChange = (event) => {
    const regex = /^[0-9]*[.,]?[0-9]*$/
    if (regex.test(event.target.value)) {
      setInputValue(event.target.value)
    }
  }

  useEffect(() => {
    setListAmount(mockListResulst)
    setIsLoading(true)
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
          {
          isLoading 
          ?
          <ListExpenses category={category} listAmount={listAmount} handleDeleteAmount={handleDeleteAmount}/>
          :
          <Loader/>
          }
        </>
      }
      <div className='demo'>DEMO VERSION</div>
    </div>
  )
}

export default App
