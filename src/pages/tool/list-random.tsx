// eslint-disable-next-line
import { Button, Container, TextField, Typography } from '@mui/material'
import { range } from 'lodash'
import { useMemo, useState } from 'react'
import styled from 'styled-components'
import Layout from '../../components/Layout'

const rand = (n: number) => Math.floor(Math.random() * n)
function ListRandom() {
	const [text, setText] = useState<string>('apple\nbanana\ncherry')
	const [retry, setRetry] = useState<number>(0)
	const [num, setNum] = useState<number>(3)
	const [words, setWords] = useState<string[][]>([])

	const onChange = (v) => setText(v.currentTarget.value)
	const onChangeNum = (v) => setNum(Number(v.currentTarget.value))

	const shuffle = () => {
		const lines = text.split('\n').filter((v) => v.length > 0)

		setWords(
			range(10).map(() => {
				const rands = lines
					.map((line) => [line, Math.random()] as const)
					.sort((a, b) => a[1] - b[1])
				return [...Array(Math.min(num, lines.length)).keys()].map(
					(i) => rands[i][0]
				)
			})
		)
	}

	return (
		<Layout title="ランダムツール" hasNavbar={false}>
			<Container maxWidth="md">
				<Style>
					<Typography variant="h4">ランダム</Typography>
					<TextField
						label="語数"
						type="number"
						variant="outlined"
						value={num}
						onChange={onChangeNum}
					/>
					<Button onClick={shuffle}>シャッフル</Button>
					<div className="results">
						{words.map((ws, i) => (
							<p key={i}>{ws.join(' ')}</p>
						))}
					</div>
					<TextField
						label="単語リスト"
						multiline
						variant="outlined"
						onChange={onChange}
					/>
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

export default ListRandom
