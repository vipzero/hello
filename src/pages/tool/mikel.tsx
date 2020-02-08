import * as React from 'react'
import _range from 'lodash/range'
import _sample from 'lodash/sample'
import { Typography, Slider, TextField } from '@material-ui/core'
import Layout from '../../components/Layout'

export type BoardLink = {
	name: string
	url: string
}
const ec = () => (Math.random() < 0.1 ? '１' : '！')
const ecs = (n: number) =>
	_range(_sample([n - 1, n, n + 1]) || n)
		.map(ec)
		.join('')

const wcs = (n: number) =>
	_range(_sample([n - 1, n, n + 1]) || n)
		.map(() => 'ｗ')
		.join('')

function Mikel() {
	const [title, setTitle] = React.useState<string>('タイトル')
	const [w1, setW1] = React.useState<string>('りんご')
	const [w2, setW2] = React.useState<string>('タンゴ')
	const [w3, setW3] = React.useState<string>('A5')
	const [w4, setW4] = React.useState<string>('英語')
	const [w5, setW5] = React.useState<string>('ｱｱｱｱｱ')
	const [speed, setSpeed] = React.useState<number>(5)
	const text = `${title}${ecs(speed)}${title}${ecs(speed + 3)}
${w1}${wcs(speed)}${w2}${wcs(speed)}
${w2}${_sample('でにをは'.split(''))}${w3}？${wcs(speed + 10)}
${w4}${ecs(speed + 2)}
${w5}${_sample(['........', '!!!!!!!!!'])}
`

	return (
		<div style={{ margin: '0 20px' }}>
			<Typography variant="h5">マイコーズ</Typography>
			<div
				style={{
					display: 'grid',
					gridGap: '8px',
					gridTemplateColumns: 'max-content max-content max-content',
					justifyContent: 'flex-start',
				}}
			>
				<div>
					<Typography variant="caption">テンションい</Typography>
					<Slider
						defaultValue={5}
						step={1}
						marks
						min={3}
						max={10}
						onChange={(e, v) => setSpeed(typeof v === 'number' ? v : v[0])}
						valueLabelDisplay="auto"
					/>
				</div>
				<TextField
					label="タイトル(カタカナ)"
					value={title}
					onChange={e => setTitle(e.target.value)}
				/>
				<TextField
					label="ワード1"
					value={w1}
					onChange={e => setW1(e.target.value)}
				/>
				<TextField
					label="ワード2"
					value={w2}
					onChange={e => setW2(e.target.value)}
				/>
				<TextField
					label="ワード3"
					value={w3}
					onChange={e => setW3(e.target.value)}
				/>
				<TextField
					label="ワード4"
					value={w4}
					onChange={e => setW4(e.target.value)}
				/>
				<TextField
					label="締め(半角)"
					value={w5}
					onChange={e => setW5(e.target.value)}
				/>
			</div>
			<div>
				<TextField multiline value={text} />
			</div>
		</div>
	)
}

const MikelPage = () => (
	<Layout title="マイケル発狂ジェネレータ">
		<Mikel />
	</Layout>
)

export default MikelPage
