import * as React from 'react'
import _ from 'lodash'
import { Decimal } from 'decimal.js'

import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts'
import { Typography } from '@material-ui/core'

type Plot = { x: number; y: number }

const geometricProgressionSumPlot = (r: number, x: number) => {
	const y = 1 - Math.pow(r, x)
	return {
		x,
		y: y * 100,
		z: y * Math.pow(r, x + 1) * 100,
	}
}

const genProOneX = (n: number) =>
	_.partial(geometricProgressionSumPlot, 1 - 1 / n)
const proOneTen = genProOneX(10)
const proOneHandred = genProOneX(100)
const proOneThousand = genProOneX(1000)

const dataTen: Plot[] = [..._.range(50), ..._.range(50, 101, 10)].map(proOneTen)
const dataHandred: Plot[] = [..._.range(100), ..._.range(100, 501, 10)].map(
	proOneHandred,
)
const dataThousand: Plot[] = [..._.range(100), ..._.range(100, 5001, 100)].map(
	proOneThousand,
)

function permutation(n, r) {
	return _.range(0, r).reduce((d, i) => d.times(n - i), new Decimal(1))
}

function combination(n, r) {
	return permutation(n, r).div(permutation(r, r))
}
function repeatTry(n, k, p) {
	const a = combination(n, k)
	const b = Decimal.pow(p, k)
	const c = Decimal.pow(1 - p, n - k)
	// console.log({ a: a.toFixed(4), b: b.toFixed(4), c: c.toFixed(4) })
	// console.log({ a, b, c })
	return a.times(b).times(c)
}

console.log(repeatTry(10, 1, 0.5).toFixed(10))
// const res = _.range(5).map(i => repeatTry(5, i, 0.5))
// コンマゾロメが i 回でる確率
const dataZorome: Plot[] = _.range(30).map(x => ({
	x,
	y: Number(repeatTry(1000, x, 0.01).toFixed(5)) * 100,
}))

function Graph({ data, unit = '%' }: { data: Plot[]; unit?: string }) {
	return (
		<ResponsiveContainer width="100%" aspect={8 / 3}>
			<LineChart data={data}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis type="number" dataKey="x" domain={['dataMin', 'dataMax']} />
				<YAxis unit={unit} />
				<Tooltip />
				<Legend />
				<Line
					isAnimationActive={false}
					type="monotone"
					dataKey="y"
					label={false}
					stroke="#8884d8"
					activeDot={{ r: 8 }}
				/>
			</LineChart>
		</ResponsiveContainer>
	)
}

function Graph2({ data, unit = '%' }: { data: Plot[]; unit?: string }) {
	return (
		<ResponsiveContainer width="100%" aspect={8 / 3}>
			<LineChart data={data}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis type="number" dataKey="x" domain={['dataMin', 'dataMax']} />
				<YAxis unit={unit} />
				<Tooltip />
				<Legend />
				<Line
					isAnimationActive={false}
					type="monotone"
					dataKey="y"
					label={false}
					name="到達する確率"
					stroke="#8884d8"
					activeDot={{ r: 8 }}
				/>
				<Line
					isAnimationActive={false}
					type="monotone"
					dataKey="z"
					name="で終わる確率"
					label={false}
					stroke="red"
					activeDot={{ r: 8 }}
				/>
			</LineChart>
		</ResponsiveContainer>
	)
}

const measureHoliday = h => {
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
_.range(24).reduce((p, h) => {
	const hourCount = 60 / measureHoliday(h)
	const y = hourCount + p
	dataHourSpeed.push({ x: h, y })
	return y
}, 0)

console.log(dataHandred)

function Probability() {
	return (
		<div>
			<Typography>ゾロ目確率</Typography>
			<div>
				<h2>レス回数 x コンマ2桁ゾロ目</h2>
				<h3>一回(1/10とする)</h3>
				<Graph2 data={dataTen} />
			</div>
			<div>
				<h2>レス回数 x コンマ3桁ゾロ目</h2>
				<h3>一回(1/100とする)</h3>
				<Graph2 data={dataHandred} />
			</div>
			<div>
				<h2>レス回数 x 特定のコンマ</h2>
				<h3>一回(1/1000とする)</h3>
				<Graph2 data={dataThousand} />
			</div>
			<div>
				<h2>1000レスでコンマゾロ目がx回出る確率</h2>
				<h3>ゾロ目(1/100とする)</h3>
				<Graph data={dataZorome} />
			</div>
			<Typography variant="h3">勢い目安</Typography>
			<div>
				<h2>時間ごとの最低勢い</h2>
				<h3>勢いは(post count/day)とする</h3>
				<Graph data={dataHourSpeed} unit="レス" />
			</div>
		</div>
	)
}

export default Probability
