import axios from 'axios'
import * as React from 'react'
import styled from 'styled-components'

type PingLog = { host: string; speed: number; ok: boolean }

type State = {
	url: string
	pingLog: PingLog[]
	loading: boolean
}

const getPage = async (url: string) => {
	const res = await axios.get(url)
	console.log(res)
}

class Mushimegane extends React.Component<{}, State> {
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
				<p>スレのレス数をリアルタイムに監視</p>
				<p>スレのURL↓</p>
				<Input
					type="text"
					value={state.url}
					onChange={e => {
						const url = e.target.value
						this.setState({ url, loading: true })
					}}
				/>
				<button
					onClick={async () => {
						getPage(this.state.url)
					}}
				>
					get
				</button>
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

export default Mushimegane
