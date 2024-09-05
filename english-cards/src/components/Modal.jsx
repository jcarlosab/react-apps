import iconRefresh from '../assets/refresh.svg'

const Modal = ({counter}) => {
	
	return (
        <div className="modal">
            <div className="modal-content">
                <h2>Resultados</h2>
                <p>Correctas: {counter.correct}</p>
                <p>Incorrectas: {counter.incorrect}</p>
                <p>{counter.correct * 100 / 20}%</p>
                <button className="btn-modal"><img src={iconRefresh} alt='icon refresh'/></button>
            </div>
        </div>
	)
}

export default Modal