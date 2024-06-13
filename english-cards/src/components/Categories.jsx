import { Link } from 'react-router-dom'

const Categories = () => {
	return (
		<div className='categories'>
			<Link to="/level/a1">Nivel A1</Link>
			<Link to="/level/a2">Nivel A2</Link>
			<Link to="/level/b1">Nivel B1</Link>
			<Link to="/level/b2">Nivel B2</Link>
			<Link to="/level/c1">Nivel C1</Link>
			<Link to="/level/c2">Nivel C2</Link>
		</div>
	)
}

export default Categories
