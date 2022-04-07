// eslint-disable-next-line
import { Button, Container, Slider, TextField, Typography } from '@mui/material'
import { range } from 'lodash'
import { useMemo, useState } from 'react'
import styled from 'styled-components'
import TinySegmenter from 'tiny-segmenter'
import Layout from '../../components/Layout'

const segmenter = new TinySegmenter() // インスタンス生成

const genText = (l1: string, l2: string, l3: string) =>
	`
`.trim()

const rand = (n: number) => Math.floor(Math.random() * n)
function Ruru() {
	const [text, setText] = useState<string>('')
	const [col, setCol] = useState<number>(2)

	const onChange = (v) => setText(v.currentTarget.value)
	const cn = text.split('あいうえお\nかきくけこ\nさしすせそ').length

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
						marks={range(2, 10 + 1).map((v) => ({ value: v, label: `${v}列` }))}
						onChange={(_e, v) => {
							if (typeof v === 'number') setCol(v)
						}}
						min={2}
						max={10}
					/>
					<TextField
						label="リスト"
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

export default Ruru
