import { Box } from '@mui/material'
import styled from 'styled-components'
import BoardAdminPage from './BoardAdmin'
import { MatchResult, battleRules } from './constants'
import { useDb } from './useDb'

const BoardSection = () => {
	const { board, matchById, tableData } = useDb()
	if (board === null) return <div>loading</div>
	console.log(tableData)
	const { teams } = board

	return (
		<Style>
			<div>
				<h2>ボード</h2>
				<table className="board">
					<thead>
						<tr className="headder">
							<th />
							{teams.map((team) => (
								<th key={team.id}>vs{team.name}</th>
							))}
							<th className="num">勝利数</th>
							<th className="num">勝ち点</th>
							<th className="num">KO</th>
						</tr>
					</thead>
					<tbody>
						{tableData?.map(({ team: t1, matchs }) => (
							<tr key={t1.id}>
								<th>{t1.name}</th>
								{matchs.map((m) => {
									const match = m.match
									if (t1.id === m.to.id || !match)
										return (
											<td key={m.to.id} data-none={true}>
												-
											</td>
										)

									const results = match.results
									function resultText(r: MatchResult | undefined) {
										if (r === undefined || r.win === 0) return ' '
										return r.win === 1 ? '○' : '×'
									}

									return (
										<td key={m.to.id} className="cell">
											<Box sx={{ display: 'flex' }}>
												<div className="battle">
													{battleRules.map((rule, ri) => (
														<div key={rule.id}>
															<div>{rule.name}</div>
															<div
																className="result-sign"
																data-win={results[ri]?.win}
																data-ko={results[ri]?.ko}
															>
																{resultText(results[ri])}
															</div>
														</div>
													))}
												</div>
												<div data-win={m.win} className="battle-result-sign">
													<div>{[' ', '○', '×'][m.win]}</div>
												</div>
											</Box>
										</td>
									)
								})}
								<td>{matchs.filter((m) => m.win === 1).length}</td>
								<td>
									{matchs.map((m) => m.winCount).reduce((a, b) => a + b, 0)}
								</td>
								<td>
									{matchs.map((m) => m.koCount).reduce((a, b) => a + b, 0)}
								</td>
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
		text-align: center;
		vertical-align: middle;
	}

	table.board {
		table-layout: fixed;
		border-collapse: collapse;
		border-radius: 4px;
		background: gray;
		tr {
			color: white;
			&:not(.headder) {
				background-image: linear-gradient(159deg, #3b3b3b, #141414);
				/* background-image: linear-gradient(90deg, #c239f8, #303561); */
			}
		}
		td.cell {
			padding: 0;
		}
		.battle-result-sign {
		}
		th.num {
			width: 4rem;
		}
	}

	.result-sign {
		border-left: 1px solid gray;
		border-right: 1px solid gray;
		&[data-win='1'] {
			color: #ffae00aa;
			&[data-ko='true'] {
				color: #ff0000aa;
			}
		}
		&[data-win='2'] {
			color: #6dd7ffaa;
		}
	}
	.battle-result-sign {
		padding: 12px;
		height: 128px;
		width: 60px;
		text-align: center;
		font-size: 1.5rem;
		place-content: center;
		place-items: center;
		&[data-win='1'] {
			background: #ffd90044;
		}
		&[data-win='2'] {
			background: #1e00ff44;
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
