import { useLocalStorage } from 'react-use'
import styled from 'styled-components'
import Layout from '../../components/Layout'

const Wrap = styled.div`
	padding: 12px;
`

function Shuffle8() {
	const [text, setText] = useLocalStorage<string>('words-regex', '')
	const [chtext, setChText] = useLocalStorage<string>(
		'words-regex-ch',
		'[{"w":"chmate"}, {"w": "辞書"}]'
	)

	if (!text || !chtext) return 'loading'

	return (
		<Layout title="正規表現メーカー">
			<Wrap>
				<div style={{ display: 'flex', gap: '8px' }}>
					<textarea
						value={text}
						rows={30}
						style={{ minWidth: '50%', maxWidth: '100%' }}
						onChange={(e) => setText(e.target.value)}
					/>
					<div>
						改行区切り
						<pre>{text?.trim().split('\n').join('|')}</pre>
						スペース区切り
						<pre>{text?.replace(/[ 　\n]/g, '|').replace(/\|\|/g, '')}</pre>
					</div>
				</div>
				<p>chmate type</p>
				<div style={{ display: 'flex', gap: '8px' }}>
					<textarea
						value={chtext}
						rows={30}
						style={{ minWidth: '50%', maxWidth: '100%' }}
						onChange={(e) => setChText(e.target.value)}
					/>
					<div>
						<pre>{trans(chtext)}</pre>
					</div>
				</div>
			</Wrap>
		</Layout>
	)
}
function trans(json: string) {
	try {
		// @ts-ignore
		const a = JSON.parse(json) as { w: string }[]

		return a.map((v) => v.w).join('|')
	} catch {
		return 'parse error'
	}
}

export default Shuffle8
