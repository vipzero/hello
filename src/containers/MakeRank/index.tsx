import _range from 'lodash/range'
import _sum from 'lodash/sum'
import _map from 'lodash/map'
import * as React from 'react'

import styled from 'styled-components'

const Wrap = styled.div``
const titles = ['vipper', 'うんこ', 'ちんこ']

type State = {
	cells: { [y: string]: { [x: string]: boolean } }
}

class MakeRank extends React.Component<{}, State> {
	state = {
		cells: {
			'0': { '0': false, '1': true, '2': true },
			'1': { '0': false, '1': false, '2': true },
			'2': { '0': false, '1': false, '2': false },
		},
	}

	render() {
		const { state } = this
		const rank = _range(3).map(i => ({
			n: _sum(Object.values(state.cells[`${i}`])),
			title: titles[i],
		}))

		rank.sort((a, b) => b.n - a.n)

		console.log(rank)
		return (
			<Wrap>
				<table>
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
											this.setState({
												cells: {
													...state.cells,
													[x]: {
														...state.cells[`${x}`],
														[y]: !state.cells[`${x}`][`${y}`],
													},
													[y]: {
														...state.cells[`${y}`],
														[x]: !state.cells[`${y}`][`${x}`],
													},
												},
											})
										}}
									>
										{state.cells[`${y}`][`${x}`] ? 'o' : 'x'}
									</td>
								)
							)}
						</tr>
					))}
				</table>
				<ul>
					{_map(rank, (v, i) => (
						<li>
							{i + 1}
							胃: {v.title} - {v.n}勝
						</li>
					))}
				</ul>
			</Wrap>
		)
	}
}

export default MakeRank
