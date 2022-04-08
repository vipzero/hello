import { Container, Grid, Slider, TextField, Typography } from '@mui/material'
import { groupBy, range, rangeRight } from 'lodash'
import { useState } from 'react'
import { useLocalStorage } from 'react-use'
import styled from 'styled-components'
import Layout from '../../components/Layout'

const charLen = (c: string) => (c.match(/[\x01-\x7E\uFF65-\uFF9F]/) ? 2 : 1)

const textLen = (s: string) =>
	s
		.split('')
		.map(charLen)
		.reduce((a, b) => a + b, 0)
const columnText = (text: string, col: number): string => {
	const lines = Object.entries(text.split('\n')).map(([line, text]) => ({
		line: Number(line),
		text,
	}))
	const rows = Object.entries(
		groupBy(lines, ({ line }) => Math.floor(line / col))
	).map(([col, words]) => ({ col, words }))

	// TODO order: ↓→↓、→↓→

	const lens = range(rows[0].words.length).map((ci) =>
		rows
			.map(({ words }) => textLen(words[ci]?.text || ''))
			.reduce((a, b) => Math.max(a, b), 0)
	)
	console.log(lens)

	const results = Object.values(rows).map(({ words }) => {
		return words
			.map(({ text }, i) => {
				return text + '.'.repeat((lens[i] + 2 - textLen(text)) / 2)
			})
			.join('')
	})

	return results.join('\n')
}

function Ruru() {
	const [text, setText] = useLocalStorage<string>(
		'column-text',
		'あい\nうえお\nかき\nくけこ\nさし\nすせそ'
	)
	const [col, setCol] = useState<number>(2)

	const onChange = (v) => setText(v.currentTarget.value)
	if (text === undefined) return null
	const cn = text.split('').length
	const result = columnText(text, col)

	return (
		<Layout title="2列テキストツール">
			<Container maxWidth="md">
				<Style>
					<Typography variant="h4">2列テキストツール</Typography>
					<Slider
						style={{ width: '300px' }}
						defaultValue={col}
						aria-labelledby="discrete-slider"
						valueLabelDisplay="auto"
						marks={range(2, 5 + 1).map((v) => ({ value: v, label: `${v}列` }))}
						onChange={(_e, v) => {
							if (typeof v === 'number') setCol(v)
						}}
						min={2}
						max={5}
					/>
					<Grid container spacing={{ xs: 1, md: 2 }}>
						<Grid item xs={10} sm={6} md={6}>
							<TextField
								label="リスト"
								multiline
								defaultValue={text}
								variant="outlined"
								onChange={onChange}
							/>
						</Grid>
						<Grid item xs={10} sm={6} md={6}>
							<div className="result">
								<code>
									<pre>{result}</pre>
								</code>
							</div>
						</Grid>
					</Grid>
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
	.result {
		font-family: 'MS Pゴシック', 'MS PGothic', sans-serif;
		flex-wrap: wrap;
		gap: 1rem;
		font-size: 0.6rem;
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
