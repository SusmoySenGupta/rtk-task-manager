import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetProjectsQuery } from '../features/projects/projectsApi';
import {
	useAddTaskMutation,
	useUpdateTaskMutation,
} from '../features/tasks/tasksApi';
import { useGetTeamQuery } from '../features/team/teamApi';

export default function Form({ task }) {
	const navigate = useNavigate();

	const [addTask, { isLoading, isSuccess }] = useAddTaskMutation();
	const [updateTask, { isSuccess: isUpdateSuccess }] =
		useUpdateTaskMutation();

	const { data: projects, isError: isProjectsError } = useGetProjectsQuery();
	const { data: teamMembers, isError: isTeamError } = useGetTeamQuery();

	const [taskName, setTaskName] = useState(task?.taskName || '');
	const [teamMemberName, setTeamMemberName] = useState(
		task?.teamMember?.name || ''
	);
	const [projectName, setProjectName] = useState(
		task?.project?.projectName || ''
	);
	const [deadline, setDeadline] = useState(task?.deadline || '');

	const handleTaskAdd = (e) => {
		e.preventDefault();

		const newTask = {
			taskName,
			teamMember: teamMembers.find(
				(teamMember) => teamMember?.name === teamMemberName
			),
			project: projects.find(
				(project) => project?.projectName === projectName
			),
			deadline,
		};

		addTask(newTask);
	};

	const handleTaskEdit = (e) => {
		e.preventDefault();

		const updatedTask = {
			taskName,
			teamMember: teamMembers.find(
				(teamMember) => teamMember?.name === teamMemberName
			),
			project: projects.find(
				(project) => project?.projectName === projectName
			),
			deadline,
		};

		updateTask({ taskID: task.id, task: updatedTask });
	};

	useEffect(() => {
		if (isSuccess || isUpdateSuccess) {
			navigate('/');
		}
	}, [isSuccess, isUpdateSuccess, navigate]);

	if (isProjectsError || isTeamError) {
		return <div>Something went wrong</div>;
	}

	return (
		<form
			className="space-y-6"
			onSubmit={task?.id ? handleTaskEdit : handleTaskAdd}
		>
			<div className="fieldContainer">
				<label htmlFor="lws-taskName">Task Name</label>
				<input
					type="text"
					name="taskName"
					id="lws-taskName"
					required
					placeholder="Implement RTK Query"
					value={taskName}
					onChange={(e) => setTaskName(e.target.value)}
				/>
			</div>

			<div className="fieldContainer">
				<label>Assign To</label>
				<select
					name="teamMember"
					id="lws-teamMember"
					required
					value={teamMemberName}
					onChange={(e) => setTeamMemberName(e.target.value)}
				>
					<option value="">Select Team Member</option>
					{teamMembers?.length &&
						teamMembers.map((member) => {
							return (
								<option key={member.id} value={member.name}>
									{member.name}
								</option>
							);
						})}
				</select>
			</div>
			<div className="fieldContainer">
				<label htmlFor="lws-projectName">Project Name</label>
				<select
					id="lws-projectName"
					name="projectName"
					required
					value={projectName}
					onChange={(e) => setProjectName(e.target.value)}
				>
					<option value="">Select Project</option>
					{projects?.map((project) => {
						return (
							<option
								key={project.id}
								value={project.projectName}
							>
								{project.projectName}
							</option>
						);
					})}
				</select>
			</div>

			<div className="fieldContainer">
				<label htmlFor="lws-deadline">Deadline</label>
				<input
					type="date"
					name="deadline"
					id="lws-deadline"
					required
					value={deadline}
					onChange={(e) => setDeadline(e.target.value)}
				/>
			</div>

			<div className="text-right">
				<button
					disabled={isLoading}
					type="submit"
					className="lws-submit"
				>
					Save
				</button>
			</div>
		</form>
	);
}
