import * as React from 'react'
import { connect } from 'react-redux'

import styled, { keyframes } from 'styled-components'

import { State as RootState } from '../../types'
type Props = {}

type State = {
	x: number
	y: number
}

class Home extends React.Component<Props, State> {
	state = { x: 0, y: 0 }

	componentDidMount() {}

	_onMouseMove(e) {
		console.log(e)
		console.log(e.clientX, e.clientY)
		this.setState({ x: e.clientX, y: e.clientY })
	}

	render() {
		const { state } = this
		return (
			<Wrap>
				<Center>
					<div>俺</div>
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

const ms = (state: RootState) => ({})

const conn = connect(
	ms,
	{},
)

export default conn(Home)
