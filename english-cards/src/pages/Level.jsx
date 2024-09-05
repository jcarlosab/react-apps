import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Card from '../components/Card'
import InputWord from '../components/InputWord'
import Counter from '../components/Counter'
import Header from '../components/Header'
import Modal from '../components/Modal'
import {shuffle} from '../utils/utils'


const Level = () => {
	const location = useLocation()
	const [words, setWords] = useState([])

	const [shuffledData, setShuffledData] = useState([])
	
	const [state, setState] = useState({
		input: '',
		counter: { correct: 0, incorrect: 0 },
		bgColor: '',
		isInputDisabled: false
	})
	const currentWord = shuffledData[state.counter.correct + state.counter.incorrect] || {}
	const { translation } = currentWord



	const handleValidate = () => {
		const isCorrect = state.input !== '' && currentWord.translation.find(word => word.toLowerCase() === state.input.toLowerCase()) !== undefined;
		setState(prevState => ({
			...prevState,
			bgColor: isCorrect ? 'green' : 'red',
			input: '',
			isInputDisabled: true,
		}));

		if (isCorrect) {
			setTimeout(() => {
				setState(prevState => ({
					...prevState,
					bgColor: '',
					isInputDisabled: false,
					counter: {
					correct: isCorrect ? prevState.counter.correct + 1 : prevState.counter.correct,
					incorrect: !isCorrect ? prevState.counter.incorrect + 1 : prevState.counter.incorrect
					}
				}));
			}, 500);
		}
	}

	const handleNextWord = () => {
		setState(prevState => ({
			...prevState,
			counter: {
				correct: !prevState.isCorrect ? prevState.counter.correct : prevState.counter.correct + 1,
				incorrect: prevState.counter.incorrect + 1
			},
			bgColor: '',
			isInputDisabled: false
		}));
	}

	const handleChange = (e) => {
		setState(prevState => ({
			...prevState,
			input: e.target.value
		}));
	}

	useEffect(() => {
		setWords(location.state.words)
	},[])

	useEffect(() => {
		const shuffled = shuffle(words)
		setShuffledData(shuffled)
	}, [words])

	useEffect(() => {
		if (20 == state.counter.correct + state.counter.incorrect) {
			alert('Finish round')
		}
	},[state.counter])

	return (
		<div className='main'>			
			<Header/>
			<Counter counter={state.counter} />
			<Card currentWord={currentWord} bgColor={state.bgColor} handleNextWord={handleNextWord} />
			<InputWord input={state.input} handleChange={handleChange} handleValidate={handleValidate} isInputDisabled={state.isInputDisabled} />
			<Modal counter={state.counter}/>
		</div>
	)
}

export default Level
