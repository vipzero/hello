import styled from 'styled-components'
import { members, teams, games } from './constants'

const TeamSection = () => (
	<Style>
		<div>
			<h2>ゲーム</h2>
			{games.map((game, i) => {
				const awin = game.win === 0
				const bwin = game.win === 1

				return (
					<div key={i} className="game">
						<h3>Match {game.order}</h3>
						<p className="rule">{game.rule || '準備中'}</p>
						<div>
							<div className="alpha" data-win={awin}>
								<div className="point">{awin ? game.winText : '(x x )'}</div>
								<ul>
									{game.aMembers.map((mid) => (
										<li key={mid}>{members[mid].name.substr(0, 5)}</li>
									))}
								</ul>
							</div>
							<div className="vs">vs</div>
							<div data-win={bwin}>
								<div className="point">{bwin ? game.winText : '( x x)'}</div>
								<img src={teams[1].logo} />
								<ul>
									{game.bMembers.map((mid) => (
										<li key={mid}>{members[mid].name.substr(0, 5)}</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				)
			})}
		</div>
	</Style>
)

const size = 150
const Style = styled.div`
	.game {
		background: white;
		color: black;
		padding: 8px;
		margin-top: 12px;
		> div {
			display: grid;
			grid-template-columns: 1fr max-content 1fr;
			> div {
				display: flex;
				line-height: ${size}px;
				@media screen and (max-width: 896px) {
					line-height: ${size / 3}px;
				}

				&.alpha {
					flex-flow: row-reverse;
				}
			}
		}

		h3 {
			padding-left: 1rem;
			margin-left: -8px;
			width: 150px;
			background: black;
			font-size: 1.2rem;
			color: yellow;
			border-radius: 0 1rem 1rem 0;
		}
		img {
			width: 80px;
			height: 80px;
			margin: ${(size - 80) / 2}px 0;
			@media screen and (max-width: 896px) {
				margin: ${(size / 4 - 80) / 2}px 0;
			}
			font-size: 1.4rem;
		}
		.vs {
			line-height: ${size}px;
			@media screen and (max-width: 896px) {
				line-height: ${size / 4}px;
			}
			font-size: 20px;
			margin: 0 12px;
		}
		[data-win='true'] {
			img {
				width: ${size}px;
				height: ${size}px;
				@media screen and (max-width: 896px) {
					width: ${size / 4}px;
					height: ${size / 4}px;
				}
				margin: 0;
			}
			div {
				font-size: 60px;
				@media screen and (max-width: 896px) {
					font-size: 30px;
				}
			}
		}
		ul {
			margin: 40px;
			@media screen and (max-width: 896px) {
				margin: 0;
			}
			padding: 0;
		}
		li {
			margin: 0;
			padding: 0;
			line-height: 1.4rem;
			list-style: none;
		}
		p.rule {
			padding: 12px;
			font-size: 1rem;
			border: solid 1px orange;
			background: black;
			color: yellow;
		}
	}
`

export default TeamSection
