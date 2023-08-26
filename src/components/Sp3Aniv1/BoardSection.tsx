import styled from 'styled-components'
import BoardAdminPage from './BoardAdmin'
import { battleRules } from './constants'
import { useDb } from './useDb'

const BoardSection = () => {
	const { board } = useDb()
	if (board === null) return <div>loading</div>
	const { teams, battles } = board
	const lib = {}
	battles.forEach((battle) => {
		if (!lib[battle.from]) lib[battle.from] = {}
		lib[battle.from][battle.to] = battle
	})

	return (
		<Style>
			<div>
				<h2>ボード</h2>
				<table className="board">
					<thead>
						<tr>
							<th />
							{teams.map((team) => (
								<th key={team.id}>{team.name}</th>
							))}
						</tr>
					</thead>
					<tbody>
						{teams.map((t1) => (
							<tr key={t1.id}>
								<th>{t1.name}</th>
								{teams.map((t2) => {
									if (t1.id === t2.id)
										return (
											<td key={t2.id} data-none={true}>
												-
											</td>
										)
									const battle = lib[t1.id]?.[t2.id]
									return (
										<td key={t2.id} className="battle">
											{battleRules.map((rule) => (
												<div key={rule.id}>
													<div>{rule.name}</div>
													<div data-win={true}>⚪︎</div>
												</div>
											))}
										</td>
									)
								})}
							</tr>
						))}
						{/* <tr key={'total'}>
						{Object.values(members).map((v, id) => (
							<td key={id}>{memberPointsList[games.length - 1]}</td>
						))}
					</tr> */}
					</tbody>
				</table>

				<BoardAdminPage />
			</div>
		</Style>
	)
}

const Style = styled.div`
	th,
	td {
		border: solid 1px white;
		padding: 10px 0;
		width: 10%;
		text-align: center;
		vertical-align: middle;
	}

	table.board {
		border-collapse: collapse;
		border-radius: 4px;
		background: orange;
		tr {
			color: white;
			background-image: linear-gradient(90deg, #c239f8, #303561);
		}
	}

	.battle {
		width: 100%;
		display: grid;
		grid-template-rows: repeat(5, 1fr);
		padding: 0;
		> div:not(:first-child) {
			border-top: solid 1px white;
		}
		> div {
			display: grid;
			grid-template-columns: 2fr 1fr;
		}
	}
`

export default BoardSection
