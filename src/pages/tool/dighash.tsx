import {
	Button,
	Typography,
	TextField,
	Checkbox,
	FormControlLabel,
} from '@mui/material'
import genTrip from '2ch-trip'
import { useState } from 'react'
import Layout from '../../components/Layout'

type HashPair = {
	source: string
	tri: string
}

function DigHash() {
	const [anim, setAnim] = useState<boolean>(false)
	const [search, setSearch] = useState<string>('abc')
	const [prefix, setPrefix] = useState<string>('好きな文字(変えて)')
	const [speed, setSpeed] = useState<number>(10)
	const [runId, setRunId] = useState<NodeJS.Timer | null>(null)
	const [hashs, setHashs] = useState<HashPair[]>([])
	const [lastTri, setLastTri] = useState<HashPair>({
		source: '---',
		tri: '---',
	})

	function stop() {
		if (runId) {
			clearInterval(runId)
			setRunId(null)
		}
	}
	function dig() {
		if (search === '') {
			return
		}
		let i = 0
		// const regex = new RegExp(search)
		if (!anim) {
			setLastTri({ tri: '採掘中', source: '' })
		}

		const t = setInterval(() => {
			i++
			const source = `#${prefix}${i}`
			const tri: string = genTrip(source)
			const pair = { tri, source }

			if (anim) {
				setLastTri(pair)
			}
			// if (regex.exec(tri)) {
			if (tri.startsWith('◆' + search)) {
				setHashs((v) => v.concat(pair))
			}
		}, speed)
		setRunId(t)
	}
	return (
		<div>
			<Typography>ID採掘機</Typography>
			<Typography variant="caption">
				ブラウザパワーと単純なアルゴリズムのため高度なものよりとても遅いです。(デモシミュレータとして使え。)
			</Typography>
			<Typography>3文字で1分</Typography>

			<FormControlLabel
				checked={anim}
				// @ts-ignore
				onChange={(e) => setAnim(e.target.checked ?? false)}
				control={<Checkbox />}
				label="アニメーション()"
			/>

			<div style={{ display: 'flex', padding: '12px' }}>
				<TextField
					variant="outlined"
					value={search}
					label="検索文字列"
					// helperText="aaaa|bbbb→aaaaかbbbb。◆ab→abから始まる。"
					onChange={(e) => {
						setSearch(e.target.value)
						stop()
					}}
				/>
				<TextField
					variant="outlined"
					value={prefix}
					label="prefix"
					onChange={(e) => {
						setPrefix(e.target.value)
						stop()
					}}
				/>
				<TextField
					variant="outlined"
					value={speed}
					label="速度(ms)"
					type="number"
					onChange={(e) => {
						setSpeed(Number(e.target.value))
						stop()
					}}
				/>
			</div>
			<Button disabled={!!runId} onClick={dig}>
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
					{hashs.map((p) => (
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
