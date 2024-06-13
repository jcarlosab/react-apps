import { useEffect, useState } from 'react'
import iconQuestion from '../assets/question_mark.svg'

const Card = ( {currentWord, bgColor} ) => {
	const { word, description, type, tense } = currentWord
	const [showInfo, setShowInfo] = useState(false)
	const toggleInfo = () => {
		setShowInfo(!showInfo)
	}

	useEffect(() => {
		setShowInfo(false)
	}, [word])

	return (
		<div className={`card ${bgColor}`}>
			<button className='btn-help' onClick={toggleInfo}>
				<img src={iconQuestion} alt='icon question' /> 
			</button>
			<p className="word">{word}</p>
			{showInfo && (
				<div className="bottom-text-card">
					<p><span className='bold'>Type:</span> {type}</p>
					{
						tense !== undefined && (
							<p><span className='bold'>Tense:</span> {tense}</p>
						)
					}
					<p><span className='bold'>Description:</span> {description}</p>
				</div>
			)}
		</div>
	)
}

export default Card
