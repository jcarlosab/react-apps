import iconHistoryWhite from '../assets/history-white.svg';
import iconHistory from '../assets/history.svg';

const Tabs = ({ category, setCategory }) => {
    return (
        <div className="tabs">
            <div>
                <button className={category === 'market' ? 'active' : ''} onClick={() => setCategory('market')}>Super</button>
                <button className={category === 'fuel' ? 'active' : ''} onClick={() => setCategory('fuel')}>Gasoil</button>
                <button className={category === 'others' ? 'active' : ''} onClick={() => setCategory('others')}>Otros</button>
            </div>
            <button className={category === 'historical' ? 'active' : ''} onClick={() => setCategory('historical')}><img src={category === 'historical' ? iconHistoryWhite : iconHistory} alt='history'/></button>
        </div>
    )
}

export default Tabs