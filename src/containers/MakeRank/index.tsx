import _ from 'lodash'
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
	componentDidMount() {}

	render() {
		const { state } = this
		const nums = _.range(3).map(i => ({
			n: _.sum(_.values(state.cells[`${i}`])),
			title: titles[i],
		}))
		const rank = _.reverse(_.sortBy(nums, 'n'))
		console.log(rank)
		return (
			<Wrap>
				<table>
					<tr>
						<th>強いのどっち</th>
						{_.range(3).map(x => (
							<th key={x}>{titles[x]}</th>
						))}
					</tr>
					{_.range(3).map(x => (
						<tr key={x}>
							<th>{titles[x]}</th>
							{_.range(3).map(y =>
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
								),
							)}
						</tr>
					))}
				</table>
				<ul>
					{_.map(rank, (v, i) => (
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
