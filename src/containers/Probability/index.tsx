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

const proOneHundred = _.partial(geometricProgressionSum, 1 / 100, 99 / 100)
const dataA: Plot[] = _.range(0, 501).map(i => ({
	x: i,
	y: proOneHundred(i) * 100,
}))

const proOneTenth = _.partial(geometricProgressionSum, 1 / 10, 9 / 10)
const dataB: Plot[] = _.range(0, 101).map(i => ({
	x: i,
	y: proOneTenth(i) * 100,
}))

function Probability() {
	return (
		<div>
			<div>
				<h2>コンマ3桁ゾロ目確率</h2>
				<h3>一回(1/100とする)</h3>

				<ResponsiveContainer width="100%" aspect={8 / 3}>
					<LineChart data={dataA}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="x" />
						<YAxis unit="%" />
						<Tooltip />
						<Legend />
						<Line
							type="monotone"
							dataKey="y"
							stroke="#8884d8"
							activeDot={{ r: 8 }}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
			<div>
				<h2>コンマ2桁ゾロ目確率</h2>
				<h3>一回(1/10とする)</h3>
				<ResponsiveContainer width="100%" aspect={8 / 3}>
					<LineChart data={dataB}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="x" />
						<YAxis unit="%" />
						<Tooltip />
						<Legend />
						<Line
							type="monotone"
							dataKey="y"
							label={false}
							stroke="#8884d8"
							activeDot={{ r: 8 }}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</div>
	)
}

export default Probability
