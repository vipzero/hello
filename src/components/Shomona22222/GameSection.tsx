import styled from 'styled-components'
import { teams, members } from './data'

const TeamSection = () => (
	<Style>
		<div>
			<h2>ゲーム</h2>
		</div>
	</Style>
)

const Style = styled.div`
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
