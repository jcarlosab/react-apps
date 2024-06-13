import iconCard from '../assets/style_48dp.svg'

const Counter = ({counter}) => {
	const value = 20 - counter.correct

	return (
		<div className="counter">
			<div className="bold"><img src={iconCard} alt='icon card'/>{value}</div>
			<div className="bold color-red"><img src={iconCard} alt='icon card error'/>{counter.incorrect}</div>
		</div>
	)
}

export default Counter
