import './App.css'
import { useEffect, useState } from 'react'
import Tabs from './components/Tabs'
import InputValue from './components/InputValue'
import ListExpenses from './components/ListExpenses'
import HistoricalData from './components/HistoricalData'
import { getListAmount, addAmount, deleteAmount } from './db/database'
import Loader from './components/Loader'

function App() {
  const [inputValue, setInputValue] = useState('')
  const [listAmount, setListAmount] = useState([])
  const [category, setCategory] = useState('market')
  const [isLoading, setIsLoading] = useState(false)

  const handleAddAmount = async () => {
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
    const fetchData = async () => {
      try {
        const data = await getListAmount()
        setListAmount(data)
        setIsLoading(true)
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
          {
          isLoading 
          ?
          <ListExpenses category={category} listAmount={listAmount} handleDeleteAmount={handleDeleteAmount}/>
          :
          <Loader/>
          }
        </>
      }
    </div>
  )
}

export default App
