import Projects from './projects/Projects';
import TeamMembers from './team-members/TeamMembers';

export default function Sidebar() {
	return (
		<div className="sidebar">
			<Projects />
			<TeamMembers />
		</div>
	);
}
