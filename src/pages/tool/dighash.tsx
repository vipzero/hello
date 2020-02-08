import * as React from 'react'
import { Button, Typography, TextField } from '@material-ui/core'
import genTrip from '2ch-trip'
import Layout from '../../components/Layout'

type HashPair = {
	source: string
	tri: string
}

function DigHash() {
	const [search, setSearch] = React.useState<string>('aa|bb')
	const [prefix, setPrefix] = React.useState<string>(String(Math.random()))
	const [speed, setSpeed] = React.useState<number>(10)
	const [runId, setRunId] = React.useState<number | null>(null)
	const [hashs, setHashs] = React.useState<HashPair[]>([])
	const [lastTri, setLastTri] = React.useState<HashPair>({
		source: '---',
		tri: '---',
	})

	function stop() {
		if (runId) {
			clearInterval(runId)
			setRunId(null)
		}
	}
	return (
		<div>
			<Typography>ID採掘機</Typography>
			<Typography variant="caption">
				ブラウザパワーと単純なアルゴリズムのため高度なものよりとても遅いです。(デモシミュレータとして使え。)
			</Typography>
			<div style={{ display: 'flex', padding: '12px' }}>
				<TextField
					variant="outlined"
					value={search}
					label="検索文字列(正規表現)"
					helperText="aaaa|bbbb→aaaaかbbbb。◆ab→abから始まる。"
					onChange={e => {
						setSearch(e.target.value)
						stop()
					}}
				/>
				<TextField
					variant="outlined"
					value={prefix}
					label="prefix"
					onChange={e => {
						setPrefix(e.target.value)
						stop()
					}}
				/>
				<TextField
					variant="outlined"
					value={speed}
					label="速度(ms)"
					type="number"
					onChange={e => {
						setSpeed(Number(e.target.value))
						stop()
					}}
				/>
			</div>
			<Button
				disabled={!!runId}
				onClick={() => {
					if (search === '') {
						return
					}
					let i = 0
					const regex = new RegExp(search)

					console.log(regex)
					setRunId(
						setInterval(() => {
							i++
							console.log(i)
							const source = `#${prefix}${i}`
							const tri: string = genTrip(source)
							const pair = { tri, source }

							setLastTri(pair)
							if (regex.exec(tri)) {
								setHashs(v => v.concat(pair))
							}
						}, 10)
					)
				}}
			>
				開始
			</Button>
			<Button disabled={!runId} onClick={stop}>
				終了
			</Button>
			<Typography>
				{lastTri.source}
				{lastTri.tri}
			</Typography>
			<Typography variant="h6">結果</Typography>
			<table>
				<thead>
					<tr>
						<th>raw</th>
						<th>Trip</th>
					</tr>
				</thead>
				<tbody>
					{hashs.map(p => (
						<tr key={p.source}>
							<td>{p.source}</td>
							<td>{p.tri}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
const DigHashPage = () => (
	<Layout title="Hash採掘ツール">
		<DigHash />
	</Layout>
)

export default DigHashPage
