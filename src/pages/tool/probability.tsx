import _partial from 'lodash/partial'
import _range from 'lodash/range'
import { Chart } from 'react-google-charts'
import { Decimal } from 'decimal.js'

import { Typography } from '@material-ui/core'
import { useRef, useEffect, useState } from 'react'
import Layout from '../../components/Layout'

type Plot = (number | string)[]

const geometricProgressionSumPlot = (r: number, x: number) => {
	const y = 1 - Math.pow(r, x)

	return [x, y * 100, y * Math.pow(r, x + 1) * 100]
}

type Size = { height: number; width: number }

const genProOneX = (n: number) =>
	_partial(geometricProgressionSumPlot, 1 - 1 / n)
const proOneTen = genProOneX(10)
const proOneHandred = genProOneX(100)
const proOneThousand = genProOneX(1000)

const dataTen: Plot[] = [..._range(50), ..._range(50, 101, 10)].map(proOneTen)
const dataHandred: Plot[] = [..._range(100), ..._range(100, 501, 10)].map(
	proOneHandred
)
const dataThousand: Plot[] = [..._range(100), ..._range(100, 5001, 100)].map(
	proOneThousand
)

function permutation(n: number, r: number) {
	return _range(0, r).reduce((d, i) => d.times(n - i), new Decimal(1))
}

function combination(n: number, r: number) {
	return permutation(n, r).div(permutation(r, r))
}
function repeatTry(n: number, k: number, p: number) {
	const a = combination(n, k)
	const b = Decimal.pow(p, k)
	const c = Decimal.pow(1 - p, n - k)
	// console.log({ a: a.toFixed(4), b: b.toFixed(4), c: c.toFixed(4) })
	// console.log({ a, b, c })

	return a.times(b).times(c)
}

console.log(repeatTry(10, 1, 0.5).toFixed(10))
// const res = _range(5).map(i => repeatTry(5, i, 0.5))
// コンマゾロメが i 回でる確率
const dataZorome: Plot[] = _range(30).map((x) => [
	x,
	Number(repeatTry(1000, x, 0.01).toFixed(5)) * 100,
])

function Graph({ data, size }: { data: Plot[]; size: Size }) {
	return (
		<Chart
			width={`${size.width}px`}
			height={`${size.height}px`}
			chartType="LineChart"
			loader={<div>Loading Chart</div>}
			data={data}
			options={{
				hAxis: {
					title: String(data[0][0]),
				},
				vAxis: {
					title: String(data[0][1]),
				},
			}}
			rootProps={{ 'data-testid': '1' }}
		/>
	)
}

function Graph2({ data, size }: { data: Plot[]; size: Size }) {
	return (
		<Chart
			width={`${size.width}px`}
			height={`${size.height}px`}
			chartType="LineChart"
			loader={<div>Loading Chart</div>}
			data={data}
			options={{
				hAxis: {
					title: 'レス',
				},
				vAxis: {
					title: '確率(%)',
				},
			}}
			rootProps={{ 'data-testid': '1' }}
		/>
	)
}

const measureHoliday = (h: number) => {
	if (h < 2) return 10
	if (h < 4) return 20
	if (h < 9) return 40
	if (h < 16) return 15
	if (h < 19) return 10
	return 5
}

// const measureDay = h => {
// 	if (h < 2) return 15
// 	if (h < 4) return 25
// 	if (h < 9) return 45
// 	if (h < 16) return 25
// 	if (h < 19) return 15
// 	return 5
// }
const dataHourSpeed: Plot[] = []

_range(24).reduce((p, h) => {
	const hourCount = 60 / measureHoliday(h)
	const y = hourCount + p

	dataHourSpeed.push([h, y])
	return y
}, 0)

console.log(dataHandred)

function Probability() {
	const [size, setSize] = useState<Size>({ height: 100, width: 100 })
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const width = ref.current?.clientWidth
		const aspect = 3 / 8

		if (!width) return
		setSize({ width, height: width * aspect })
	}, [ref.current])

	return (
		<div ref={ref}>
			<Typography>ゾロ目確率</Typography>
			<div>
				<h2>レス回数 x コンマ2桁ゾロ目</h2>
				<h3>一回(1/10とする)</h3>
				<Graph2
					size={size}
					data={[['確率(%)', '到達する確率', 'で終わる確率'], ...dataTen]}
				/>
			</div>
			<div>
				<h2>レス回数 x コンマ3桁ゾロ目</h2>
				<h3>一回(1/100とする)</h3>
				<Graph2
					size={size}
					data={[['確率(%)', '到達する確率', 'で終わる確率'], ...dataHandred]}
				/>
			</div>
			<div>
				<h2>レス回数 x 特定のコンマ</h2>
				<h3>一回(1/1000とする)</h3>
				<Graph2
					size={size}
					data={[['確率(%)', '到達する確率', 'で終わる確率'], ...dataThousand]}
				/>
			</div>
			<div>
				<h2>1000レスでコンマゾロ目がx回出る確率</h2>
				<h3>ゾロ目(1/100とする)</h3>
				<Graph size={size} data={[['レス数', '確率(%)'], ...dataZorome]} />
			</div>
			<Typography variant="h3">勢い目安</Typography>
			<div>
				<h2>最低限落ちないようにキープした場合のレス数</h2>
				<h3>勢いは(post count/day)とする</h3>
				<Graph size={size} data={[['時間', 'レス数'], ...dataHourSpeed]} />
			</div>
		</div>
	)
}

const ProbabilityPage = () => (
	<Layout title="5chコンマ確率表">
		<Probability />
	</Layout>
)

export default ProbabilityPage
