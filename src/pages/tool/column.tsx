import {
	Box,
	Container,
	Grid,
	Slider,
	TextField,
	Typography,
} from '@mui/material'
import { range } from 'lodash'
import { useState } from 'react'
import { useLocalStorage } from 'react-use'
import styled from 'styled-components'
import TinySegmenter from 'tiny-segmenter'
import Layout from '../../components/Layout'

const segmenter = new TinySegmenter() // インスタンス生成

const genText = (l1: string, l2: string, l3: string) =>
	`
`.trim()

const rand = (n: number) => Math.floor(Math.random() * n)
function Ruru() {
	const [text, setText] = useLocalStorage<string>(
		'column-text',
		'あいうえお\nかきくけこ\nさしすせそ'
	)
	const [col, setCol] = useState<number>(2)

	const onChange = (v) => setText(v.currentTarget.value)
	if (text === undefined) return null
	const cn = text.split('').length
	const result = text

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
