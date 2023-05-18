import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
	return (
		<>
			<Navbar />
			<div className="container relative">
				<Sidebar />
				{children}
			</div>
		</>
	);
}
