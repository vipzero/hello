import {
	Box,
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
	Typography,
} from '@mui/material'
import styled, { keyframes } from 'styled-components'
import { ScoreTd } from './ScoreTd'
import { MatchResult, battleRules, schedules } from './constants'
import { flipResult, useDb } from './useDb'
import { useState } from 'react'

const BoardSection = () => {
	const { board, tableData, teamById, activeTeams } = useDb()
	const [hilTeam, setHilTeam] = useState<string>('')

	if (board === null) return <div>loading</div>
	console.log(tableData)

	return (
		<Style data-hilight={hilTeam}>
			<div>
				<h2>ボード</h2>
				<Box display="flex">
					<FormControl>
						<FormLabel>自分のチームに色をつける</FormLabel>
						<RadioGroup
							row
							value={hilTeam}
							onChange={(e) => setHilTeam(e.target.value)}
						>
							<FormControlLabel
								value={''}
								control={<Radio color="primary" />}
								label={'なし'}
								onChange={() => setHilTeam('')}
								checked={hilTeam === ''}
							/>
							{activeTeams.map((t) => (
								<FormControlLabel
									key={t.id}
									value={t.id}
									control={<Radio color="primary" />}
									label={t.id}
									onChange={() => setHilTeam(t.id)}
									checked={hilTeam === t.id}
								/>
							))}
						</RadioGroup>
					</FormControl>
				</Box>
				<div className="board-wrap">
					<table className="board">
						<thead>
							<tr className="headder">
								<th />
								{activeTeams.map((team) => (
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
									<th data-team={t1.id}>{t1.name}</th>
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
				{schedules[board.teamNum].map((row, i) => (
					<Card key={i}>
						<Typography variant="h5">{row.time}</Typography>
						<Box className="match-card">
							{row.match.map((match, j) => {
								const team1 = teamById.get(match[0])
								const team2 = teamById.get(match[1])
								if (!team1 || !team2) return null
								const boardMatch = board.matchs.find(
									(m) => m.from === team1.id && m.to === team2.id
								)
								const results = boardMatch?.results || []
								console.log(results)
								const team1Win = results.filter((r) => r?.win === 1).length >= 3
								const team2Win = results.filter((r) => r?.win === 2).length >= 3

								return (
									<CardItem key={j}>
										<ResultBox>
											<div>
												<Typography data-team={team1.id}>
													<span data-win-flag={team1Win}>★</span>
													{team1.name}
												</Typography>
											</div>
											<div>x</div>
											<div>
												<Typography data-team={team2.id}>
													<span data-win-flag={team2Win}>★</span>
													{team2.name}
												</Typography>
											</div>

											{battleRules.map((rule, mi) => {
												return (
													<>
														<Box data-win={results[mi]?.win} key={mi + '-1'}>
															{['', 'o', 'x'][results[mi]?.win || 0]}
														</Box>
														<div key={mi + '-0'}>
															<Typography>{rule.name}</Typography>
														</div>
														<Box
															data-win={flipResult(results[mi])?.win}
															key={mi + '-2'}
														>
															{['', 'x', 'o'][results[mi]?.win || 0]}
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
				/* background-image: linear-gradient(159deg, #3b3b3b, #141414); */
				background-image: linear-gradient(90deg, #3f1350, #303561);
			}
		}
		td.cell {
			padding: 0;
			min-width: 128px;
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
		display: table;
		> div {
			display: table-cell;
			vertical-align: middle;
			padding: 8px;
			width: 56px;
		}
		height: 128px;
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
				> div {
					padding: 2px;
				}
				height: 77px;
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
	.match-card {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	&[data-hilight='t1'] [data-team='t1'],
	&[data-hilight='t2'] [data-team='t2'],
	&[data-hilight='t3'] [data-team='t3'],
	&[data-hilight='t4'] [data-team='t4'] {
		color: yellow;
		text-decoration: underline;
	}
`

const ResultBox = styled(Box)`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	> div {
		text-align: center;
		&:nth-child(3n + 2) {
			text-align: center;
		}
	}
`

const rotate = keyframes`
	from { transform: rotate(0deg); }
	to { transform: rotate(360deg); }
`

const Card = styled(Box)`
	margin-top: 8px;
	background: #ffffff85;
	border-radius: 4px;
	padding: 8px;

	[data-win-flag='true'] {
		display: inline-block;
		animation: ${rotate} 0.1s linear infinite;
	}
	[data-win-flag='false'] {
		display: none;
	}
`
const CardItem = styled(Box)`
	background-image: linear-gradient(90deg, #3f1350, #303561);
	color: white;
	border-radius: 4px;
	padding: 8px;
	/* mobile */
	width: calc(50% - 8px);

	@media (max-width: 600px) {
		width: 100%;
	}
	[data-win='1'] {
		background: #ffd90044;
	}
	[data-win='2'] {
		background: #1e00ff44;
	}
`

export default BoardSection
