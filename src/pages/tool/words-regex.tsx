import { useLocalStorage } from 'react-use'
import styled from 'styled-components'
import Layout from '../../components/Layout'

const Wrap = styled.div`
	padding: 12px;
`

function Shuffle8() {
	const [text, setText] = useLocalStorage<string>('words-regex', '')

	return (
		<Layout title="正規表現メーカー">
			<Wrap>
				<div style={{ display: 'flex', gap: '8px' }}>
					<textarea
						defaultValue={text}
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
			</Wrap>
		</Layout>
	)
}

export default Shuffle8
