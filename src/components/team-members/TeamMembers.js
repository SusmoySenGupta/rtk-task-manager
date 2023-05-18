import { useGetTeamQuery } from '../../features/team/teamApi';
import TeamMember from './TeamMember';

export default function TeamMembers() {
	const { data: teamMembers, isLoading, isError } = useGetTeamQuery();

	let content = null;
	if (isLoading) {
		content = <div>Loading...</div>;
	} else if (isError) {
		content = <div>Something went wrong...</div>;
	} else if (teamMembers?.length === 0) {
		content = <div>No team members found!</div>;
	} else if (teamMembers?.length) {
		content = teamMembers.map((teamMember) => (
			<TeamMember key={teamMember.id} teamMember={teamMember} />
		));
	}

	return (
		<div className="mt-8">
			<h3 className="text-xl font-bold">Team Members</h3>
			<div className="mt-3 space-y-4">{content}</div>
		</div>
	);
}
