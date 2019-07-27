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

type Plot = { x: number; y: number }

const geometricProgressionSumPlot = (r: number, x: number) => ({
	x,
	y: (1 - Math.pow(r, x)) * 100,
})

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

function Graph({ data }: { data: Plot[] }) {
	return (
		<ResponsiveContainer width="100%" aspect={8 / 3}>
			<LineChart data={data}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis type="number" dataKey="x" domain={['dataMin', 'dataMax']} />
				<YAxis unit="%" />
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

function Probability() {
	return (
		<div>
			<div>
				<h2>コンマ2桁ゾロ目確率</h2>
				<h3>一回(1/10とする)</h3>
				<Graph data={dataTen} />
			</div>
			<div>
				<h2>コンマ3桁ゾロ目確率</h2>
				<h3>一回(1/100とする)</h3>
				<Graph data={dataHandred} />
			</div>
			<div>
				<h2>特定のコンマ確率</h2>
				<h3>一回(1/1000とする)</h3>
				<Graph data={dataThousand} />
			</div>
			<div>
				<h2>1000レスでコンマゾロ目がx回出る確率</h2>
				<h3>ゾロ目(1/100とする)</h3>
				<Graph data={dataZorome} />
			</div>
		</div>
	)
}

export default Probability
