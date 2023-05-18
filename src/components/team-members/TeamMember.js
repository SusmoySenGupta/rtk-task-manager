export default function TeamMember({ teamMember }) {
	const { name, avatar } = teamMember || {};

	return (
		<div className="checkbox-container">
			<img src={avatar} className="team-avater" alt={name} />
			<p className="label">{name}</p>
		</div>
	);
}
