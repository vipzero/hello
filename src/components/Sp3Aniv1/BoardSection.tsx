import { Box, Typography } from '@mui/material'
import styled from 'styled-components'
import { ScoreTd } from './ScoreTd'
import { MatchResult, battleRules, schedules } from './constants'
import { useDb } from './useDb'

const BoardSection = () => {
	const { board, tableData, teamById } = useDb()
	if (board === null) return <div>loading</div>
	console.log(tableData)
	const { teams } = board

	return (
		<Style>
			<div>
				<h2>ボード</h2>
				<div className="board-wrap">
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
							{tableData?.map(({ team: t1, matchs, ...row }) => (
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
																<div className="rule">{rule.name}</div>
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
									<ScoreTd score={row.point} />
									<ScoreTd score={row.pointBattle} />
									<ScoreTd score={row.pointKo} />
								</tr>
							))}
							{/* <tr key={'total'}>
						{Object.values(members).map((v, id) => (
							<td key={id}>{memberPointsList[games.length - 1]}</td>
						))}
					</tr> */}
						</tbody>
					</table>
				</div>
			</div>
			<div>
				{schedules.map((row, i) => (
					<Card key={i}>
						<Typography variant="h5">{row.time}</Typography>
						<Box
							className="match-card"
							sx={{ display: 'flex', flexWrap: 'wrap' }}
						>
							{row.match.map((match, j) => {
								const team1 = teamById.get(match[0])
								const team2 = teamById.get(match[1])
								if (!team1 || !team2) return null
								const boardMatch = board.matchs.find(
									(m) => m.from === team1.id && m.to === team2.id
								)
								const results = boardMatch?.results || []

								return (
									<CardItem key={j}>
										<ResultBox>
											<div>
												<Typography>{team1.name}</Typography>
											</div>
											<div>x</div>
											<div>
												<Typography>{team2.name}</Typography>
											</div>

											{battleRules.map((rule, mi) => {
												return (
													<>
														<Box key={rule.id}>
															{['', 'x', 'o'][results[mi]?.win || 0]}
														</Box>
														<div>
															<Typography>{rule.name}</Typography>
														</div>
														<Box key={rule.id}>
															{['', 'o', 'x'][results[mi]?.win || 0]}
														</Box>
													</>
												)
											})}
										</ResultBox>
									</CardItem>
								)
							})}
						</Box>
					</Card>
				))}
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
		/* phone */
		tr {
			color: white;
			&:not(.headder) {
				background-image: linear-gradient(159deg, #3b3b3b, #141414);
				/* background-image: linear-gradient(90deg, #c239f8, #303561); */
			}
		}
		td.cell {
			padding: 0;
			min-width: 128px;
		}
		.battle-result-sign {
		}
		th.num {
			width: 4rem;
		}
	}

	.score {
		font-size: 1.5rem;
		transition: transform 0.5s linear;
	}
	.rule {
		text-align: end;
		font-size: 0.8rem;
		font-weight: bold;
		padding-top: 0.1rem;
		color: #ddd;
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
	@media (max-width: 600px) {
		.board-wrap {
			max-width: 100vw;
			overflow-x: scroll;
			margin: 0 -16px;
		}
		table.board {
			margin: 0 8px;
			font-size: 0.6rem;
			.rule {
				font-size: 0.5rem;
			}
			.battle-result-sign {
				padding: 8px;
				height: 50px;
				width: 30px;
				text-align: center;
				font-size: 1rem;
			}
			td.cell {
				min-width: 80px;
			}
		}
		.score {
			padding: 4px;
		}
	}
`

const ResultBox = styled(Box)`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	> div {
		&:nth-child(3n + 1) {
			text-align: center;
		}
		&:nth-child(3n + 2) {
			text-align: center;
		}
		&:nth-child(3n) {
			text-align: center;
		}
	}
`
const Card = styled(Box)`
	margin-top: 8px;
	background-image: linear-gradient(159deg, #a4a4a4, #cdcdcd);
	border-radius: 4px;
	padding: 8px;
`
const CardItem = styled(Box)`
	background-image: linear-gradient(159deg, #3b3b3b, #141414);
	color: white;
	border-radius: 4px;
	padding: 8px;
	/* mobile */
	width: 50%;
	@media (max-width: 600px) {
		width: 100%;
	}
`

export default BoardSection
