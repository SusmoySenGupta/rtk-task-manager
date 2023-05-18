import { useParams } from 'react-router-dom';
import Form from '../components/Form';
import { useGetTaskQuery } from '../features/tasks/tasksApi';

export default function EditTask() {
	const { taskID } = useParams();
	const { data: task, isLoading, isError } = useGetTaskQuery(taskID);

	let content = null;
	if (isLoading) {
		content = <div>Loading...</div>;
	} else if (isError) {
		content = <div>Something went wrong</div>;
	} else if (task?.id) {
		content = <Form task={task} />;
	}

	return (
		<main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
			<h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
				Edit Task for Your Team
			</h1>

			<div className="justify-center mb-10 space-y-2 md:flex md:space-y-0">
				{content}
			</div>
		</main>
	);
}
