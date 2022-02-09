// eslint-disable-next-line
import { Button, Container, TextField, Typography } from '@mui/material'
import { useMemo, useState } from 'react'
import styled from 'styled-components'
import TinySegmenter from 'tiny-segmenter'
import Layout from '../../components/Layout'

const segmenter = new TinySegmenter() // インスタンス生成

const genText = (l1: string, l2: string, l3: string) =>
	`
#るるさん 
⠀　 　   .|ヽ▲ﾊ,       
　 　 　 ,| |・ω・;,＿${l1}
　,ノ⌒ﾐ(O)￣~/★ヽ ${l2}
　｀'ー'´｀'u゛-u丶_ノ${l3}
`.trim()

const rand = (n: number) => Math.floor(Math.random() * n)
function Ruru() {
	const [text, setText] = useState<string>('')
	const [retry, setRetry] = useState<number>(0)
	const onChange = (v) => setText(v.currentTarget.value)
	const seps = useMemo(() => {
		const tokens = segmenter.segment(text) as string[]
		if (tokens.length === 0) return []
		if (tokens.length === 1) return [[text], ['', text]]
		if (tokens.length === 2) return [tokens, [text], ['', text]]

		return [0, 1, 2, 3]
			.map((i1) => [1, 2, 3, 4].map((i2) => [i1, i1 + i2]))
			.flat()
			.map(([s1, s2]) => [
				tokens.slice(0, s1).join(''),
				tokens.slice(s1, s2).join(''),
				tokens.slice(s2).join(''),
			])
		console.log(retry)
	}, [text, retry])
	const ruruTexts = seps.map(([l1, l2, l3], i) =>
		genText(l1 || '', l2 || '', l3 || '')
	)

	return (
		<Layout title="るるツイーター">
			<Container maxWidth="md">
				<Style>
					<Typography variant="h4">るるツイーター</Typography>
					<TextField
						label="ツイート文章"
						variant="outlined"
						onChange={onChange}
					/>
					<Button
						disabled={text.length <= 3}
						onClick={() => setRetry((v) => v + 1)}
					>
						再生成
					</Button>
					<div className="rurus">
						{ruruTexts.map((text, i) => (
							<div key={i}>
								<pre>{text}</pre>
								<Button
									variant="contained"
									size="small"
									onClick={() => {
										window.open(
											`https://twitter.com/intent/tweet?text=${encodeURIComponent(
												text
											)}`
										)
									}}
								>
									ツイート→
								</Button>
							</div>
						))}
					</div>
				</Style>
			</Container>
		</Layout>
	)
}

const Style = styled.div`
	span {
		/* border: solid 1px;
		padding: 4px;
		margin: 4px; */
	}
	.rurus {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		> div {
			border: solid 1px gray;
			padding: 0.5rem;
		}
		pre {
			background: #ddd;
		}
	}
`

export default Ruru
