import {
	Box,
	Button,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
	TextField,
	Typography,
} from '@mui/material'
import { useCopyToClipboard, useLocalStorage } from 'react-use'
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
const DummyRadio = () => <Radio size="small" style={{ visibility: 'hidden' }} />
const SmallRadio = () => <Radio size="small" />

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
						<ul>
							{members.map((m) => (
								<li key={m}>
									<Box display={'flex'}>
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
								</li>
							))}
						</ul>
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
									<FormLabel style={{ width: '6rem' }}>{i}試合目</FormLabel>
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
								{members.map((m) => (
									<FormControl
										key={m}
										style={{ background: rests[m] ? 'gray' : 'white' }}
									>
										<FormLabel>{m}</FormLabel>
										<RadioGroup
											value={b.teams[m] || 'N'}
											name="radio-buttons-group"
											onChange={(e) => {
												const team = e.target.value
												const nb = {
													...b,
													teams: { ...b.teams, [m]: team },
												}

												// 今設定したチームが4人になったら別チームを自動入力する
												const teamA = selectableMembers.filter(
													(k) => nb.teams[k] === 'A'
												)
												const teamB = selectableMembers.filter(
													(k) => nb.teams[k] === 'B'
												)
												const teamN = selectableMembers.filter(
													(k) => !nb.teams[k] || nb.teams[k] === 'N'
												)

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
						{' '}
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

export default YamiPrabe
