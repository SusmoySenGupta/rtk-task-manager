import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logoImage from '../assets/images/logo.png';
import { setSearch } from '../features/filters/filtersSlice';

export default function Navbar() {
	const dispatch = useDispatch();
	const { search } = useSelector((state) => state.filters) || {};
	const [input, setInput] = useState(search);

	const handleChange = (e) => {
		setInput(e.target.value);
		dispatch(setSearch(e.target.value));
	};

	return (
		<nav className="container relative py-3">
			<div className="flex items-center justify-between">
				<Link
					to="/"
					style={{
						display: 'flex',
						alignItems: 'center',
						textDecoration: 'none',
						color: 'inherit',
						gap: '0.5rem',
					}}
				>
					<img
						src={logoImage}
						alt="logo"
						style={{
							width: '50px',
							height: '50px',
						}}
					/>
					<p>
						<span className="font-bold">RTK Task Manager</span>
					</p>
				</Link>
				<div className="flex-1 max-w-xs search-field group">
					<i className="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500"></i>
					<input
						type="text"
						placeholder="Search Task"
						className="search-input"
						id="lws-searchTask"
						value={input}
						onChange={handleChange}
					/>
				</div>
			</div>
		</nav>
	);
}
