import { Box, Button, Container, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useCopyToClipboard } from 'react-use'
import Layout from '../../components/Layout'

function Component() {
	const [url, setUrl] = useState<string>('hoge.com')
	const [copyState, copy] = useCopyToClipboard()
	const result = url.replace(/\./g, '&#46;')

	return (
		<Layout title="レスできるURL生成">
			<Container maxWidth="md">
				<Box m={1}>
					<Typography variant="h4">レスできるURL生成</Typography>
				</Box>
				<TextField
					value={url}
					label="URL"
					onChange={({ target: { value } }) => setUrl(value)}
				></TextField>
				<Typography>{result}</Typography>
				<Button
					onClick={() => {
						copy(result)
						alert('コピーしました')
					}}
				>
					コピー
				</Button>
			</Container>
		</Layout>
	)
}
export default Component
