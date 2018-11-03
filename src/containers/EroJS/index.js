// @flow
import * as React from 'react'
import { connect } from 'react-redux'

import styled from 'styled-components'

import type { State as RootState } from '../../types'

const Wrap = styled.div``
const Code = styled.div`
	margin: 10px;
	padding: 5px;
	background: #ddd;
	border-radius: 3px;
	max-width: 600px;
`
const Line = styled.pre`
	font-size: 30px;
	font-family: 'Nova Mono', monospace;
	line-height: 35px;
	margin: 0;
`

class MakeRank extends React.Component<*> {
	componentDidMount() {}

	render() {
		return (
			<Wrap>
				<Code>
					<Line>import ero from 'ero'</Line>
					<Line>import world from 'world'</Line>
					<Line>ero.save(world)</Line>
				</Code>
			</Wrap>
		)
	}
}

const ms = (state: RootState) => ({})

const conn = connect(
	ms,
	{},
)

export default conn(MakeRank)
