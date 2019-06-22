import * as React from 'react'

import styled from 'styled-components'

import { weponList } from './data'
import { TextField, Typography } from '@material-ui/core'
const Wrap = styled.div`
	width: 400px;
	padding: 20px;
`
const weponText = weponList
	.map(wepon => `${wepon.name}.${wepon.start}-${wepon.end}`)
	.join(',')
export function YamiPrabe() {
	const [num, setNum] = React.useState<string>('')
	return (
		<>
			<Wrap>
				<TextField
					type="number"
					value={num}
					variant="outlined"
					label="コンマ"
					helperText="0~999"
					onChange={e => {
						if (e.target) {
							setNum(e.target.value)
						}
					}}
				></TextField>
				{weponList.map(wepon => (
					<div>
						{wepon.start <= Number(num) && Number(num) <= wepon.end && (
							<Typography variant="h3">{wepon.name}</Typography>
						)}
					</div>
				))}
			</Wrap>
			<Wrap style={{ width: '100%' }}>
				<div>
					<textarea
						style={{ fontSize: '20px', width: '100%', height: '50vh' }}
						readOnly
						value={weponText}
					></textarea>
				</div>
			</Wrap>
		</>
	)
}
