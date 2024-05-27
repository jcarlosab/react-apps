const InputValue = ({ inputValue, handleAddAmount, handleInputChange }) => {
    return (
        <div className="add-value">
        <input
          className='input-numbers'
          type="text"
          value={inputValue}
          onKeyDown={(e) => e.key === 'Enter' && handleAddAmount()}
          onChange={handleInputChange}
          placeholder='0.00'
        />
        <button
          className="btn-add"
          onClick={handleAddAmount}
          disabled={!inputValue}
        >
          Añadir
        </button>
      </div>
    )
}

export default InputValue