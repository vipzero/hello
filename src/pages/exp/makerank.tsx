import _range from 'lodash/range'
import _sum from 'lodash/sum'
import _map from 'lodash/map'

import styled from 'styled-components'
import { useState } from 'react'
import Layout from '../../components/Layout'

const Wrap = styled.div``
const titles = ['vipper', 'うんこ', 'ちんこ']

type Cells = { [y: string]: { [x: string]: boolean } }

const initialCells: Cells = {
	'0': { '0': false, '1': true, '2': true },
	'1': { '0': false, '1': false, '2': true },
	'2': { '0': false, '1': false, '2': false },
}

function MakeRank() {
	const [cells, setCells] = useState<Cells>(initialCells)
	const rank = _range(3).map(i => ({
		n: _sum(Object.values(cells[`${i}`])),
		title: titles[i],
	}))

	rank.sort((a, b) => b.n - a.n)

	console.log(rank)
	return (
		<Wrap>
			<table>
				<tbody>
					<tr>
						<th>強いのどっち</th>
						{_range(3).map(x => (
							<th key={x}>{titles[x]}</th>
						))}
					</tr>
					{_range(3).map(x => (
						<tr key={x}>
							<th>{titles[x]}</th>
							{_range(3).map(y =>
								x === y ? (
									<td key={y}>-</td>
								) : (
									<td
										key={y}
										style={{
											width: '100px',
											height: '100px',
											fontSize: '3em',
										}}
										onClick={() => {
											setCells({
												...cells,
												[x]: {
													...cells[`${x}`],
													[y]: !cells[`${x}`][`${y}`],
												},
												[y]: {
													...cells[`${y}`],
													[x]: !cells[`${y}`][`${x}`],
												},
											})
										}}
									>
										{cells[`${y}`][`${x}`] ? 'o' : 'x'}
									</td>
								)
							)}
						</tr>
					))}
				</tbody>
			</table>
			<ul>
				{_map(rank, (v, i) => (
					<li key={i}>
						{i + 1}
						胃: {v.title} - {v.n}勝
					</li>
				))}
			</ul>
		</Wrap>
	)
}

const MakeRankPage = () => (
	<Layout title="テーブルトグル">
		<MakeRank />
	</Layout>
)

export default MakeRankPage
