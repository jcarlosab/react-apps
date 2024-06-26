import arrow from '../assets/arrow_back.svg'

const ButtonBack = ({level}) => {
	return (
		<div className='header'>
			<button
				className="btn-back"
				onClick={() => window.history.back()}
				>
					<img src={arrow} alt='back' /> Categorías
			</button>
			<p>{level}</p>
		</div>
	)
}

export default ButtonBack
