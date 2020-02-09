import styled from 'styled-components'
import { teams, games } from './data'

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
								<img src={teams[0].logo} />
							</div>
							<div className="vs">vs</div>
							<div data-win={bwin}>
								<div className="point">{bwin ? game.winText : '( x x)'}</div>
								<img src={teams[1].logo} />
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
			font-size: 1rem;
		}
		.vs {
			line-height: ${size}px;
			font-size: 20px;
			margin: 0 12px;
		}
		[data-win='true'] {
			img {
				width: ${size}px;
				height: ${size}px;
				margin: 0;
			}
			div {
				font-size: 60px;
			}
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
