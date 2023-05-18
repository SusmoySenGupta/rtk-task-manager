import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setProjects } from '../../features/filters/filtersSlice';
import { useGetProjectsQuery } from '../../features/projects/projectsApi';
import Project from './Project';

export default function Projects() {
	const dispatch = useDispatch();
	const { data: projects, isLoading, isError } = useGetProjectsQuery();

	useEffect(() => {
		const projectNames = projects?.map((project) => project.projectName);
		dispatch(setProjects(projectNames));
	}, [dispatch, projects]);

	let content = null;
	if (isLoading) {
		content = <div>Loading...</div>;
	} else if (isError) {
		content = <div>Something went wrong...</div>;
	} else if (projects?.length === 0) {
		content = <div>No projects found!</div>;
	} else if (projects?.length) {
		content = projects.map((project) => (
			<Project key={project.id} project={project} />
		));
	}
	return (
		<div>
			<h3 className="text-xl font-bold">Projects</h3>
			<div className="mt-3 space-y-4">{content}</div>
		</div>
	);
}
