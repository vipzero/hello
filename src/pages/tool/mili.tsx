// eslint-disable-next-line
import { Slider } from '@material-ui/core'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Layout from '../../components/Layout'

function Mili() {
	const [timeStr, setTimeStr] = useState<string>('xx')
	const [timeMili, setTimeMili] = useState<number>(0)
	const [diffMili, setDiffMili] = useState<number>(0)

	useEffect(() => {
		const timer = setInterval(() => {
			const now = Date.now()
			const h = Math.floor(((now / 1000 / 60 / 60) % 24) + 9) % 24
			const m = Math.floor(now / 1000 / 60) % 60
			const s = Math.floor(now / 1000) % 60
			const ms = now % 1000

			setTimeStr(
				`${h}`.padStart(2, '0') +
					':' +
					`:${m}`.padStart(2, '0') +
					':' +
					`${s}`.padStart(2, '0') +
					`.${Math.floor(ms / 100)}`
			)
			setTimeMili(ms)
		}, 100)

		return () => {
			clearInterval(timer)
		}
	}, [])

	return (
		<Layout title="コンママスター">
			<TimeView>{timeStr}</TimeView>
			<div style={{ width: '100%' }}>
				<Bar
					style={{ width: `${((timeMili + diffMili + 1000) % 1000) / 10}%` }}
				/>
			</div>
			ずらし(コンマ -999〜+999)
			<Input
				type="number"
				min="-999"
				max="999"
				value={diffMili}
				onChange={(e) => {
					setDiffMili(Number(e.target.value))
				}}
			/>
			<Slider
				min={-1000}
				max={1000}
				// value={diffMili}
				onChangeCommitted={(e, value) => {
					setDiffMili(Number(value))
				}}
			/>
		</Layout>
	)
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
const Bar = styled.div`
	background: black;
	height: 10px;
`

export default Mili
