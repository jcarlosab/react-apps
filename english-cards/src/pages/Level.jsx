import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Card from '../components/Card'
import InputWord from '../components/InputWord'
import Counter from '../components/Counter'
import Header from '../components/Header'
import {shuffle} from '../utils/utils'


const Level = () => {
	const location = useLocation()
	const [words, setWords] = useState([])
	const [input, setInput] = useState('')
	const [counter,  setCounter] = useState({correct: 0, incorrect: 0})
	const [bgColor, setBgColor] = useState('')
	const [shuffledData, setShuffledData] = useState([])
	const [isInputDisabled, setIsInputDisabled] = useState(false)
	const currentWord = shuffledData[counter.correct] || {}
	const { translation } = currentWord
	const isCorrect = input !== '' && translation.find(word => word.toLowerCase() === input.toLowerCase()) !== undefined

	const handleValidate = () => {
		setBgColor(isCorrect ? 'green' : 'red')
		setInput('')
		setIsInputDisabled(true)
		if (isCorrect) {
			setTimeout(() => {
				setCounter(prevCounter => ({
					correct: prevCounter.correct + 1,
					incorrect: isCorrect ? prevCounter.incorrect : prevCounter.incorrect + 1
				}))
				setBgColor('')
				setIsInputDisabled(false)
			}, 500)
		}
	}

	const handleNextWord = () => {
		setCounter(prevCounter => ({
			correct: prevCounter.correct + 1,
			incorrect: isCorrect ? prevCounter.incorrect : prevCounter.incorrect + 1
		}))
		setBgColor('')
		setIsInputDisabled(false)
	}

	const handleChange = (e) => {
		setInput(e.target.value)
	}

	useEffect(() => {
		setWords(location.state.words)
	},[])

	useEffect(() => {
		const shuffled = shuffle(words)
		setShuffledData(shuffled)
	}, [words])

	useEffect(() => {
		if (words.length != 0 && counter.correct === words.length) {
			alert('Finish round')
		}
	},[counter])

	return (
		<div className='main'>
			<Header level={location.state.title}/>
			<Counter counter={counter} />
			<Card currentWord={currentWord} bgColor={bgColor} handleNextWord={handleNextWord} />
			<InputWord input={input} handleChange={handleChange} handleValidate={handleValidate} isInputDisabled={isInputDisabled} />
		</div>
	)
}

export default Level
