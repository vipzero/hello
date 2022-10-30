import {
	Box,
	Button,
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
	TextField,
} from '@mui/material'
import { useLocalStorage } from 'react-use'
import styled from 'styled-components'
import Layout from '../../components/Layout'
import { weponList } from '../../data/splatoon-wepons'
import { members } from '../../components/Shomona22222/data'

const Wrap = styled.div`
	width: 400px;
	padding: 20px;
`
const weponText = weponList
	.map((wepon) => `${wepon.name}.${wepon.start}-${wepon.end}`)
	.join(',')

const parenWrap = (v) => `'${v}'`
const template = (team1, team2, win, note) =>
	`r.add_result([${team1.map(parenWrap).join(', ')}], [${team2
		.map(parenWrap)
		.join(', ')}], '${win}') // ${note}`
type ButtleLog = {
	teams: { [id: string]: 'A' | 'B' | undefined | 'N' }
	win: string
}
const initBattle: ButtleLog = { win: 'a', teams: {} }

function YamiPrabe() {
	const [memtext, setMemtext] = useLocalStorage<string>('vpw-members', '')
	const [rests, setRests] = useLocalStorage<Record<string, boolean>>(
		'vpw-members-rest',
		{}
	)
	const [battles, setButtles] = useLocalStorage<{ [i: number]: ButtleLog }>(
		'vpw-note-list',
		{}
	)
	const members = (memtext ?? '').split('\n').filter(Boolean)
	const selectableMembers = (memtext ?? '').split('\n').filter(Boolean)
	if (!battles || memtext === undefined) return null

	const addBattle = () => {
		setButtles({
			...battles,
			[Object.values(battles).length]: initBattle,
		})
	}
	const codeText = Object.entries(battles)
		.map(([i, b]) =>
			template(
				Object.entries(b.teams)
					.filter(([_, v]) => v === 'A')
					.map(([k]) => k),
				Object.entries(b.teams)
					.filter(([_, v]) => v === 'B')
					.map(([k]) => k),
				b.win === 'a' ? 'A' : 'B',
				i
			)
		)
		.join('\n')

	return (
		<Layout title="Vipower code gen">
			<Box sx={{ display: 'flex' }}>
				<Wrap>
					<TextField
						type="number"
						value={memtext}
						variant="outlined"
						multiline
						label="プレイヤーリスト"
						helperText="改行区切り/順番変えても記録保持されます"
						onChange={(e) => {
							setMemtext(e.target.value)
						}}
					></TextField>
				</Wrap>
				<div>
					メンバー
					<ul>
						{members.map((m) => (
							<li key={m}>{m}</li>
						))}
					</ul>
				</div>
			</Box>
			<Button onClick={addBattle}> 試合追加</Button>
			<div>
				{Object.entries(battles || {}).map(([i, b]) => (
					<Box
						key={i}
						sx={{ display: 'flex', border: 'solid gray 1px', m: 1, p: 1 }}
					>
						<Box sx={{ maxWidth: '1rem' }}>
							<FormLabel>{i}試合目</FormLabel>
							<RadioGroup name="radio-buttons-group">
								<FormControlLabel
									value="A"
									control={
										<Radio size="small" style={{ visibility: 'hidden' }} />
									}
									label="A"
								/>
								<FormControlLabel
									value="B"
									control={
										<Radio size="small" style={{ visibility: 'hidden' }} />
									}
									label="B"
								/>
								<FormControlLabel
									value="N"
									control={
										<Radio size="small" style={{ visibility: 'hidden' }} />
									}
									label="-"
								/>
							</RadioGroup>
						</Box>
						{members.map((m) => (
							<FormControl key={m}>
								<FormLabel>{m}</FormLabel>
								<RadioGroup
									value={b.teams[m] || 'N'}
									name="radio-buttons-group"
									onChange={(e) => {
										setButtles({
											...battles,
											[i]: { ...b, teams: { ...b.teams, [m]: e.target.value } },
										})
									}}
								>
									<FormControlLabel
										value="A"
										control={<Radio size="small" />}
										label=""
									/>
									<FormControlLabel
										value="B"
										control={<Radio size="small" />}
										label=""
									/>
									<FormControlLabel
										value="N"
										control={<Radio size="small" />}
										label=""
									/>
								</RadioGroup>
							</FormControl>
						))}
					</Box>
				))}
			</div>
			{Object.values(battles).length === 0 && (
				<Button onClick={addBattle}> 試合追加</Button>
			)}
			<Box p={1} m={1}>
				<code style={{ background: '#ddd' }}>
					<pre>{codeText}</pre>
				</code>
			</Box>
		</Layout>
	)
}

export default YamiPrabe
