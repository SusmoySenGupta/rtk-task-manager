import { useSelector } from 'react-redux';
import { useGetTasksQuery } from '../../features/tasks/tasksApi';
import Task from './Task';

export default function Tasks() {
	const { data: tasks, isLoading, isError } = useGetTasksQuery();
	const { projects: selectedProjects, search } =
		useSelector((state) => state.filters) || {};

	let content = null;
	if (isLoading) {
		content = <div>Loading...</div>;
	} else if (isError) {
		content = <div>Error! Something went wrong...</div>;
	} else if (tasks?.length === 0) {
		content = <div>No tasks found!</div>;
	} else if (tasks?.length) {
		content = tasks
			.filter((task) => {
				if (!search) return true;

				return task.taskName
					.toLowerCase()
					.includes(search.toLowerCase());
			})
			.filter((task) => {
				if (selectedProjects === undefined) return true;

				return selectedProjects.includes(task?.project?.projectName);
			})
			.map((task) => <Task key={task.id} task={task} />);
	}

	return <div className="lws-task-list">{content}</div>;
}
