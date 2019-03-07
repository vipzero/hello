import _ from 'lodash'
import moment from 'moment'
import * as React from 'react'
import styled from 'styled-components'

type State = {
	time: string
	timer: NodeJS.Timeout | null
}
class Mili extends React.Component<{}, State> {
	state = { time: 'xx', timer: null as NodeJS.Timeout | null }
	componentDidMount() {
		const timer = setInterval(() => {
			this.setState({ time: moment().format('HH:MM:ss.SSS') })
		}, 10)
		this.setState({ timer })
	}
	componentWillUnmount() {
		if (this.state.timer !== null) {
			clearInterval(this.state.timer)
		}
	}

	render() {
		return (
			<div>
				<TimeView>{this.state.time}</TimeView>
				<p>妥当コンマスレ</p>
			</div>
		)
	}
}

const TimeView = styled.h4`
	width: 100%;
	text-align: center;
	font-family: monospace;
	font-size: 13vw;
	padding: 12px;
	margin: 0;
`

export default Mili
