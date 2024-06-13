import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from '../components/Card'
import InputWord from '../components/InputWord'
import Counter from '../components/Counter'
import Header from '../components/Header'
import {getLevel, shuffle} from '../utils/utils'


const Level = () => {
	const [input, setInput] = useState('')
	const [counter,  setCounter] = useState({correct: 0, incorrect: 0})
	const [bgColor, setBgColor] = useState('')
	const { category } = useParams()
	const { level, data = [] } = getLevel(category)
	const [shuffledData, setShuffledData] = useState([])
	const [isInputDisabled, setIsInputDisabled] = useState(false)
	const currentWord = shuffledData[counter.correct] || {}
	const { translation } = currentWord

	const handleValidate = () => {
		const isCorrect = input !== '' && translation.find(word => word.toLowerCase() === input.toLowerCase()) !== undefined
		setBgColor(isCorrect ? 'green' : 'red')
		setInput('')
		setIsInputDisabled(true)
		setTimeout(() => {
			setCounter(prevCounter => ({
				correct: prevCounter.correct + 1,
				incorrect: isCorrect ? prevCounter.incorrect : prevCounter.incorrect + 1
			}))
			setBgColor('')
			setIsInputDisabled(false)
		}, 500)
	}

	const handleChange = (e) => {
		setInput(e.target.value)
	}

	useEffect(() => {
		const shuffled = shuffle(data)
		setShuffledData(shuffled)
	}, [data])

	useEffect(() => {
		if (counter.correct === 20) {
			alert('Finish round')
		}
	},[counter])

	return (
		<div className='main'>
			<Header level={level}/>
			<Counter counter={counter} />
			<Card currentWord={currentWord} bgColor={bgColor} />
			<InputWord input={input} handleChange={handleChange} handleValidate={handleValidate} isInputDisabled={isInputDisabled} />
		</div>
	)
}

export default Level
