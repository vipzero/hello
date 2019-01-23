// @flow
import * as React from 'react'
import { connect } from 'react-redux'

import styled from 'styled-components'
import genTrip from '2ch-trip'

import type { State as RootState } from '../../types'

const hands = [
	'微税',
	'重税',
	'戦争',
	'豪商',
	'盗賊',
	'暗殺者',
	'道化師',
	'騎士',
]

const tripTable = {}
hands.forEach(h1 =>
	hands.forEach(h2 => {
		const key = `#${h1}${h2}`
		tripTable[key] = genTrip(key)
	}),
)

class LaiarGame extends React.Component<*> {
	componentDidMount() {}

	render() {
		return (
			<table>
				<thead>
					<tr>
						<th />
						{hands.map(hand => (
							<th key={hand}>{hand}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{hands.map(h1 => (
						<tr key={h1}>
							<th>{h1}</th>
							{hands.map(h2 => {
								const key = `#${h1}${h2}`
								return (
									<td key={h2}>
										<Trip name={key} trip={tripTable[`#${h1}${h2}`]} />
									</td>
								)
							})}
						</tr>
					))}
				</tbody>
			</table>
		)
	}
}
const Trip = (props: { name: string, trip: string }) => (
	<TripWrap>
		<code>{props.name}</code>
		<code>{props.trip}</code>
	</TripWrap>
)
const TripWrap = styled.div`
	width: 10vw;
	height: 10vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border: solid 1px black;
`
const Code = styled.code``

const ms = (state: RootState) => ({})

const conn = connect(
	ms,
	{},
)

export default conn(LaiarGame)
