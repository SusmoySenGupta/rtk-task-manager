import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleProject } from '../../features/filters/filtersSlice';

export default function Project({ project }) {
	const dispatch = useDispatch();

	const { projectName, colorClass } = project || {};
	const { projects: selectedProjects } =
		useSelector((state) => state.filters) || {};

	const isChecked =
		selectedProjects === undefined ||
		selectedProjects?.includes(projectName);
	const [checked, setChecked] = useState(isChecked);

	const handleChange = () => {
		dispatch(toggleProject(projectName));
		setChecked((prevChecked) => !prevChecked);
	};

	return (
		<div className="checkbox-container">
			<input
				type="checkbox"
				className={colorClass}
				checked={checked}
				onChange={handleChange}
			/>
			<p className="label">{projectName}</p>
		</div>
	);
}
