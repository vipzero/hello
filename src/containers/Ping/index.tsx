import _ from 'lodash'
import * as React from 'react'
import styled from 'styled-components'

type PingLog = { host: string; speed: number; ok: boolean }

type State = {
	url: string
	pingLog: PingLog[]
	loading: boolean
}

const ping = (url: string) => {
	return new Promise<number>((resolve, reject) => {
		const start = Date.now()

		const img = new Image()
		img.onload = () => {
			resolve(Date.now() - start)
		}
		img.onerror = e => {
			console.log(e)
			resolve(Date.now() - start)
		}

		try {
			img.src = 'http://' + url
		} catch (e) {
			console.log(e)
		}
		const timer = setTimeout(function() {
			reject()
		}, 1500)
	})
}

class Ping extends React.Component<{}, State> {
	state = {
		url: '',
		pingLog: [] as PingLog[],
		loading: false,
	}
	componentDidMount() {}

	render() {
		const { state } = this
		return (
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					flexDirection: 'column',
				}}
			>
				<p>作成中断なう</p>
				<Input
					type="text"
					value={state.url}
					onChange={e => {
						const url = e.target.value
						this.setState({ url, loading: true })
						ping(url)
							.then(speed => {
								this.setState({
									pingLog: [...state.pingLog, { host: url, speed, ok: true }],
									loading: false,
								})
							})
							.catch(e => {
								this.setState({
									pingLog: [
										...state.pingLog,
										{ host: url, speed: 0, ok: false },
									],
									loading: false,
								})
								return false
							})
					}}
				/>
				{state.loading && <span>~loading~</span>}
				<div>
					{state.pingLog.map((log, i) => (
						<div key={i} style={{ display: 'flex', justifyContent: 'center' }}>
							{log.host}
							<span>{log.ok ? 'OK' : 'NG'}</span>
							<span>{log.speed}</span>
						</div>
					))}
				</div>
			</div>
		)
	}
}

const Input = styled.input`
	margin: 4px 1em;
	width: 80%;
	border-radius: 4px;
	font-size: 30px;
`

export default Ping
