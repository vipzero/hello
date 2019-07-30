import * as React from 'react'
import useLocalStorage from 'react-use/lib/useLocalStorage'
import useSize from 'react-use/lib/useSize'

import styled from 'styled-components'
import { TextField, Typography } from '@material-ui/core'
import { useDrag } from 'react-use-gesture'

const Wrap = styled.div`
	width: 400px;
	padding: 20px;
`
const defaultImg =
	'https://pbs.twimg.com/profile_images/1138065643276709888/gyF9Kvdg_400x400.png'

export function HandSpinner() {
	const [url, setURL] = useLocalStorage<string>('url', defaultImg)
	const bind = useDrag(({ down, delta }) => {
		if (down) {
			return
		}
		console.log({ delta })
	})
	const [sized, { width, height }] = useSize(({ width }) => (
		<div
			{...bind()}
			style={{
				width: '400px',
				height: '400px',
				border: '1px solid red',
				background: `url(${url}) no-repeat`,
				backgroundSize: 'cover',
			}}
		></div>
	))
	return (
		<>
			<Wrap>
				<Typography variant="h3">WIP</Typography>
				<Typography variant="h3">ハンドスピナー</Typography>
				回す画像URL
				<TextField
					value={url}
					onChange={e => setURL(e.target.value)}
				></TextField>
				{sized}
			</Wrap>
		</>
	)
}
