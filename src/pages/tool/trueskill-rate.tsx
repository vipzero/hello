import {
	Box,
	Button,
	Card,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
	Tab,
	Tabs,
	TextField,
	Typography,
} from '@mui/material'
import { groupBy } from 'lodash'
import { useCopyToClipboard, useLocalStorage } from 'react-use'
import styled from 'styled-components'
import Layout from '../../components/Layout'
import { weponList } from '../../data/splatoon-wepons'

const Wrap = styled.div`
	width: 400px;
	padding: 20px;
`
const weponText = weponList
	.map((wepon) => `${wepon.name}.${wepon.start}-${wepon.end}`)
	.join(',')

const parenWrap = (v) => `'${v}'`
const template = (team1, team2, win, note, commentout) =>
	`${commentout ? '#' : ''}  [${note}, [${team1
		.map(parenWrap)
		.join(', ')}], [${team2.map(parenWrap).join(', ')}], '${win}']`

type ButtleLog = {
	teams: { [id: string]: 'A' | 'B' | undefined | 'N' }
	win: string
}
const initBattle: ButtleLog = { win: 'A', teams: {} }
const DummyRadio = () => <Radio size="small" style={{ visibility: 'hidden' }} />

function TrueSkillRateTabs() {
	const [tabs, setTabs] = useLocalStorage<number[]>('vpw-tabs', [0])
	const [tab, setTab] = useLocalStorage<number>('vpw-tabs-select', 0)
	if (!tabs || tab === undefined) return null
	const addTab = () => setTabs([...tabs, tabs[tabs.length - 1] + 1])
	return (
		<Box sx={{ width: '100%' }}>
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Tabs value={tab} onChange={(e, nv) => setTab(nv)}>
					{tabs.map((v) => (
						<Tab key={v} label={`Tab ${v}`} />
					))}
				</Tabs>
			</Box>

			<Button variant="contained" onClick={addTab}>
				タブ追加
			</Button>

			<TrueSkillRate tabId={tab} />
		</Box>
	)
}
function TrueSkillRate({ tabId }: { tabId: number }) {
	const [memtext, setMemtext] = useLocalStorage<string>(
		`vpw-members-${tabId}`,
		''
	)
	const [rests, setRests] = useLocalStorage<Record<string, boolean>>(
		`vpw-members-rest-${tabId}`,
		{}
	)
	const [battles, setButtles] = useLocalStorage<{ [i: number]: ButtleLog }>(
		`vpw-battles-${tabId}`,
		{}
	)
	const membersAll = (memtext ?? '').split('\n').filter(Boolean)
	const [copyState, copy] = useCopyToClipboard()

	if (!battles || memtext === undefined || !rests) return null

	const selectableMembers = membersAll.filter((m) => !rests[m])
	const restMembers = membersAll.filter((m) => rests[m])
	const members = [...selectableMembers, ...restMembers]

	const addBattle = () => {
		setButtles({
			...battles,
			[Object.values(battles).length]: initBattle,
		})
	}
	const codeText =
		`buttles = [\n` +
		Object.entries(battles)
			.map(([i, b]) => {
				const teamAMems = Object.entries(b.teams)
					.filter(([_, v]) => v === 'A')
					.map(([k]) => k)
				const teamBMems = Object.entries(b.teams)
					.filter(([_, v]) => v === 'B')
					.map(([k]) => k)

				return template(
					teamAMems,
					teamBMems,
					b.win,
					Number(i) + 1,
					teamAMems.length !== 4 || teamBMems.length !== 4
				)
			})
			.join(',\n') +
		`\n]
for i, team_a, team_b, win in buttles:
  r.add_result(team_a, team_b, win)`

	return (
		<Layout title="Vipower code gen">
			<Box m={1}>
				<Box sx={{ display: 'flex' }} m={1}>
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
						<Box display={'flex'} flexWrap={'wrap'}>
							{membersAll.map((m) => (
								<Card key={m}>
									<Box>
										<Typography style={{}}>{m}</Typography>
										<FormControlLabel
											control={
												<Checkbox
													size={'small'}
													checked={rests[m]}
													onChange={(e) => {
														setRests({ ...rests, [m]: e.target.checked })
													}}
												/>
											}
											labelPlacement="bottom"
											label="退室"
										/>
									</Box>
								</Card>
							))}
						</Box>
					</div>
				</Box>
				<Button variant="contained" onClick={addBattle}>
					試合追加
				</Button>
				<div>
					{Object.entries(battles || {}).map(([i, b]) => {
						const an = members.filter((k) => b.teams[k] === 'A').length
						const bn = members.filter((k) => b.teams[k] === 'B').length

						return (
							<Box
								key={i}
								sx={{
									display: 'flex',
									border: 'solid gray 1px',
									m: 1,
									p: 1,
								}}
							>
								<Box>
									<FormLabel style={{ width: '6rem' }}>
										{Number(i) + 1}試合目
									</FormLabel>
									<RadioGroup>
										{/* 行を揃えるため */}
										<FormControlLabel
											control={<DummyRadio />}
											label={`A(${an})`}
											style={{ background: an === 4 ? 'lime' : 'orange' }}
										/>
										<FormControlLabel
											control={<DummyRadio />}
											label={`B(${bn})`}
											style={{ background: bn === 4 ? 'lime' : 'orange' }}
										/>
										<FormControlLabel control={<DummyRadio />} label="-" />
									</RadioGroup>
								</Box>
								<FormControl style={{ background: '#ddd' }}>
									<FormLabel>勝ち</FormLabel>
									<RadioGroup
										value={b.win}
										onChange={(e) => {
											const win = e.target.value
											setButtles({ ...battles, [i]: { ...b, win } })
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
								{members.map((m) => (
									<FormControl
										key={m}
										style={{ background: rests[m] ? 'gray' : 'white' }}
									>
										<FormLabel>{m}</FormLabel>
										<RadioGroup
											value={b.teams[m] || 'N'}
											onChange={(e) => {
												const team = e.target.value

												const nb = JSON.parse(JSON.stringify(b))
												nb.teams[m] = team

												const {
													A: teamA = [],
													B: teamB = [],
													N: teamN = [],
												} = groupBy(
													selectableMembers,
													(k) => nb.teams[k] || 'N'
												)
												// 今設定したチームが4人になったら別チームを自動入力する

												if (
													team === 'A' &&
													teamA.length === 4 &&
													teamB.length < 4
												) {
													teamN.forEach((k) => (nb.teams[k] = 'B'))
												}
												if (
													team === 'B' &&
													teamB.length === 4 &&
													teamA.length < 4
												) {
													teamN.forEach((k) => (nb.teams[k] = 'A'))
												}

												setButtles({ ...battles, [i]: nb })
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
						)
					})}
				</div>
				{Object.values(battles).length > 0 && (
					<Button variant="contained" onClick={addBattle}>
						試合追加
					</Button>
				)}
				<Box p={1} m={1}>
					<code style={{ background: '#ddd' }}>
						<pre>{codeText}</pre>
					</code>
					<Button variant="contained" onClick={() => copy(codeText)}>
						コピー
					</Button>
				</Box>
			</Box>
		</Layout>
	)
}

export default TrueSkillRateTabs
