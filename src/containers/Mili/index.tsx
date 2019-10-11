import moment from 'moment'
import Slider from 'rc-slider'
// eslint-disable-next-line
import 'rc-slider/assets/index.css'
import * as React from 'react'
import styled from 'styled-components'

type State = {
	timeStr: string
	timeMili: number
	diffMili: number
	timer: number | null
}

class Mili extends React.Component<{}, State> {
	state = {
		timeStr: 'xx',
		timeMili: 0,
		diffMili: 0,
		timer: null as number | null,
	}
	componentDidMount() {
		const timer = setInterval(() => {
			const m = moment().add(this.state.diffMili, 'millisecond')

			this.setState({
				timeStr: m.format('HH:MM:ss.SS'),
				timeMili: m.millisecond(),
			})
		}, 10)

		this.setState({ timer })
	}
	componentWillUnmount() {
		const { timer } = this.state

		if (timer !== null) {
			clearInterval(timer)
		}
	}

	render() {
		return (
			<div>
				<TimeView>{this.state.timeStr}</TimeView>
				<div style={{ width: '100%' }}>
					<Bar par={Math.floor(this.state.timeMili / 10)} />
				</div>
				ずらし(コンマ -999〜+999)
				<Input
					type="number"
					min="-999"
					max="999"
					value={this.state.diffMili}
					onChange={e => {
						this.setState({ diffMili: Number(e.target.value) })
					}}
				/>
				<Slider
					min={-1000}
					max={1000}
					value={this.state.diffMili}
					onChange={diffMili => {
						this.setState({ diffMili })
					}}
				/>
			</div>
		)
	}
}

const Input = styled.input`
	margin: 4px 1em;
	border-radius: 4px;
	font-size: 30px;
`

const TimeView = styled.h4`
	width: 100%;
	text-align: center;
	font-family: monospace;
	font-size: 13vw;
	padding: 12px;
	margin: 0;
`
const Bar = styled.div<{ par: number }>`
	background: black;
	height: 10px;
	width: ${p => p.par}%;
`

export default Mili
