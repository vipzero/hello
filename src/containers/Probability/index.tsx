import * as React from 'react'
import _ from 'lodash'
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

function geometricProgressionSum(a: number, r: number, n: number) {
	return (a * (1 - Math.pow(r, n))) / (1 - r)
}
const toPlot = (x: number): Plot => ({ x, y: proOneHundred(x) * 100 })

const proOneHundred = _.partial(geometricProgressionSum, 1 / 100, 99 / 100)
const dataA: Plot[] = [..._.range(10), ..._.range(10, 501, 10)].map(toPlot)

const proOneTenth = _.partial(geometricProgressionSum, 1 / 10, 9 / 10)
const dataB: Plot[] = [..._.range(50), ..._.range(50, 101, 10)].map(i => ({
	x: i,
	y: proOneTenth(i) * 100,
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
				<h2>コンマ3桁ゾロ目確率</h2>
				<h3>一回(1/100とする)</h3>

				<Graph data={dataA} />
			</div>
			<div>
				<h2>コンマ2桁ゾロ目確率</h2>
				<h3>一回(1/10とする)</h3>
				<Graph data={dataB} />
			</div>
		</div>
	)
}

export default Probability
