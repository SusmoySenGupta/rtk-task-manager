import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	search: '',
	projects: undefined,
};

const filtersSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setProjects: (state, action) => {
			state.projects = action.payload;
		},
		toggleProject: (state, action) => {
			const projectName = action.payload;
			const { projects } = state;

			if (projects.includes(projectName)) {
				state.projects = projects.filter(
					(project) => project !== projectName
				);
			} else {
				state.projects = [...projects, projectName];
			}
		},

		setSearch: (state, action) => {
			state.search = action.payload;
		},
	},
});

export const { setProjects, toggleProject, setSearch } = filtersSlice.actions;
export default filtersSlice.reducer;
