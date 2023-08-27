// eslint-disable-next-line
import { Slider } from '@mui/material'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Layout from '../../components/Layout'
import { useSynth } from '../../components/tone'
import { useSeconds } from 'use-seconds'

function Mili() {
	const [timeStr, setTimeStr] = useState<string>('xx')
	const [timeMili, setTimeMili] = useState<number>(0)
	const [diffMili, setDiffMili] = useState<number>(0)
	const [soundOn, setSoundOn] = useState<boolean>(false)
	const { sound } = useSynth()

	const [time] = useSeconds(diffMili)
	const [just] = useSeconds(0, 10)
	const now = +just

	useEffect(() => {
		if (soundOn) {
			sound()
		}
	}, [+time])

	useEffect(() => {
		console.log('tick')

		const h = Math.floor(((now / 1000 / 60 / 60) % 24) + 9) % 24
		const m = Math.floor(now / 1000 / 60) % 60
		const s = Math.floor(now / 1000) % 60
		const ms = now % 1000

		setTimeStr(
			`${h}`.padStart(2, '0') +
				':' +
				`${m}`.padStart(2, '0') +
				':' +
				`${s}`.padStart(2, '0') +
				`.${Math.floor(ms / 100)}`
		)
		setTimeMili(ms)
	}, [now])

	return (
		<Layout title="コンママスター">
			<TimeView>{timeStr}</TimeView>
			<div style={{ width: '100%' }}>
				<Bar style={{ width: `${timeMili / 10}%` }} />
			</div>
			<div style={{ width: '100%' }}>
				<Bar
					style={{
						width: `${((timeMili - diffMili + 1000) % 1000) / 10}%`,
						background: 'red',
					}}
				/>
			</div>
			<div style={{ padding: '8px' }}>
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
				<div>
					<input
						id="sound"
						type="checkbox"
						checked={soundOn}
						onChange={(e) => setSoundOn(e.target.checked)}
					/>
					<label htmlFor="sound">音</label>
				</div>
			</div>
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
	margin: 4px 1rem;
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
