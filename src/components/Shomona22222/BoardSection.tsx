/* eslint-disable @typescript-eslint/restrict-plus-operands */
import styled from 'styled-components'
import { members, games, MemberId } from './data'

const BoardSection = () => {
	const memberPointsList: Record<MemberId, number>[] = []
	const memberPoints = {} as Record<MemberId, number>

	games.forEach(game => {
		const winMembers = [game.aMembers, game.bMembers][game.win]

		if (winMembers) {
			winMembers.forEach(id => {
				memberPoints[id] = (memberPoints[id] || 0) + 1
			})
		}
		memberPointsList.push({ ...memberPoints })
	})

	return (
		<Style>
			<div>
				<h2>ボード</h2>
				<table>
					<thead>
						<th />
						{Object.keys(members).map(id => (
							<td key={id}>{members[id].name.substr(0, 5)}</td>
						))}
					</thead>
					<tbody>
						{memberPointsList.map((points, i) => (
							<tr key={i}>
								<th>{games[i].order}</th>
								{Object.keys(members).map(id => (
									<td key={id}>{points[id]}</td>
								))}
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
	}
`

export default BoardSection
