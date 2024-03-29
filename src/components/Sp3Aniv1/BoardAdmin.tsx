import {
	Box,
	Checkbox,
	FormControlLabel,
	Radio,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TextField,
	Typography,
} from '@mui/material'
import styled from 'styled-components'

import { range } from 'lodash'
import { battleRules, schedules } from './constants'
import { useDb } from './useDb'

type Props = {}

const BoardAdminPage = () => {
	const {
		board,
		updateTeamPlayer,
		updateMatchResultKoCheck,
		updateMatchResultValue,
		updateTeamName,
		setTeamNum,
		teamById,
	} = useDb()
	if (board === null) return <div>loading</div>
	const { teams } = board

	return (
		<div>
			<AdminPanel>
				<div>管理者ボード: 後で別ページに移動。</div>
				<Typography variant="h4">チームリスト</Typography>

				<Box display="flex" flexWrap={'wrap'}>
					{teams.map((t1) => (
						<Box key={t1.id} display="grid">
							{/* <Typography key={t1.id}>{t1.name}</Typography> */}
							<TextField
								label="チーム名"
								size="small"
								value={t1.name}
								color="primary"
								onChange={(e) => {
									updateTeamName(t1.id, e.target.value)
								}}
								sx={{ width: '200px' }}
							/>
							{range(5).map((i) => {
								return (
									<TextField
										key={i}
										label={i + 1 + 'P' + (i < 4 ? '' : '(サブ)')}
										size="small"
										value={t1.players[i]}
										onChange={(e) => {
											const names = t1.players
											names[i] = e.target.value
											updateTeamPlayer(t1.id, names)
										}}
										sx={{ width: '200px' }}
									/>
								)
							})}
						</Box>
					))}
				</Box>
				<FormControlLabel
					value={0}
					control={<Checkbox />}
					label={'3チーム'}
					onChange={() => setTeamNum(board.teamNum === 3 ? 4 : 3)}
					checked={board.teamNum === 3}
				/>

				<Typography variant="h4">試合結果</Typography>

				{schedules[board.teamNum].map((row, i) => (
					<div key={i}>
						<Typography variant="h5">{row.time}</Typography>
						<Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
							{row.match.map((match, j) => {
								const team1 = teamById.get(match[0])
								const team2 = teamById.get(match[1])
								if (!team1 || !team2) return null
								const boardMatch = board.matchs.find(
									(m) => m.from === team1.id && m.to === team2.id
								)
								const results = boardMatch?.results || []

								return (
									<Box key={j}>
										<Typography>
											{team1.name} x {team2.name}
										</Typography>
										<Table>
											<TableHead>
												<TableRow>
													<TableCell></TableCell>
													<TableCell>なし</TableCell>
													<TableCell>{team1.name}</TableCell>
													<TableCell>{team2.name}</TableCell>
													<TableCell>KO?</TableCell>
												</TableRow>
											</TableHead>
											<TableBody>
												{battleRules.map((rule, mi) => {
													const changeResult = (r: number) => {
														updateMatchResultValue(team1.id, team2.id, r, mi)
													}

													return (
														<TableRow key={rule.id}>
															<TableCell>{rule.name}</TableCell>

															<TableCell>
																<FormControlLabel
																	value={0}
																	control={<Radio color="primary" />}
																	label={undefined}
																	onChange={() => changeResult(0)}
																	checked={
																		!results[mi] || results[mi].win === 0
																	}
																/>
															</TableCell>
															<TableCell>
																<FormControlLabel
																	value={1}
																	control={<Radio color="primary" />}
																	label={undefined}
																	onChange={() => changeResult(1)}
																	checked={results[mi]?.win === 1}
																/>
															</TableCell>
															<TableCell>
																<FormControlLabel
																	value={2}
																	control={<Radio color="primary" />}
																	label={undefined}
																	onChange={() => changeResult(2)}
																	checked={results[mi]?.win === 2}
																/>
															</TableCell>
															<TableCell>
																<FormControlLabel
																	value={2}
																	control={<Checkbox color="primary" />}
																	label={undefined}
																	onChange={() => {
																		updateMatchResultKoCheck(
																			team1.id,
																			team2.id,
																			mi,
																			!results[mi]?.ko
																		)
																	}}
																	checked={results[mi]?.ko}
																/>
															</TableCell>
														</TableRow>
													)
												})}
											</TableBody>
										</Table>
									</Box>
								)
							})}
						</Box>
					</div>
				))}
			</AdminPanel>
		</div>
	)
}

const AdminPanel = styled.div`
	background: #eee;
`
export default BoardAdminPage
