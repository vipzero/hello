import styled from 'styled-components'
import { teams, members } from './data'

const TeamSection = () => (
	<Style>
		<h2>チーム</h2>
		<div className="teams">
			{teams.map((team) => (
				<div key={team.name}>
					<img src={team.logo} />
					<h3>{team.name}</h3>
					<div className="members">
						{team.members.map((mid) => (
							<div key={mid}>
								<img
									src={`https://avatars.dicebear.com/v2/bottts/${mid}.svg`}
								/>
								<div>
									<h5>{members[mid].name}</h5>
									<p>{members[mid].wepon.split(' ').join(',')}</p>
									<p className="comment">──{members[mid].comment}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	</Style>
)

const Style = styled.div`
	.teams {
		color: black;
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 4px;
		justify-content: space-evenly;
		text-align: center;
		> div {
			padding-top: 1rem;
			h3 {
				font-size: 1.4rem;
			}
			background: white;
			> img {
				width: 50%;
			}
		}
		@media screen and (max-width: 896px) {
			grid-template-columns: 1fr;
		}
	}

	.members {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 4px;
		margin: 4px;
		> div {
			border: solid 1px gray;
			display: grid;
			grid-template-columns: 30% 70%;
			.comment {
				font-style: italic;
			}
		}
	}

	img {
		width: 100%;
	}
`

export default TeamSection
