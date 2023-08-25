import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Board, subscribeBoards } from './firebase'
import {
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
	Typography,
} from '@mui/material'

const useDb = () => {
	const [board, setBoard] = useState<Board | null>(null)
	useEffect(() => {
		const t = subscribeBoards((board) => {
			console.log(board)
			setBoard(board)
		})
		return () => t()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return { board }
}

const battleRules = [
	{ id: 'a', name: 'エリア' },
	{ id: 'y', name: 'ヤグラ' },
	{ id: 'h', name: 'ホコ' },
	{ id: 's', name: 'アサリ' },
	{ id: 'n', name: 'ナワバリ' },
]

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
				<table>
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
			</div>
			<div>
				<div>管理者ように後で移動。(未動作)</div>

				{teams.map((t1) => (
					<div key={t1.id}>
						<Typography key={t1.id}>{t1.name}</Typography>
						{teams.map((t2) => {
							return (
								<FormControl size="small" key={t2.id}>
									<FormLabel id="demo-radio-buttons-group-label">
										勝敗
									</FormLabel>
									<RadioGroup row aria-label="position" defaultValue="6.5">
										<FormControlLabel
											value={0}
											control={<Radio color="primary" />}
											label="未"
										/>
										<FormControlLabel
											value={1}
											control={<Radio color="primary" />}
											label="A勝利"
										/>
										<FormControlLabel
											value={2}
											control={<Radio color="primary" />}
											label="B勝利"
										/>
									</RadioGroup>{' '}
								</FormControl>
							)
						})}
					</div>
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
		width: 10%;
		text-align: center;
		vertical-align: middle;
	}

	table {
		border-collapse: collapse;
		border-radius: 4px;
		background: orange;
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
