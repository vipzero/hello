import genTrip from '2ch-trip'
import styled, { keyframes } from 'styled-components'
import { useState } from 'react'
import Layout from '../../components/Layout'

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

const tripTable: Record<string, string> = {}

hands.forEach((h1) =>
	hands.forEach((h2) => {
		const key = `#${h1}${h2}`

		tripTable[key] = genTrip(key)
	})
)

function LaiarGame() {
	const [search, setSearch] = useState<string>('')

	return (
		<Style>
			<table>
				<thead>
					<tr>
						<th />
						{hands.map((hand) => (
							<th key={hand}>{hand}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{hands.map((h1) => (
						<tr key={h1}>
							<th className="first">{h1}</th>
							{hands.map((h2) => {
								const key = `#${h1}${h2}`
								const trip = tripTable[`#${h1}${h2}`]

								return (
									<td key={h2}>
										<Trip
											name={key}
											trip={trip}
											search={search !== ''}
											hit={trip.includes(search)}
										/>
									</td>
								)
							})}
						</tr>
					))}
				</tbody>
			</table>
			<div>
				検索:{' '}
				<input
					type="text"
					onChange={({ target: { value } }) => setSearch(value)}
				/>
			</div>
		</Style>
	)
}

const Style = styled.div`
	table {
		min-width: 1000px;
		th.first {
			width: 10vw;
		}
	}
	> div {
		margin: 4px 20px;
		input {
			font-size: 1.3rem;
		}
	}
`

const Trip = (props: {
	name: string
	trip: string
	search: boolean
	hit: boolean
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

const LaiarGamePage = () => (
	<Layout title="LaiarGame Tool">
		<LaiarGame />
	</Layout>
)

export default LaiarGamePage
