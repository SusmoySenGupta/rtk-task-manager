import { apiSlice } from '../api/apiSlice';

export const tasksApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getTasks: builder.query({
			query: () => '/tasks',
		}),
		getTask: builder.query({
			query: (taskID) => `/tasks/${taskID}`,
		}),
		addTask: builder.mutation({
			query: (task) => ({
				url: '/tasks',
				method: 'POST',
				body: task,
			}),
			async onQueryStarted(task, { dispatch, queryFulfilled }) {
				// pessimistic getTasks update
				try {
					const { data: newTask } = await queryFulfilled;
					dispatch(
						apiSlice.util.updateQueryData(
							'getTasks',
							undefined,
							(draft) => {
								draft.push(newTask);
							}
						)
					);
				} catch (error) {
					console.log(error);
				}
			},
		}),
		updateTask: builder.mutation({
			query: ({ taskID, task }) => ({
				url: `/tasks/${taskID}`,
				method: 'PUT',
				body: task,
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				// pessimistic cache update
				try {
					const { data: updatedTask } = await queryFulfilled;
					if (updatedTask?.id) {
						dispatch(
							apiSlice.util.updateQueryData(
								'getTasks',
								undefined,
								(draft) => {
									const editableTaskIndex = draft.findIndex(
										(t) => t.id === updatedTask.id
									);

									draft[editableTaskIndex] = updatedTask;
								}
							)
						);

						dispatch(
							apiSlice.util.updateQueryData(
								'getTask',
								arg.taskID.toString(),
								() => updatedTask
							)
						);
					}
				} catch (error) {
					console.log(error);
				}
			},
		}),
		deleteTask: builder.mutation({
			query: (taskID) => ({
				url: `/tasks/${taskID}`,
				method: 'DELETE',
			}),
			async onQueryStarted(taskID, { dispatch, queryFulfilled }) {
				// optimistic cache update
				const patchResult = dispatch(
					apiSlice.util.updateQueryData(
						'getTasks',
						undefined,
						(draft) => {
							const taskIndex = draft.findIndex(
								(t) => t.id === taskID
							);
							draft.splice(taskIndex, 1);
						}
					)
				);
				try {
					const response = await queryFulfilled;
				} catch (error) {
					patchResult.undo();
				}
			},
		}),
	}),
});

export const {
	useGetTasksQuery,
	useGetTaskQuery,
	useAddTaskMutation,
	useUpdateTaskMutation,
	useDeleteTaskMutation,
} = tasksApi;
