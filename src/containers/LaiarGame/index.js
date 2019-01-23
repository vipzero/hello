// @flow
import * as React from 'react'
import { connect } from 'react-redux'

import styled, { keyframes } from 'styled-components'
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

class LaiarGame extends React.Component<{}, { search: string }> {
	state = { search: '' }
	componentDidMount() {}

	render() {
		const { search } = this.state
		return (
			<div>
				<table sytle={{ minWidth: '1000px' }}>
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
								<th style={{ width: '10vw' }}>{h1}</th>
								{hands.map(h2 => {
									const key = `#${h1}${h2}`
									const trip = tripTable[`#${h1}${h2}`]
									return (
										<td key={h2}>
											<Trip
												name={key}
												trip={trip}
												search={search !== ''}
												hit={trip.indexOf(search) !== -1}
											/>
										</td>
									)
								})}
							</tr>
						))}
					</tbody>
				</table>
				<div style={{ margin: '4px 20px' }}>
					検索:{' '}
					<input
						type="text"
						style={{ fontSize: '1.3em' }}
						onChange={e => {
							const search = e.target.value
							this.setState({ search })
						}}
					/>
				</div>
			</div>
		)
	}
}
const Trip = (props: {
	name: string,
	trip: string,
	search: boolean,
	hit: boolean,
}) => (
	<TripWrap data-search={props.search} data-hit={props.hit}>
		<code>{props.name}</code>
		<code style={{ marginTop: '4px' }}>{props.trip}</code>
	</TripWrap>
)
const blink = keyframes`
  from {
    transform: rotate(0deg);
		background: yellow;
  }

  to {
    transform: rotate(360deg);
		background: yellowgreen;
  }
`

const TripWrap = styled.div`
	width: 10vw;
	height: 9vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border: solid 1px black;
	&[data-search='true'] {
		&[data-hit='true'] {
			background: yellowgreen;
			animation: ${blink} 10s linear infinite;
		}
		&[data-hit='false'] {
			background: #aaa;
		}
	}
`

const ms = (state: RootState) => ({})

const conn = connect(
	ms,
	{},
)

export default conn(LaiarGame)
