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
		</div>
	)
}

export default Probability
