import * as React from 'react'

import styled from 'styled-components'
import { Monument } from './Monument'

type Props = {}

type State = {
	x: number
	y: number
}

class Home extends React.Component<Props, State> {
	state = { x: 0, y: 0 }

	_onMouseMove(e) {
		console.log(e)
		console.log(e.clientX, e.clientY)
		this.setState({ x: e.clientX, y: e.clientY })
	}

	render() {
		return (
			<Wrap>
				<Center>
					<div>俺</div>
					<Monument />
				</Center>
			</Wrap>
		)
	}
}

const Wrap = styled.div`
	width: 100vw;
	height: 100vh;
`

const Center = styled.div`
	margin: 50vh 50vw;
`

export default Home
