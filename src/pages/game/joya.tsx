import * as React from 'react'
import { Typography } from '@material-ui/core'
import Layout from '../../components/Layout'

export type BoardLink = {
	name: string
	url: string
}

function Noise({ active }: { active: boolean }) {
	const [timeout, setTimeout] = React.useState<number | null>(null)
	const [numstr, setNumstr] = React.useState<string>('00')

	React.useEffect(() => {
		if (!active) {
			if (timeout) {
				clearInterval(timeout)
			}
			return
		}
		const randNumOneStr = () => String(Math.floor((Math.random() * 10) % 10))
		const newTimeout = setInterval(() => {
			setNumstr(randNumOneStr() + randNumOneStr())
		}, 10)

		setTimeout(newTimeout)

		return () => {
			clearInterval(newTimeout)
		}
	}, [active])
	return <>{numstr}</>
}

const timeStr = (time: number, showMs = false) => {
	const m = `${Math.floor(time / 1000 / 60)}`
	const s = `${Math.floor((time / 1000) % 60)}`.padStart(2, '0')
	const ms = `${Math.floor((time / 100) % 10)}`

	return `${m}:${s}.${showMs ? time % 1000 : ms}`
}

function Joya() {
	const [startTime, setStart] = React.useState<number>(0)
	const [time, setTime] = React.useState<number>(0)
	const [count, setCount] = React.useState<number>(0)
	const [result, setResult] = React.useState<number>(0)
	const [bomb, setBomb] = React.useState<boolean>(false)

	React.useEffect(() => {
		if (!startTime) {
			return
		}
		const timer = setInterval(() => {
			setTime(+new Date() - startTime)
		}, 100)

		return () => {
			clearInterval(timer)
		}
	}, [startTime])

	if (bomb) {
		return (
			<>
				<Typography variant="h3">{count}</Typography>
				<Typography variant="h2">
					<span role="img" aria-label="bell">
						💥
					</span>
				</Typography>
			</>
		)
	}

	return (
		<div style={{ margin: '0 20px' }}>
			<Typography variant="h5">除夜の鐘チャレンジ</Typography>
			{result === 0 ? (
				<Typography variant="h3">
					{timeStr(time)}
					<Noise active={startTime !== 0} />
				</Typography>
			) : (
				<Typography variant="h3">{timeStr(result, true)}</Typography>
			)}
			<Typography variant="h3">{count}</Typography>
			<div
				style={{ userSelect: 'none' }}
				onClick={() => {
					if (startTime === 0) {
						setStart(+new Date())
					}
					setCount(count + 1)
					if (count + 1 === 108) {
						setResult(+new Date() - startTime)
					}
					if (count + 1 > 108) {
						setBomb(true)
					}
				}}
			>
				<Typography
					variant="h2"
					style={{
						fontSize: '50vmin',
						textAlign: 'center',
					}}
				>
					<span role="img" aria-label="bell">
						🔔
					</span>
				</Typography>
			</div>
		</div>
	)
}

const JoyaPage = () => (
	<Layout title="マイケル発狂ジェネレータ">
		<Joya />
	</Layout>
)

export default JoyaPage
