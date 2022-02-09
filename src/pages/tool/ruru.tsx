// eslint-disable-next-line
import { Box, TextField } from '@material-ui/core'
import { useMemo, useState } from 'react'
import styled from 'styled-components'
import TinySegmenter from 'tiny-segmenter'
import Layout from '../../components/Layout'

const segmenter = new TinySegmenter() // インスタンス生成

function Ruru() {
	const [text, setText] = useState<string>('')
	const onChange = (v) => setText(v.currentTarget.value)
	const tokens = useMemo(() => {
		return segmenter.segment(text)
	}, [text])

	return (
		<Layout title="るるツイーター">
			<TextField onChange={onChange}></TextField>
			<Style>
				<Box sx={{ p: '8px' }}>
					{tokens.map((token, i) => (
						<span key={i}>{token}</span>
					))}
				</Box>
			</Style>
		</Layout>
	)
}

const Style = styled.div`
	span {
		border: solid 1px;
		padding: 4px;
		margin: 4px;
	}
`

export default Ruru
