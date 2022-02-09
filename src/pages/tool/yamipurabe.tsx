import { TextField, Typography } from '@mui/material'
import { useState } from 'react'
import styled from 'styled-components'
import Layout from '../../components/Layout'
import { weponList } from '../../data/splatoon-wepons'

const Wrap = styled.div`
	width: 400px;
	padding: 20px;
`
const weponText = weponList
	.map((wepon) => `${wepon.name}.${wepon.start}-${wepon.end}`)
	.join(',')

function YamiPrabe() {
	const [num, setNum] = useState<string>('')

	return (
		<Layout title="闇プラベ武器チェッカー">
			<Wrap>
				<TextField
					type="number"
					value={num}
					variant="outlined"
					label="コンマ"
					helperText="0~999"
					onChange={(e) => {
						if (e.target) {
							setNum(e.target.value)
						}
					}}
				></TextField>
				{weponList.map((wepon) => (
					<div key={wepon.name}>
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
		</Layout>
	)
}

export default YamiPrabe
