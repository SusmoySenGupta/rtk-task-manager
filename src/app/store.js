import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice';
import filtersReducer from '../features/filters/filtersSlice';
import projectsReducer from '../features/projects/projectsSlice';
import tasksReducer from '../features/tasks/tasksSlice';
import teamReducer from '../features/team/teamSlice';

export const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		projects: projectsReducer,
		teamMembers: teamReducer,
		tasks: tasksReducer,
		filters: filtersReducer,
	},
	devTools: process.env.NODE_ENV !== 'production',
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),
});
