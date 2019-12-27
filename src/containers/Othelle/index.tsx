import * as React from 'react'

import _range from 'lodash/range'
import { Typography, Button } from '@material-ui/core'
import styled from 'styled-components'

// eslint-disable-next-line

type Stone = 'b' | 'w' | '-'
type Board = Stone[]

function isStone(v: string): v is Stone {
	return v === 'b' || v === 'w' || v === '-'
}

const initialBoard: Board = '----bw----'.split('').filter(isStone)

// eslint-disable-next-line
const StoneButton = styled(Button)`
	&[data-hand='b'] {
		color: white;
		background: black;
	}

	&[data-hand='w'] {
		background: white;
	}
`

function Othelle() {
	const [hand, setHand] = React.useState<Stone>('b')
	const handRev = hand === 'w' ? 'b' : 'w'
	const [board, setBoard] = React.useState<Board>(initialBoard)

	return (
		<div style={{ margin: '0 20px' }}>
			<Typography variant="h4" style={{ margin: '12px 20px' }}>
				オセロ！
			</Typography>
			<Typography variant="h6" style={{ margin: '12px 20px' }}>
				{hand}の番です
			</Typography>
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: `repeat(${board.length}, 1fr)`,
					gridGap: '8px',
					justifyContent: 'flex-start',
				}}
			>
				{board.map((stone, i) => {
					return (
						<StoneButton
							variant="contained"
							data-hand={stone}
							style={{ height: '10vh' }}
							key={i}
							onClick={() => {
								const b = [...board]

								b[i] = hand
								const reversible = (h1: Stone, h2: Stone) =>
									h1 === h2 && h2 !== '-'

								if (_range(i + 1, b.length).some(j => reversible(hand, b[j]))) {
									_range(i + 1, b.length).every(j => {
										if (reversible(hand, b[j])) {
											return false
										}

										b[j] = hand
										return true
									})
								}
								if (_range(i - 1, -1).some(j => reversible(hand, b[j]))) {
									_range(i - 1, -1).every(j => {
										if (reversible(hand, b[j])) {
											return false
										}

										b[j] = hand
										return true
									})
								}
								setBoard(b)
								setHand(handRev)
							}}
						>
							{stone}
						</StoneButton>
					)
				})}
			</div>
		</div>
	)
}

export default Othelle
