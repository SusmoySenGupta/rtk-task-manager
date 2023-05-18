import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddTask from './pages/AddTask';
import EditTask from './pages/EditTask';
import Home from './pages/Home';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/tasks/add" element={<AddTask />} />
				<Route path="/tasks/:taskID/edit" element={<EditTask />} />
				<Route
					path="*"
					element={
						<h1>
							<strong>404 Not Found</strong>
						</h1>
					}
				/>
			</Routes>
		</Router>
	);
}

export default App;
