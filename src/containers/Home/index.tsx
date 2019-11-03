import * as React from 'react'

import styled from 'styled-components'

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
					<div style={{ width: '100px', height: '100px' }}></div>
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
	top: 50vw;
	left: 50vh;
`

export default Home
